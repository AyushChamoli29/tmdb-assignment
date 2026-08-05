<script setup>
import { onMounted, ref } from "vue";
import Card from "./Card.vue";
const trending = ref("day");
const trendingArray = ref([]);
const displayTrending = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/${trending.value}?api_key=2962fb0e58a93fb2212f04f62c3714dd`,
  );
  const data = await response.json();
  trendingArray.value = data.results;
};
onMounted(() => {
  displayTrending();
});
const flag = ref("day");
const colorChangeDay = () => {
  if (flag.value !== "day") {
    flag.value = "day";
  }
};
const colorChangeWeek = () => {
  if (flag.value !== "week") {
    flag.value = "week";
  }
};
</script>

<template>
  <div>
    <label for="trending">Trending : </label>
    <div class="inline">
      <input
        type="radio"
        name="trending"
        id="trendingToday"
        value="day"
        v-model="trending"
        @change="displayTrending"
        class="hidden"
      />
      <label for="trendingToday"
        ><div
          class="inline m-1 p-1 border"
          :class="{ 'bg-blue-400 text-white': flag === 'day' }"
          @click="colorChangeDay"
        >
          Today
        </div></label
      >
      <input
        type="radio"
        name="trending"
        id="trendingWeek"
        value="week"
        v-model="trending"
        @change="displayTrending"
        class="hidden"
      />
      <label for="trendingWeek"
        ><div
          class="inline m-1 p-1 border"
          :class="{ 'bg-blue-400 text-white': flag === 'week' }"
          @click="colorChangeWeek"
        >
          This Week
        </div></label
      >
    </div>
    <br /><br />
    <div class="flex overflow-x-auto">
      <div v-for="item in trendingArray">
        <Card :data="item" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
