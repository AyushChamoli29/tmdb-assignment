<script setup>
import KnownForCard from "@/components/KnownForCard.vue";
import WorkTimeline from "@/components/WorkTimeline.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const data = ref(null);
const knownFor = ref([]);
const creditCount = ref(null);
const birthYear = ref("");
const combinedCreditsData = ref([]);
onMounted(async () => {
  const response1 = await fetch(
    `https://api.themoviedb.org/3/person/${route.params.id}?api_key=2962fb0e58a93fb2212f04f62c3714dd`,
  );
  data.value = await response1.json();
  birthYear.value = data.value.birthday.slice(0, 4);
  const response2 = await fetch(
    `https://api.themoviedb.org/3/person/${route.params.id}/movie_credits?api_key=2962fb0e58a93fb2212f04f62c3714dd`,
  );
  knownFor.value = await response2.json();
  knownFor.value = [
    ...knownFor.value.cast
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10),
  ];
  const response3 = await fetch(
    `https://api.themoviedb.org/3/person/${route.params.id}/combined_credits?api_key=2962fb0e58a93fb2212f04f62c3714dd`,
  );
  const data3 = await response3.json();
  combinedCreditsData.value = data3.value.cast;
  creditCount.value = data3.cast.length;
});
const currentYear = new Date().getFullYear();
</script>

<template>
  <header></header>
  <section v-if="data" class="flex gap-4 m-10">
    <div class="w-1/4">
      <img
        :src="`https://image.tmdb.org/t/p/w500/` + data.profile_path"
        alt="POSTER OF MOVIE"
        class="h-120 w-full object-fill rounded-2xl"
      />
    </div>
    <div class="w-3/4">
      <div>
        <div>
          <p class="font-bold text-3xl">{{ data.name }}</p>
        </div>
        <br />
        <div>
          <p class="font-bold">Biography :</p>
          <p class="text-base">{{ data.biography }}</p>
        </div>
      </div>
      <br />
      <p class="font-bold">Known for :</p>
      <div class="flex overflow-x-auto">
        <div v-for="item in knownFor">
          <KnownForCard :data="item" />
        </div>
      </div>
    </div>
  </section>
  <section v-if="data">
    <div class="w-1/4 flex flex-col m-10">
      <p class="font-bold text-xl">Personal Info</p>
      <p class="font-semibold">Stage Name</p>
      <p>{{ data.also_known_as[0] }}</p>
      <br />
      <p class="font-semibold">Known for</p>
      <p>{{ data.known_for_department }}</p>
      <br />
      <p class="font-semibold">Known Credits</p>
      <p>{{ creditCount }}</p>
      <br />
      <p class="font-semibold">Gender</p>
      <p v-if="data.gender == 1">Female</p>
      <p v-else-if="data.gender == 2">Male</p>
      <br />
      <p class="font-semibold">Birthdate</p>
      <p>{{ data.birthday }}({{ currentYear - birthYear - 1 }} years old)</p>
      <br />
      <p class="font-semibold">Place of Birth</p>
      <p>{{ data.place_of_birth }}</p>
      <br />
      <p class="font-semibold">Also known as</p>
      <ul>
        <li v-for="name in data.also_known_as">{{ name }}</li>
      </ul>
    </div>
    <div class="w-3/4" v-if="combinedCreditsData">
      <WorkTimeline :data="combinedCreditsData" />
    </div>
  </section>
</template>

<style scoped></style>
