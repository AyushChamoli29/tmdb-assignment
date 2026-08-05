<script setup>
import { onMounted, ref } from "vue";
import TrailerCard from "./TrailerCard.vue";
const array = ref([]);
const selectedCategory = ref("popular");
const showTrailer = async (selectedValue) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${selectedValue}?api_key=2962fb0e58a93fb2212f04f62c3714dd`,
  );
  const data = await response.json();
  array.value = data.results;
  selectedCategory.value = selectedValue;
};
onMounted(() => {
  showTrailer("popular");
});
const imageObj = ref(null);
const flag = ref(0);
const image = ref(null);
const displayImage = (id) => {
  flag.value = 1;
  imageObj.value = array.value.find((item) => item.id === id);
  image.value =
    `https://image.tmdb.org/t/p/w500` + imageObj.value.backdrop_path;
};
const notDisplayImage = () => {
  flag.value = 0;
};
</script>

<template>
  <div
    :style="flag ? { backgroundImage: `url(${image})` } : {}"
    :class="{ 'bg-blue-600': !flag }"
    class="relative h-100 w-full bg-center bg-cover"
  >
    <div class="absolute inset-0 bg-[#032541] opacity-70"></div>
    <div class="flex flex-col">
      <div class="flex gap-8 z-10 font-bold">
        Latest Trailers
        <div
          @click="showTrailer('popular')"
          class="border p-1 cursor-pointer"
          :class="{ 'bg-blue-600': selectedCategory === 'popular' }"
        >
          Popular
        </div>
        <div
          @click="showTrailer('now_playing')"
          class="border p-1 cursor-pointer"
          :class="{ 'bg-blue-600': selectedCategory === 'now_playing' }"
        >
          Now Playing
        </div>
        <div
          @click="showTrailer('upcoming')"
          class="border p-1 cursor-pointer"
          :class="{ 'bg-blue-600': selectedCategory === 'upcoming' }"
        >
          Upcoming
        </div>
        <div
          @click="showTrailer('top_rated')"
          class="border p-1 cursor-pointer"
          :class="{ 'bg-blue-600': selectedCategory === 'top_rated' }"
        >
          Top Rated
        </div>
      </div>
      <div class="flex z-5 overflow-x-auto gap-5">
        <div
          v-for="item in array"
          :key="item.id"
          @mouseenter="displayImage(item.id)"
          @mouseleave="notDisplayImage"
        >
          <TrailerCard :data="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
