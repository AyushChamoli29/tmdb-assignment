<script setup>
import { defineProps } from "vue";
const props = defineProps({
  data: Object,
});
</script>

<template>
  <div class="w-30 m-2">
    <img
      :src="`https://image.tmdb.org/t/p/w500/` + props.data.poster_path"
      alt="PHOTO OF POSTER"
      class="h-40 w-full object-fill"
    />
    <p>{{ props.data.title }}</p>
  </div>
</template>

<style scoped></style>
