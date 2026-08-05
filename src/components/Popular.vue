<script setup>
import { onMounted, ref } from "vue";
import Card from "./Card.vue";
const popular = ref("movie");
const popularArray = ref([]);
const displayPopular = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${popular.value}/popular?api_key=2962fb0e58a93fb2212f04f62c3714dd`,
  );
  const data = await response.json();
  popularArray.value = data.results;
};
onMounted(() => {
  displayPopular();
});
const flag = ref("movie");
const colorChangeMovie = () => {
  if (flag.value !== "movie") {
    flag.value = "movie";
  }
};
const colorChangeTV = () => {
  if (flag.value !== "tv") {
    flag.value = "tv";
  }
};
</script>

<template>
  <div>
    <label for="popular">What's Popular : </label>
    <div class="inline">
      <input
        type="radio"
        name="popular"
        id="popularMovie"
        value="movie"
        v-model="popular"
        @change="displayPopular"
        class="hidden"
      />
      <label for="popularMovie"
        ><div
          class="inline m-1 p-1 border"
          :class="{ 'bg-blue-400 text-white': flag === 'movie' }"
          @click="colorChangeMovie"
        >
          In Theatres
        </div></label
      >
      <input
        type="radio"
        name="popular"
        id="popularTV"
        value="tv"
        v-model="popular"
        @change="displayPopular"
        class="hidden"
      />
      <label for="popularTV"
        ><div
          class="inline m-1 p-1 border"
          :class="{ 'bg-blue-400 text-white': flag === 'tv' }"
          @click="colorChangeTV"
        >
          On TV
        </div></label
      >
    </div>
    <br /><br />
    <div class="flex overflow-x-auto">
      <div v-for="item in popularArray">
        <Card :data="item" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
