<script setup>
import { onMounted, ref } from "vue";
import Search from "./Search.vue";
const array = ref([]);
const index = ref(null);
const image = ref(null);
const fetchData = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/trending/all/day?api_key=2962fb0e58a93fb2212f04f62c3714dd",
  );
  const data = await response.json();
  array.value = data.results;
  if (array.value.length > 0) {
    index.value = Math.floor(Math.random() * array.value.length);
  }
  image.value = `https://image.tmdb.org/t/p/original/${array.value[index.value].backdrop_path}`;
};
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div
    :style="{ backgroundImage: `url(${image})` }"
    class="relative h-80 w-full bg-cover bg-center"
  >
    <div class="absolute inset-0 bg-[#01B4E4] opacity-50"></div>
    <div class="relative z-10 flex flex-col justify-center items-center gap-10">
      <h1 class="text-white text-4xl">Welcome.</h1>
      <h2 class="text-white text-3xl">
        Millions of movies, TV shows and people to discover. Explore now.
      </h2>
      <div id="searchbox" class="w-4xl">
        <Search />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
