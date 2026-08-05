<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <div id="body">
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
