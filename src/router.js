import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/",
      hidden: true
    },
    {
      name: "home",
      path: "/",
      redirect: "/home",
      hidden: true
    },
    {
      name: "home",
      path: "/home",
      component: () => import("./views/home/index.js")
    }
  ]
});
