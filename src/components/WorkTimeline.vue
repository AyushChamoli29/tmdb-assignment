<script setup>
import { defineProps, onMounted, ref } from "vue";
const props = defineProps({
  data: Array,
});
const sortedData = ref([]);
onMounted(() => {
  sortedData.value = props.data.sort((a, b) => b.release_date - a.release_date);
  console.log(sortedData.value);
});
</script>

<template>
  <div>
    <p>Acting</p>
    <div></div>
  </div>
</template>

<style scoped></style>
