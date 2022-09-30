import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import Calendar from "../components/Calendar.vue";
import ListUser from "../components/ListUser.vue";
// lazy-loaded
const Users = () => import("../components/Users.vue");
const ListAdmin = () => import("../components/ListAdmin.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "calendar",
        component: Calendar,
      },
      {
        path: "list-view",
        component: ListUser,
      },
      {
        path: "list-adm",
        name: "list-adm",
        // lazy-loaded
        component: ListAdmin,
      },
      {
        path: "users",
        name: "users",
        // lazy-loaded
        component: Users,
      },
    ],
  },
  {
    path: "/login",
    component: LoginView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active", // instead of the default router-link-active
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    return next("/login");
  } else {
    next();
  }
});

export default router;
