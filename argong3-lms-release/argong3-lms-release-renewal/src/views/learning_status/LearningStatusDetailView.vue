<template>
  <div class="flex noselect">
    <div class="flex-column-gap">
      <CharacterProfile />
      <SelectUnits @update:selected-unit="handleUnit" />
    </div>

    <div v-if="num === '0'">
      <studentReport></studentReport>
    </div>
    <div v-if="num !== '0'">
      <div class="headline" style="margin-bottom: 26px">
        {{ num.padStart(2, "0") }}. {{ title }}
      </div>
      <div class="wrap-status-menu flex-horizon_center font_18_m_22">
        <button
          :class="
            content === 'activity' ? 'menu-btn__active' : 'menu-btn__deactive'
          "
          @click="onClickMenu('activity')"
        >
          {{ langlist[store.state.lang]["액티비티"] }}
        </button>
        <button
          v-if="premium === true"
          :class="
            content === 'aiPron' ? 'menu-btn__active' : 'menu-btn__deactive'
          "
          @click="onClickMenu('aiPron')"
        >
          {{ langlist[store.state.lang]["AI 발음평가"] }}
        </button>
        <button
          :class="
            content === 'aiSpeech' ? 'menu-btn__active' : 'menu-btn__deactive'
          "
          @click="onClickMenu('aiSpeech')"
        >
          {{ langlist[store.state.lang]["AI 대화"] }}
        </button>
        <!-- <button
          :class="
            content === 'teacherMission'
              ? 'menu-btn__active'
              : 'menu-btn__deactive'
          "
          @click="onClickMenu('teacherMission')"
        >
          {{ langlist[store.state.lang]["교사미션"] }}
        </button> -->
      </div>

      <ActivityView v-if="content === 'activity'" />
      <AIPronEvaluationView v-else-if="content === 'aiPron'" />
      <AISpeechView v-else-if="content === 'aiSpeech'" />
      <!-- <TeacherMissionView v-else-if="content === 'teacherMission'" /> -->
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

// import CharacterProfile from '../../components/CharacterProfile.vue'
import CharacterProfile from "../../components/learning_status/CharacterProfile.vue";
import SelectUnits from "../../components/learning_status/SelectUnits.vue";
import ActivityView from "./detail/ActivityView.vue";
import AIPronEvaluationView from "./detail/AIPronEvaluationView.vue";
import AISpeechView from "./detail/AISpeechView.vue";
import TeacherMissionView from "./detail/TeacherMissionView.vue";
import studentReport from "./detail/studentReport.vue";

import "../../styles/image.scss";
import "../../styles/pie_chart.scss";
import { userInfo } from "../../api/api-list";
import { learningdetail_ko } from "../../assets/translate/ko";
import { learningdetail_vt } from "../../assets/translate/vt";

const store = useStore();
const route = useRoute();

const info = ref(route.path.split("/"));
const userId = ref(info.value[2]);
const num = ref(info.value[3]);
const title = ref("");
const premium = ref(false);

const content = ref("activity");

const langlist = ref({
  ko: learningdetail_ko,
  vt: learningdetail_vt,
});

onBeforeMount(() => {
  premiumCheck();
});

const premiumCheck = async () => {
  const res = await userInfo();
  const check = res.data.data;
  if (check.payPlan === "p" || check.payPlan === "pm") {
    premium.value = true;
  } else {
    premium.value = false;
  }
};

const handleUnit = async (u) => {
  num.value = u.num;
  title.value = u.title;
};

const onClickMenu = (status) => {
  content.value = status;
};
</script>

<style scoped>
.flex {
  width: 1280px;
  padding: 100px 0;
  margin: 0 auto;
  display: flex;
  gap: 30px;
}
.wrap-status-menu {
  width: fit-content;
  height: 38px;
  margin-bottom: 20px;
  background-color: var(--chart-blue-bg);
  border-radius: 40px;
}
.menu-btn__active,
.menu-btn__deactive {
  height: inherit;
  padding: 0 28px;
  color: var(--main-black2);
  border-radius: 40px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}
.menu-btn__active {
  background-color: var(--main-blue);
  color: white;
}
</style>