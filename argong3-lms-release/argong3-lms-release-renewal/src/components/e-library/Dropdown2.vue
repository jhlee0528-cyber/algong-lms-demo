<template>
  <div class="dropdown-wrap">
    <input
      class="dropdown body2"
      v-model="selected"
      @click="onClickDropbox"
      readonly
      placeholder="선택"
    />
    <div class="arrow" @click="onClickClass"></div>
    <div v-if="isUnitOpen" ref="UnitRef" class="class-lists custom">
      <div
        v-for="(i, index) in units"
        :key="index"
        class="body2"
        @click="onClickUnit(index + 1, i)"
        :class="selected === i ? 'list_selected' : 'list'"
      >
        {{ i }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  units: Array,
});

window.addEventListener("preSelectPublisher", handlePreSelectPublisher);

window.addEventListener("close", handleClose);

function handleClose() {
  isUnitOpen.value = false;
}

const emits = defineEmits(["selected"]);
const selected = ref("");
const isUnitOpen = ref(false);

function handlePreSelectPublisher(event) {
  selected.value = event.detail;
}

function onClickDropbox() {
  isUnitOpen.value = !isUnitOpen.value;
}

function onClickClass() {
  isUnitOpen.value = !isUnitOpen.value;
}

function onClickUnit(index, item) {
  selected.value = item;
  isUnitOpen.value = false;
  emits("selected", item);
}
</script>

<style scoped>
.dropdown-wrap {
  position: relative;
  display: inline-flex;
  margin: 15px 15px 0 0;
  width: 205px;
  height: 40px;
  justify-content: flex-end;
  align-items: center;
  z-index: 100;
}
.dropdown {
  width: inherit;
  background: #fff;
  color: var(--main-black2);
  border-radius: 12px;
  border: none;
  outline: none;
  cursor: pointer;
}
.wrap-units {
  position: absolute;
  width: 100%;
  height: fit-content;
  max-height: 150px;
  top: 68px;
  right: 0;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05));
  overflow-y: auto;
}
.wrap-units::-webkit-scrollbar {
  width: 8px;
}
.wrap-units::-webkit-scrollbar-thumb {
  height: 30%;
  background: #c9c9c9;
  border-radius: 10px;
}
.class-lists.custom {
  border-radius: 10px;
}
</style>
