<script setup>
import PeopleHeader from "@/components/PeopleHeader.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const personObject = ref({});
const translationArray = ref([]);
onMounted(async () => {
  const [personResponse, translationResponse] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/person/${route.params.id}?api_key=2962fb0e58a93fb2212f04f62c3714dd`,
    ),
    fetch(
      `https://api.themoviedb.org/3/person/${route.params.id}/translations?api_key=2962fb0e58a93fb2212f04f62c3714dd`,
    ),
  ]);
  const [personData, translationData] = await Promise.all([
    personResponse.json(),
    translationResponse.json(),
  ]);
  personObject.value = personData;
  translationArray.value = translationData.translations;
});
const goToMain = () => {
  router.push({
    name: "peopleDetail",
    params: {
      id: route.params.id,
    },
  });
};
</script>

<template>
  <PeopleHeader />
  <br />
  <div>
    <div class="flex gap-5 m-10">
      <div>
        <img
          class="h-25"
          :src="`https://image.tmdb.org/t/p/w500/` + personObject.profile_path"
          alt="PROFILE PHOTO"
        />
      </div>
      <div>
        <p class="font-bold text-3xl">{{ personObject.name }}</p>
        <button
          @click="goToMain"
          class="cursor-pointer font-semibold hover:text-green-400"
        >
          Go To Main
        </button>
      </div>
    </div>
    <div>
      <div
        v-for="item in translationArray"
        class="p-2 m-5 mx-10 border-2 border-slate-200"
      >
        <div class="bg-slate-200 p-1">
          <p>
            {{ item.english_name }} ({{ item.iso_639_1 }}-{{ item.iso_3166_1 }})
          </p>
        </div>
        <div>
          <p v-if="item.data.name">Name : {{ item.data.name }}</p>
          <p v-else>Name : Add Name</p>
          <p v-if="item.data.biography">
            Biography : {{ item.data.biography }}
          </p>
          <p v-else>Biography : Add biography</p>
        </div>
      </div>
    </div>
  </div>
</template>
