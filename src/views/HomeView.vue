<script setup>
import HomeSearch from "@/components/HomeSearch.vue";
import Popular from "@/components/Popular.vue";
import Trailer from "@/components/Trailer.vue";
import TrendingHome from "@/components/TrendingHome.vue";
import WatchFree from "@/components/WatchFree.vue";
</script>

<template>
  <section>
    <HomeSearch />
  </section>
  <main class="m-1 flex flex-col gap-10">
    <section class="m-10">
      <TrendingHome />
    </section>
    <section>
      <Trailer />
    </section>
    <section class="m-10">
      <Popular />
    </section>
    <section class="m-10">
      <WatchFree />
    </section>
  </main>
  <footer></footer>
</template>

<style scoped></style>
