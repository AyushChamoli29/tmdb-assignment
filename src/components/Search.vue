<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const searchValue = ref("");
const findSearch = () => {
  router.push({
    name: "search",
    params: {
      value: searchValue.value,
    },
  });
};
</script>

<template>
  <input
    type="text"
    class="bg-white w-4xl h-10 p-2 rounded-lg"
    placeholder="Search for Movie or TV Show..."
    v-model="searchValue"
    @submit="findSearch"
  />
  <br /><br />
  <button class="bg-blue-900 text-white p-2" @click="findSearch">
    Search...
  </button>
</template>

<style scoped></style>
