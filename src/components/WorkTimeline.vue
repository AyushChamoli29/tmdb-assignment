<script setup>
import { computed, defineProps, defineEmits, ref } from "vue";
const props = defineProps({
  data: Array,
});
const emit = defineEmits(["timeline-change"]);
const result = computed(() => {
  if (!props.data) {
    return {};
  }
  return props.data.reduce((acc, item) => {
    const date = item.release_date || item.first_air_date;
    if (!date) return acc;
    const year = date.split("-")[0];
    if (!acc[year]) {
      acc[year] = [];
      acc[year].push(item);
    } else {
      acc[year].push(item);
    }
    return acc;
  }, {});
});
const flag = ref(0);
const showDropDown = () => {
  if (flag.value == 0) {
    flag.value = 1;
  } else {
    flag.value = 0;
  }
};
const timelineChange = (category) => {
  console.log(category);
  emit("timeline-change", category);
};
</script>

<template>
  <div>
    <div class="flex justify-between px-20">
      <p class="font-bold text-xl">Acting</p>
      <div @click="showDropDown" class="cursor-pointer relative">
        all
        <div
          class="absolute text-sm bg-white text-black rounded-xl p-2 w-max"
          :class="{ hidden: !flag }"
        >
          <ul>
            <li @click="timelineChange('movie')">Movies</li>
            <li @click="timelineChange('tv')">TV Shows</li>
          </ul>
        </div>
      </div>
    </div>
    <div
      v-for="[key, value] in Object.entries(result).reverse()"
      class="border-2 border-yellow-50 p-5 flex"
    >
      <div>
        <ul>
          <li v-for="obj in value" class="flex gap-20">
            <div class="1/8">{{ key }}</div>
            <div class="7/8">
              <span class="font-bold">{{ obj.title || obj.name }}</span> <br />
              <p>
                <span v-if="obj.episode_count"
                  >{{ obj.episode_count }} episodes</span
                ><span v-if="obj.character"> as {{ obj.character }}</span>
              </p>
              <br />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
