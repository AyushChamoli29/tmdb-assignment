<script setup>
import KnownForCard from "@/components/KnownForCard.vue";
import PeopleHeader from "@/components/PeopleHeader.vue";
import WorkTimeline from "@/components/WorkTimeline.vue";
import { onMounted, ref, watch } from "vue";
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
const timelineArray = ref([]);
const workTimelineData = async (category) => {
  const creditsResponse = await fetch(
    `https://api.themoviedb.org/3/person/${route.params.id}/${category}?api_key=2962fb0e58a93fb2212f04f62c3714dd`,
  );
  const data = await creditsResponse.json();
  timelineArray.value = data.cast;
};
onMounted(() => {
  workTimelineData(category.value);
});
watch(category, (newCategory) => {
  workTimelineData(newCategory);
});
const changeTimeline = (timeline) => {
  category.value = `${timeline}_credits`;
  console.log(category.value);
};
const typeOfProblem = ref("");
const issueText = ref("");
const issuePublicReport = ref("yes");
const issueFlag = ref(0);
const hideIssueReport = () => {
  issueFlag.value = 0;
  typeOfProblem.value = "";
  issueText.value = "";
  issuePublicReport.value = "yes";
};
const showIssueReport = () => {
  issueFlag.value = 1;
};
const submitIssue = () => {
  issueFlag.value = 0;
  typeOfProblem.value = "";
  issueText.value = "";
  issuePublicReport.value = "yes";
  alert("Your issue is submitted");
};
</script>

<template>
  <header>
    <PeopleHeader :id="route.params.id" @show-report="showIssueReport" />
  </header>
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
    <form>
      <div
        class="rounded-xl absolute bg-white h-100 w-150"
        :class="{ hidden: !issueFlag }"
      >
        <div class="flex justify-between p-5 border">
          <p class="font-semibold text-xl">Report an Issue</p>
          <button @click="hideIssueReport">X</button>
        </div>
        <div class="p-3 border text-sm">
          <p class="font-semibold text-base">Type of Problem</p>
          <div class="flex gap-3 flex-wrap">
            <input
              type="radio"
              id="duplicate"
              value="duplicate"
              v-model="typeOfProblem"
            />
            <label for="duplicate">Duplicate</label>
            <input
              type="radio"
              id="bad_image"
              value="bad image"
              v-model="typeOfProblem"
            />
            <label for="bad_image">Bad Image</label>
            <input
              type="radio"
              id="design"
              value="design or functionality issue"
              v-model="typeOfProblem"
            />
            <label for="design">Design or Functionality Issue</label>
            <input
              type="radio"
              id="offensive"
              value="offensive or spam"
              v-model="typeOfProblem"
            />
            <label for="offensive">Offensive or Spam</label>
            <input
              type="radio"
              id="incorrect"
              value="incorrect content"
              v-model="typeOfProblem"
            />
            <label for="incorrect">Incorrect Content</label>
          </div>
          <div class="m-2 p-2">
            <p class="font-semibold">Write</p>
            <textarea
              v-model="issueText"
              class="border h-30 w-120 p-2"
              required
            ></textarea>
          </div>
          <p class="font-semibold">Public Report?</p>
          <div class="flex gap-2">
            <input
              type="radio"
              value="yes"
              id="yes"
              v-model="issuePublicReport"
              required
            />
            <label for="yes">Yes</label>
            <input
              type="radio"
              value="no"
              id="no"
              v-model="issuePublicReport"
              required
            />
            <label for="no">No</label>
          </div>
          <div class="flex justify-between">
            <p class="font-semibold">Submit a DMCA takedown request.</p>
            <button @click="submitIssue">Submit</button>
          </div>
        </div>
      </div>
    </form>
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
    <div class="w-3/4">
      <WorkTimeline
        :data="timelineArray"
        :category="category"
        @timeline-change="changeTimeline"
      />
    </div>
  </section>
</template>

<style scoped></style>
