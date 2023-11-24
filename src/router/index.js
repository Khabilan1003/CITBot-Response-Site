import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue"
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/:catchall(.*)",
    name: "Not Found",
    component: NotFound
  }
];

const router = createRouter({
    history : createWebHistory('/'),
    routes 
});

export default router;