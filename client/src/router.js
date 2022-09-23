import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/login.vue";
import Calendar from "./components/calendar.vue";
import List from "./components/list.vue";
// lazy-loaded
const Users = () => import("./components/user.vue")
const ListAdm = () => import("./components/listAdm.vue")

const routes = [
  {
    path: "/",
    name: "calendar",
    component: Calendar,
  },
  {
    path: "/list-view",
    component: List,
  },
  {
    path: "/login",
    component: Login,
  },
//   {
//     path: "/register",
//     component: Register,
//   },
  {
    path: "/users",
    name: "users",
    // lazy-loaded
    component: Users,
  },
  {
    path: "/list-manage",
    name: "list-manage",
    // lazy-loaded
    component: ListAdm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
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