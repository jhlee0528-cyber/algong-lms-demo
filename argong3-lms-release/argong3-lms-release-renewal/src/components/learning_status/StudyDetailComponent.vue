<template>
  <div class="flex-center-between" style="margin-bottom: 20px; gap: 20px">
    <div class="flex_center column" style="width: 150px">
      <div
        class="pie-chart"
        style="width: 102px; height: 102px"
        :style="{
          background:
            'conic-gradient(var(--main-blue) 0%' +
            computeProps.percent +
            '%, var(--chart-blue-bg)' +
            computeProps.percent +
            '% 100%)',
        }"
      >
        <span class="center headline" style="width: 82px; height: 82px">
          {{ computeProps.percent }}%
        </span>
      </div>
      <div class="flex-horizon_center" style="margin-top: 14px">
        <div :class="data.category"></div>
        <span
          class="headline3"
          style="color: var(--main-black2); text-transform: capitalize"
          >{{ data.category }}</span
        >
      </div>
    </div>

    <div class="flex-center-between lightblue_bg" style="width: 652px; gap: 10px;">
      <div v-show="data.category !== 'speaking'">
        <div class="blue-title" style="margin: 0 0 6px 5px">
          {{ langlist[store.state.lang]["단어"] }}
        </div>
        <WrapContent class="scroll_able wrap-info" style="width: 207px">
          <div
            v-for="(j, index) in computeProps.perfectWordList"
            :key="index"
            style="color: var(--main-blue)"
            class="body1"
          >
            {{ j }}
          </div>

          <div
            v-for="(j, index) in computeProps.goodWordList"
            :key="index"
            style="color: var(--main-green)"
            class="body1"
          >
            {{ j }}
          </div>

          <div
            v-for="(j, index) in computeProps.notBadWordList"
            :key="index"
            style="color: var(--main-orange)"
            class="body1"
          >
            {{ j }}
          </div>
        </WrapContent>
      </div>

      <div>
        <div class="blue-title" style="margin: 0 0 6px 5px">
          {{ langlist[store.state.lang]["문장"] }}
          <span v-show="data.category === 'speaking'" class="body2"
            >&nbsp;&nbsp;&nbsp;{{
              langlist[store.state.lang][
                "듣기 버튼을 누르면 재생할 수 있습니다."
              ]
            }}</span
          >
        </div>
        <WrapContent
          class="scroll_able wrap-info"
          :style="{ width: data.category === 'speaking' ? '593px' : '374px' }"
        >
          <div
            v-for="(j, index) in computeProps.perfectSentenceList"
            :key="index"
            class="body1 flex-horizon_center"
          >
            <button
              v-show="data.category === 'speaking'"
              class="play"
              @click="onClickPlay(userId, num, j)"
            ></button>
            <div style="display: inline; color: var(--main-blue)">{{ j }}</div>
          </div>

          <div
            v-for="(j, index) in computeProps.goodSentenceList"
            :key="index"
            class="body1 flex-horizon_center"
          >
            <button
              v-show="data.category === 'speaking'"
              class="play"
              @click="onClickPlay(userId, num, j)"
            ></button>
            <div style="display: inline; color: var(--main-green)">{{ j }}</div>
          </div>

          <div
            v-for="(j, index) in computeProps.notBadSentenceList"
            :key="index"
            class="body1 flex-horizon_center"
          >
            <button
              v-show="data.category === 'speaking'"
              class="play"
              @click="onClickPlay(userId, num, j)"
            ></button>
            <div style="display: inline; color: var(--main-orange)">
              {{ j }}
            </div>
          </div>
        </WrapContent>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, computed } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { lmsSpeaking } from "../../api/api-list";
import WrapContent from "../common/WrapContent.vue";
import store from "../../store";
import { learningdetail_ko } from "../../assets/translate/ko";
import { learningdetail_vt } from "../../assets/translate/vt";

const langlist = ref({
  ko: learningdetail_ko,
  vt: learningdetail_vt,
});

const data = defineProps(["data", "category"]);
const route = useRoute();
const path = ref(route.path.split("/"));
const userId = ref(path.value[2]);
const num = ref(path.value[3]);

let audio = new Audio();

const computeProps = computed(() => {
  if (data.data === undefined || !data.data) {
    return { percent: 0 };
  } else {
    return data.data;
  }
});

const onClickPlay = async (userId, lesson, content) => {
  audio.pause();
  let check = content.replace(/[^a-zA-Z0-9]/g, "_");

  const result = await lmsSpeaking(userId, lesson, check);
  if (result !== "") {
    audio.src = result;
    audio.play();
  }
};

onBeforeRouteUpdate(async (to) => {
  userId.value = to.params.userId;
  num.value = to.params.lesson;
});
</script>
<style scoped>
.lightblue_bg {
  border-radius: var(--default-border-radius);
  background-color: #f1f8ff;
  padding: 15px 25px 24px 25px;
}

.wrap-info {
  height: 137px;
  max-height: 137px;
  padding: 6px 16px;
}
.blue-title {
  color: var(--main-blue);
  font-size: 16px;
  font-family: notosans;
  line-height: 28px;
}
</style>