<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const showPeople = () => {
  router.push({
    name: "people",
  });
};
</script>

<template>
  <div class="text-white cursor-pointer group relative">
    People
    <div
      class="text-black text-sm bg-white absolute hidden group-hover:block z-15 rounded-xl"
    >
      <ul>
        <li class="p-2 px-8 hover:bg-slate-200" @click="showPeople">Popular</li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
