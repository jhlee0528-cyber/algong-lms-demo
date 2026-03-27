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
        v-for="(lesson, i) in units"
        :key="i"
        @click="onClickUnit(units[i])"
        :class="
          JSON.stringify({ semester, unit }) ===
          JSON.stringify({
            semester: units[i].semester.toString(),
            unit: units[i].unit.toString(),
          })
            ? 'unit_selected'
            : 'unit'
        "
      >
        <div class="flex-center-between">
          <div class="unit-num">
            {{ units[i].semester }}-{{ units[i].unit }}
          </div>
          <div class="chart_blue-bg" style="width: 220px; height: 6px">
            <div
              class="chart_bar"
              :style="{ width: units[i].progress + '%' }"
            ></div>
          </div>
        </div>

        <div class="unit-title">
          {{ units[i].unitTitle }}
        </div>
      </div>
    </div>
  </WrapContent>
</template>
<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { getStudentMathLessonList } from "../../api/math-api-list";
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
const emit = defineEmits(["update:selected-unit"]);
const path = ref(route.path.split("/"));
const userId = ref(path.value[3]);
const semester = ref(path.value[4]);
const unit = ref(path.value[5]);

onMounted(async () => {
  const res100 = await getStudentMathLessonList(userId.value);
  units.value = res100.data.data.lessonList;

  const lessonData = res100.data.data.lessonList;

  const target = lessonData.filter(
    (item) =>
      item.semester === parseInt(semester.value) &&
      item.unit === parseInt(unit.value)
  );

  semester.value = target[0].semester.toString();
  unit.value = target[0].unit.toString();
});

const onClickUnit = (unitInfo) => {
  const data = unitInfo;

  semester.value = data.semester.toString();
  unit.value = data.unit.toString();

  emit("update:selected-unit", data);
  window.location.href = `${window.location.protocol}//${window.location.host}/math/learning/${userId.value}/${data.semester}/${data.unit}`;
  // router.push(`/math/learning/${userId.value}/${data.semester}/${data.unit}`);
};

onBeforeRouteUpdate(async (to) => {
  semester.value = to.params.semester;
  unit.value = to.params.lesson;
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

.unit,
.unit_selected {
  width: 310px;
  height: fit-content;
  padding: 12px 20px 10px;
  border-radius: var(--small-border-radius);
  cursor: pointer;
}

.unit {
  border: 1px solid #88c0ff;
}

.unit_selected {
  background-color: var(--main-blue);
}

.chart_blue-bg {
  background-color: #cae3ff;
  border-radius: 20px;
}

.unit_selected .chart_blue-bg {
  background-color: #67aeff;
}

.chart_bar {
  background-color: #3d90ef;
}

.unit_selected .chart_bar {
  background-color: #f1f8ff;
}

.unit_selected .unit-num,
.unit_selected .unit-title {
  color: white;
}

.unit-num {
  font-size: 20px;
  font-family: notosans;
  color: var(--main-blue);
}

.unit-title {
  display: flex;
  align-items: center;
  height: 40px;
  color: var(--main-black);
  font-size: 14px;
}

.allSelectOff {
  width: 310px;
  height: 90px;
  background-color: #bfeddf;
  margin-bottom: 10px;
  border-radius: 15px;
}

.allSelectOn {
  width: 310px;
  height: 90px;
  background-color: #04bb84;
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
