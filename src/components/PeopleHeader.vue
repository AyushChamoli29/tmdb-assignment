<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const prop = defineProps({
  id: String,
});
const emit = defineEmits(["show-report"]);
const showTranslations = () => {
  router.push({
    name: "personTranslation",
    params: {
      id: prop.id,
    },
  });
};
const goToMain = () => {
  router.push({
    name: "peopleDetail",
    params: {
      id: prop.id,
    },
  });
};
const showReport = () => {
  emit("show-report");
};
</script>

<template>
  <div class="flex justify-center gap-20">
    <div class="cursor-pointer group relative">
      Overview
      <div
        class="hidden group-hover:block absolute z-10 text-sm bg-white rounded-xl"
      >
        <ul>
          <li class="px-5 p-2 hover:bg-slate-200" @click="goToMain">Main</li>
          <li class="px-5 p-2 hover:bg-slate-200" @click="showTranslations">
            Translations
          </li>
          <li class="px-5 p-2 hover:bg-slate-200" @click="showReport">
            Report
          </li>
        </ul>
      </div>
    </div>
    <div class="cursor-pointer">Media</div>
    <div class="cursor-pointer">Fandom</div>
    <div class="cursor-pointer">Share</div>
  </div>
</template>

<style scoped></style>
