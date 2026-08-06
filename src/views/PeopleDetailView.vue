<script setup>
import KnownForCard from "@/components/KnownForCard.vue";
import WorkTimeline from "@/components/WorkTimeline.vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const knownForList = ref([]);
const creditCount = ref(null);
const birthYear = ref("");
const personData = ref(null);
const combinedCreditsData = ref([]);
const category = ref("combined_credits");
onMounted(async () => {
  const [allPersonResponse, personResponse, personCombinedCreditsResponse] =
    await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/person/${route.params.id}?api_key=2962fb0e58a93fb2212f04f62c3714dd`,
      ),
      fetch(
        `https://api.themoviedb.org/3/person/${route.params.id}/movie_credits?api_key=2962fb0e58a93fb2212f04f62c3714dd`,
      ),
      fetch(
        `https://api.themoviedb.org/3/person/${route.params.id}/combined_credits?api_key=2962fb0e58a93fb2212f04f62c3714dd`,
      ),
    ]);
  const [data, knownFor, data3] = await Promise.all([
    allPersonResponse.json(),
    personResponse.json(),
    personCombinedCreditsResponse.json(),
  ]);
  personData.value = data;
  if (personData.value.birthday) {
    birthYear.value = personData.value.birthday.slice(0, 4);
  }
  knownForList.value = [...(knownFor.cast || [])]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10);
  combinedCreditsData.value = [...data3.cast] || [];
  creditCount.value = data3.cast.length || 0;
});
const currentYear = new Date().getFullYear();
const timelineData = computed(() => {
  return [...combinedCreditsData.value];
});
const changeTimeline = async (timeline) => {
  category.value = `${timeline}_credits`;
  const timelineResponse = await fetch(
    `https://api.themoviedb.org/3/person/${route.params.id}/${category.value}?api_key=2962fb0e58a93fb2212f04f62c3714dd`,
  );
  const data = await timelineResponse.json();
  timelineData.value = [...data.cast] || [...combinedCreditsData.value];
};
</script>

<template>
  <header></header>
  <section v-if="personData" class="flex gap-4 m-10">
    <div class="w-1/4">
      <img
        :src="`https://image.tmdb.org/t/p/w500/` + personData.profile_path"
        alt="POSTER OF MOVIE"
        class="h-120 w-full object-fill rounded-2xl"
      />
    </div>
    <div class="w-3/4">
      <div>
        <div>
          <p class="font-bold text-3xl">{{ personData.name }}</p>
        </div>
        <br />
        <div>
          <p class="font-bold">Biography :</p>
          <p class="text-base">
            {{
              personData.biography ||
              `We don't have a biography for ${personData.name}`
            }}
          </p>
        </div>
      </div>
      <br />
      <p class="font-bold">Known for :</p>
      <div class="flex overflow-x-auto">
        <div v-for="item in knownForList">
          <KnownForCard :data="item" />
        </div>
      </div>
    </div>
  </section>
  <section v-if="personData" class="flex">
    <div class="w-1/4 flex flex-col m-10">
      <p class="font-bold text-xl">Personal Info</p>
      <p class="font-semibold">Stage Name</p>
      <p>{{ personData.also_known_as[0] || "-" }}</p>
      <br />
      <p class="font-semibold">Known for</p>
      <p>{{ personData.known_for_department || "-" }}</p>
      <br />
      <p class="font-semibold">Known Credits</p>
      <p>{{ creditCount || "-" }}</p>
      <br />
      <p class="font-semibold">Gender</p>
      <p v-if="personData.gender == 1">Female</p>
      <p v-else-if="personData.gender == 2">Male</p>
      <br />
      <p class="font-semibold">Birthdate</p>
      <p>
        {{ personData.birthday }}({{ currentYear - birthYear - 1 }} years old)
      </p>
      <br />
      <p class="font-semibold">Place of Birth</p>
      <p>{{ personData.place_of_birth || "-" }}</p>
      <br />
      <p class="font-semibold">Also known as</p>
      <ul v-if="personData.also_known_as.length">
        <li v-for="name in personData.also_known_as" :key="name">{{ name }}</li>
      </ul>
      <p v-else>-</p>
    </div>
    <div class="w-3/4" v-if="timelineData.length">
      <WorkTimeline :data="timelineData" @timeline-change="changeTimeline" />
    </div>
  </section>
</template>

<style scoped></style>
