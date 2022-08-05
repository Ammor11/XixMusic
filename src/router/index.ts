import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import FindMusic from "../views/findmusic/FindMusic.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/findmusic",
    name: "findmusic",
    component: FindMusic,
  },
  {
    path: "/",
    redirect: "/findmusic",
  },
  {
    path: "/mymusic",
    name: "mymusic",
    component: () => import("../views/mymusic/MyMusic.vue"),
  },
  {
    path: "/rank",
    name: "rank",
    component: () => import("../views/rank/Rank.vue"),
  },
  {
    path: "/playlist",
    name: "playlist",
    component: () => import("../views/playlist/PlayList.vue"),
  },
  {
    path: "/mv",
    name: "mv",
    component: () => import("../views/mv/MV.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
