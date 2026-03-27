<template>
  <div>
    <div class="text-wrap">
      <p style="color: var(--main-blue)">Perfect</p>
      <p style="color: var(--main-green)">Good</p>
      <p style="color: var(--main-orange)">Not bad</p>
    </div>

    <StudyDetailComponent
      :data="props.info.listening"
      :category="'listening'"
      :num="num"
    />
    <StudyDetailComponent
      :data="props.info.reading"
      :category="'reading'"
      :num="num"
    />
    <StudyDetailComponent
      :data="props.info.writing"
      :category="'writing'"
      :num="num"
    />
    <StudyDetailComponent
      :data="props.info.speaking"
      :category="'speaking'"
      :num="num"
    />
  </div>
</template>
<script setup>
import { ref, defineProps } from "vue";
import { useRoute } from "vue-router";
import WrapContent from "../common/WrapContent.vue";
import StudyDetailComponent from "./StudyDetailComponent.vue";
import store from "../../store";

import { learningdetail_ko } from "../../assets/translate/ko";
import { learningdetail_vt } from "../../assets/translate/vt";

const langlist = ref({
  ko: learningdetail_ko,
  vt: learningdetail_vt,
});

const route = useRoute();

const props = defineProps(["info"]);
const path = ref(route.path.split("/"));
const num = ref(path.value[3]);
</script>

<style scoped>
.text-wrap {
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
  
  p {
    font-size: 14px;
    font-family: notosans;
  }
}
.chart-label {
  position: absolute;
  text-align: center;
  transform: translate(-50%, -50%);
}

.studycount {
  width: 134px;
  height: 160px;
  padding: 16px 37px 11px 37px;
  border-radius: var(--default-border-radius);
  background-color: var(--main-lightblue);
  font-family: notosansmedium;
}

.studycount div {
  text-align: center;
}

.count-title,
.study-type,
.study-status {
  font-size: 15px;
  color: var(--main-black);
}

.count {
  height: 30px;
  color: var(--main-blue);
  font-size: 30px;
  font-weight: bold;
  line-height: 30px;
}

.count-title {
  margin: 10px 0 3px 0;
}

.study-status {
  font-family: notosans;
}

.complete {
  width: 24px;
  height: 24px;
  background-image: url("../../assets/image/complete.png");
  background-size: 100%;
}

.common {
  line-height: 25px;
}
</style>
