import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/login.vue";
import Home from "./components/home.vue";
import Calendar from "./components/children/calendar.vue";
import List from "./components/children/list.vue";
// lazy-loaded
const Users = () => import("./components/children/user.vue")
const ListAdm = () => import("./components/children/listAdm.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: "calendar",
        component: Calendar,
      },
      {
        path: "list-view",
        component: List,
      },
      {
        path: "list-adm",
        name: "list-adm",
        // lazy-loaded
        component: ListAdm,
      },
      {
        path: "users",
        name: "users",
        // lazy-loaded
        component: Users,
      },
    ]
  },
  {
    path: "/login",
    component: Login
  },
//   {
//     path: "/register",
//     component: Register,
//   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active", // instead of the default router-link-active
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;