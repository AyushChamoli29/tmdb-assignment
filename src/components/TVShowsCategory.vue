<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const categoryShow = (category) => {
  router.push({
    name: "tv",
    params: {
      category: category,
    },
  });
};
</script>

<template>
  <div class="text-white group relative cursor-pointer">
    TV Shows
    <div
      id="dropdown"
      class="text-black bg-white text-sm absolute hidden group-hover:block rounded-xl z-15"
    >
      <ul>
        <li
          class="p-2 px-8 hover:bg-slate-200"
          @click="categoryShow('popular')"
        >
          Popular
        </li>
        <li
          class="p-2 px-8 hover:bg-slate-200"
          @click="categoryShow('airing_today')"
        >
          Airing Today
        </li>
        <li
          class="p-2 px-8 hover:bg-slate-200"
          @click="categoryShow('on_the_air')"
        >
          On TV
        </li>
        <li
          class="p-2 px-8 hover:bg-slate-200"
          @click="categoryShow('top_rated')"
        >
          Top Rated
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
