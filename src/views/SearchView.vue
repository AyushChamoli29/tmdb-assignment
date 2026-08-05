<script setup>
import SearchCard from "@/components/SearchCard.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const array = ref([]);
onMounted(async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=2962fb0e58a93fb2212f04f62c3714dd&query=${route.params.value}`,
  );
  const data = await response.json();
  array.value = data.results;
});
</script>

<template>
  <div class="">
    <div v-for="item in array">
      <SearchCard :data="item" />
    </div>
  </div>
</template>

<style scoped></style>
