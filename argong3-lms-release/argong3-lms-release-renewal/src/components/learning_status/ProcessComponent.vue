<template>
  <div class="flex-center-between body2-bold">
    <div class="flex">
      <div :class="props.process.cateotry"></div>
      <p style="text-transform: capitalize">
        {{ props.process.cateotry.replace("_", " ") }}
      </p>
    </div>
    <div class="flex-vertical_center">
      <div v-show="checkComplete() === 100" class="complete"></div>
      <span>{{ props.process.count || "0" }}/3</span>
    </div>
  </div>
  <div
    class="chart_blue-bg"
    style="width: 100%; height: 6px; margin: 6px 0 26px 0"
  >
    <div class="chart_bar" :style="{ width: checkComplete() + '%' }"></div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps(["process"]);
const checkComplete = () => {
  const result = props.process.count * 33;
  if (result >= 99) {
    return 100;
  } else {
    return result;
  }
};
</script>
<style scoped>
.complete {
  width: 24px;
  height: 24px;
  margin-right: 6px;
  background-image: url("../../assets/image/complete.png");
  background-size: 100%;
}
</style>
