import HomeView from "@/views/HomeView.vue";
import MovieView from "@/views/MovieView.vue";
import PeopleDetailView from "@/views/PeopleDetailView.vue";
import PeopleView from "@/views/PeopleView.vue";
import PersonTranslationView from "@/views/PersonTranslationView.vue";
import SearchView from "@/views/SearchView.vue";
import TVView from "@/views/TVView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/movie/:category",
      name: "movie",
      component: MovieView,
    },
    {
      path: "/tv/:category",
      name: "tv",
      component: TVView,
    },
    {
      path: "/people/popular",
      name: "people",
      component: PeopleView,
    },
    {
      path: "/search/:value",
      name: "search",
      component: SearchView,
    },
    {
      path: "/peopleDetail/:id",
      name: "peopleDetail",
      component: PeopleDetailView,
    },
    {
      path: "/person-translations/:id",
      name: "personTranslation",
      component: PersonTranslationView,
    },
  ],
});

export default router;
