<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  data: Object,
});
const router = useRouter();
const goToPeopleDetail = () => {
  router.push({
    name: "peopleDetail",
    params: {
      id: props.data.id,
    },
  });
};
</script>

<template>
  <div class="m-5" @click="goToPeopleDetail">
    <div id="imagebox">
      <img
        :src="`https://image.tmdb.org/t/p/w500/` + props.data.profile_path"
        alt="POSTER OF MOVIE"
        class="h-80 w-full object-fill"
      />
    </div>
    <div id="databox">
      <p class="font-bold">{{ props.data.name }}</p>
      <p class="text-sm" v-for="item in props.data.known_for">
        {{ item.title }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
