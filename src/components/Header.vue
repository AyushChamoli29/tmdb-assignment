<script setup>
import { RouterLink } from "vue-router";
import MoviesCategory from "./MoviesCategory.vue";
import TVShowsCategory from "./TVShowsCategory.vue";
import People from "./People.vue";
</script>

<template>
  <div id="heading" class="bg-[#032541] py-5 px-10 gap-5">
    <div id="logo">
      <RouterLink to="/"
        ><img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
          alt="LOGO"
      /></RouterLink>
    </div>
    <div id="movie">
      <MoviesCategory />
    </div>
    <div id="tv">
      <TVShowsCategory />
    </div>
    <div id="people">
      <People />
    </div>
  </div>
</template>

<style scoped>
#heading {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
#logo img {
  height: 18px;
  width: 100%;
}
</style>
