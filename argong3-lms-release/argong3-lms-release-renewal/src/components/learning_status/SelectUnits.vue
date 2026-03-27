<template>
  <WrapContent style="padding: 25px 0; width: 370px; max-height: 600px">
    <div class="inner">
      <h4 class="headline2">
        {{ langlist[store.state.lang]["단원 선택"] }}
      </h4>
      <p class="body2">
        {{
          langlist[store.state.lang]["단원별 학습 현황을 확인할 수 있습니다."]
        }}
      </p>
    </div>
    <div class="unit-wrap scroll_able">
      <div
        @click="onClickUnitAll()"
        style="cursor: pointer"
        :class="{
          allSelectOn: unit_num === '0',
          allSelectOff: unit_num !== '0',
        }"
      >
        <div class="center-box">
          <div
            :class="{
              reportOn: unit_num === '0',
              reportOff: unit_num !== '0',
            }"
          ></div>
          <p
            :class="{
              reportOnSentence: unit_num === '0',
              reportOffSentence: unit_num !== '0',
            }"
          >
            AI 종합 학습 레포트
          </p>
        </div>
      </div>
      <div
        v-for="(i, index) in units"
        :key="index"
        @click="onClickUnit(i.num, i.title)"
        :class="unit_num == i.num ? 'unit_selected' : 'unit'"
      >
        <div class="flex-center-between">
          <div class="unit-num">
            {{ String(i.num).padStart(2, "0") }}
          </div>
          <div class="chart_blue-bg" style="width: 220px; height: 6px">
            <div
              class="chart_bar"
              :style="{ width: Number(i.progress) + '%' }"
            ></div>
          </div>
        </div>
        <div class="unit-title">
          {{ i.title }}
        </div>
      </div>
    </div>
  </WrapContent>
</template>
<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { lessonInfo, lessonaverageprogress } from "../../api/api-list";
import WrapContent from "../common/WrapContent.vue";
import store from "../../store";

import { learningdetail_ko } from "../../assets/translate/ko";
import { learningdetail_vt } from "../../assets/translate/vt";

const langlist = ref({
  ko: learningdetail_ko,
  vt: learningdetail_vt,
});

const route = useRoute();
const router = useRouter();

const units = ref([]);
// const props = defineProps(['selected', 'userId'])
const emit = defineEmits(["update:selected-unit"]);
const path = ref(route.path.split("/"));
const userId = ref(path.value[2]);
const unit_num = ref(path.value[3]);

onMounted(async () => {
  const lesson = (await lessonInfo()).data.data;
  const progress = (await lessonaverageprogress()).data.data;
  const lessonLength = lesson.length;

  for (let i = 0; i < lessonLength; i++) {
    units.value.push({
      num: i + 1,
      title: lesson[i],
      progress: progress[i],
    });
  }

  if (unit_num.value === "0" || unit_num.value === 0) {
    emit("update:selected-unit", { num: "0", title: "" });
  } else {
    const data = {
      num: String(unit_num.value),
      title: units.value[unit_num.value - 1]["title"] || "",
    };
    emit("update:selected-unit", data);
  }
});

const onClickUnitAll = () => {
  sessionStorage.setItem("previousLesson", route.params.lesson);
  unit_num.value = "0";
  emit("update:selected-unit", { num: "0", title: "" });
  router.push(`/learning/${userId.value}/0`);

  return;
};

const onClickUnit = (num, title) => {
  sessionStorage.setItem("previousLesson", "");
  const data = { num: String(num), title: title };
  unit_num.value = String(num);
  emit("update:selected-unit", data);

  router.push(`/learning/${userId.value}/${unit_num.value}`);
};

onBeforeRouteUpdate(async (to) => {
  unit_num.value = to.params.lesson;
});
</script>
<style scoped>
.inner {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0 30px 25px;
}

.unit-wrap {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-left: 30px;
  max-height: 470px;
}

.center-box {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.unit,
.unit_selected {
  width: 310px;
  height: fit-content;
  padding: 14px 20px 12px;
  border-radius: var(--small-border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
}

.unit {
  background-color: var(--main-lightblue);
}

.unit:hover {
  background-color: #e4f1ff;
}

.unit_selected {
  background-color: var(--main-blue);
}

.chart_blue-bg {
  background-color: #cae3ff;
  border-radius: 20px;
}

.chart_bar {
  background-color: #3d90ef;
}

.unit_selected .chart_blue-bg {
  background-color: #67aeff;
}

.unit_selected .chart_bar {
  background-color: #e4f1ff;
}

.unit_selected .unit-num,
.unit_selected .unit-title {
  color: white;
}

.unit-num {
  width: 24px;
  font-family: notosans;
  color: var(--main-blue);
  font-weight: 600;
  font-size: 15px;
}

.unit-title {
  display: flex;
  align-items: center;
  height: 40px;
  color: var(--main-black);
  font-size: 13px;
}

.allSelectOff {
  width: 310px;
  height: 90px;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid #bfeddf;
}

.allSelectOn {
  width: 310px;
  height: 90px;
  background-color: #10d298;
  margin-bottom: 10px;
  border-radius: 15px;
}

.reportOn {
  width: 25px;
  height: 25px;
  background-image: url("../../assets/image/Icon_Report2.png");
  background-size: 100%;
  float: left;
}

.reportOff {
  width: 25px;
  height: 25px;
  background-image: url("../../assets/image/Icon_Report.png");
  background-size: 100%;
  float: left;
}

.reportOnSentence {
  float: left;
  margin-left: 7px;
  color: white;
  font-size: 18px;
  font-family: notosans;
}

.reportOffSentence {
  float: left;
  margin-left: 7px;
  color: #04bb84;
  font-size: 18px;
  font-family: notosans;
}
</style>
