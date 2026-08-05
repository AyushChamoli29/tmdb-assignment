<script setup>
import PeopleCard from "@/components/PeopleCard.vue";
import { onMounted, ref } from "vue";
const array = ref([]);
onMounted(async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/person/popular?api_key=2962fb0e58a93fb2212f04f62c3714dd",
  );
  const data = await response.json();
  array.value = data.results;
});
</script>

<template>
  <div class="p-5">
    <h1 class="font-bold text-2xl">Popular People</h1>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3">
      <div v-for="item in array">
        <PeopleCard :data="item" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
