import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/clicker-store",
      name: "clicker-store",
      component: () => import("../views/ClickerStoreView.vue"),
    },
    {
      path: "/upgrade-store",
      name: "upgrade-store",
      component: () => import("../views/UpgradeStoreView.vue"),
    },
    {
      path: "/soul-store",
      name: "soul-store",
      component: () => import("../views/SoulStoreView.vue"),
    },
  ],
});

export default router;
