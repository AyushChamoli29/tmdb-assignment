<script setup>
import { defineProps } from "vue";
const props = defineProps({
  data: Object,
});
</script>

<template>
  <div class="w-60 m-3 flex flex-col">
    <div id="imagebox">
      <img
        :src="
          `https://image.tmdb.org/t/p/w500/` +
          (props.data.poster_path || props.data.profile_path)
        "
        alt="POSTER OF MOVIE"
        class="h-60 w-full object-fill"
      />
    </div>
    <div id="databox">
      <p class="font-semibold">{{ props.data.title || props.data.name }}</p>
      <p class="text-sm">
        {{ props.data.release_date || props.data.first_air_date }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
