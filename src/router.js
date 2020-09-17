import Vue from "vue";
import Router from "vue-router";
import Seasons from "./components/Seasons";
import Episode from "./components/Episode";
import Character from "./components/Character";
// import Home from "./components/Home";
import About from "./components/About";
import Occupation from "./components/Occupation";

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   name: "home",
    //   path: "/",
    //   component: Home
    // },
    {
      name: "seasons",
      path: "/",
      component: Seasons
    },
    {
      name: "episode",
      path: "/episode/:id",
      component: Episode
    },
    {
      name: "character",
      path: "/character/:id",
      component: Character
    },
    {
      name: "about",
      path: "/about",
      component: About
    },
    {
      name: "occupation",
      path: "/occupation",
      component: Occupation
    }
  ]
});
