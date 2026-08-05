<script setup>
import { watch, ref } from "vue";
import Card from "@/components/Card.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const array = ref([]);
const response = ref(null);
const data = ref(null);
watch(
  () => route.params.category,
  async (category) => {
    response.value = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=2962fb0e58a93fb2212f04f62c3714dd`,
    );
    data.value = await response.value.json();
    array.value = [...data.value.results];
  },
  { immediate: true },
);
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
    <div v-for="item in array">
      <Card :data="item" />
    </div>
  </div>
  <br /><br />
</template>

<style scoped></style>
