<script setup>
import { onMounted, ref } from "vue";
import Card from "./Card.vue";
const choice = ref("movie");
const choiceArray = ref([]);
const displayChoice = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${choice.value}/top_rated?api_key=2962fb0e58a93fb2212f04f62c3714dd`,
  );
  const data = await response.json();
  choiceArray.value = data.results;
};
onMounted(() => {
  displayChoice();
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
    <label for="popular">Free to Watch : </label>
    <div class="inline">
      <input
        type="radio"
        name="choice"
        id="choiceMovie"
        value="movie"
        v-model="choice"
        @change="displayChoice"
        class="hidden"
      />
      <label for="choiceMovie"
        ><div
          class="inline m-1 p-1 border"
          :class="{ 'bg-blue-400 text-white': flag === 'movie' }"
          @click="colorChangeMovie"
        >
          Movie
        </div></label
      >
      <input
        type="radio"
        name="choice"
        id="choiceTV"
        value="tv"
        v-model="choice"
        @change="displayChoice"
        class="hidden"
      />
      <label for="choiceTV"
        ><div
          class="inline m-1 p-1 border"
          :class="{ 'bg-blue-400 text-white': flag === 'tv' }"
          @click="colorChangeTV"
        >
          TV
        </div></label
      >
    </div>
    <br /><br />
    <div class="flex overflow-x-auto">
      <div v-for="item in choiceArray">
        <Card :data="item" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
