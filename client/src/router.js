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
    name: "home",
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

export default router;