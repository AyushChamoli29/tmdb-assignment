<script setup>
import { defineProps } from "vue";
const props = defineProps({
  data: Object,
});
</script>

<template>
  <div class="m-5 flex justify-start">
    <div class="w-1/8">
      <img
        :src="`https://image.tmdb.org/t/p/w500/` + props.data.poster_path"
        alt="POSTER OF MOVIE"
        class="h-50 object-center object-fit"
      />
    </div>
    <div class="w-7/8">
      <p class="text-lg font-semibold">
        {{ props.data.title || props.data.name }}
      </p>
      <p class="text-sm">
        {{ props.data.first_air_date || props.data.release_date }}
      </p>
      <br />
      <p class="text-sm">{{ props.data.overview }}</p>
    </div>
  </div>
</template>

<style scoped></style>
