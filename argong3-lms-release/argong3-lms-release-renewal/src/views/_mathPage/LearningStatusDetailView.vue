<template>
  <div class="flex noselect">
    <div class="flex-column-gap">
      <CharacterProfile />
      <SelectMathUnits @update:selected-unit="handleMathUnit" />
    </div>
    <div class="flex-item">
      <div class="headline">{{ semester }}-{{ unit }}. {{ title }}</div>

      <div class="wrap-status-menu flex-horizon_center font_18_m_22">
        <button
          :class="
            content === 'stage' ? 'menu-btn__active' : 'menu-btn__deactive'
          "
          @click="onClickMenu('stage')"
        >
          차시 평가
        </button>
        <button
          :class="
            content === 'boss' ? 'menu-btn__active' : 'menu-btn__deactive'
          "
          @click="onClickMenu('boss')"
        >
          수준별 학습
        </button>
        <button
          :class="
            content === 'upgrade' ? 'menu-btn__active' : 'menu-btn__deactive'
          "
          @click="onClickMenu('upgrade')"
        >
          맞춤학습
        </button>
      </div>

      <stageComponent v-if="content === 'stage'" />
      <bossComponent v-else-if="content === 'boss'" />
      <upgradeComponent v-else-if="content === 'upgrade'" />
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

// import CharacterProfile from '../../components/CharacterProfile.vue'
import CharacterProfile from "../../components/learning_status/CharacterProfile.vue";
import SelectMathUnits from "../../components/learning_status/SelectMathUnits.vue";
import stageComponent from "./details/stageComponent.vue";
import bossComponent from "./details/bossComponent.vue";
import upgradeComponent from "./details/upgradeComponent.vue";

import "../../styles/image.scss";
import "../../styles/pie_chart.scss";
import { learningdetail_ko } from "../../assets/translate/ko";
import { learningdetail_vt } from "../../assets/translate/vt";

import { mathLessonList } from "../../api/api-list-2";

const store = useStore();
const route = useRoute();

const info = ref(route.path.split("/"));
const userId = ref(info.value[3]);
const semester = ref(parseInt(info.value[4]));
const unit = ref(parseInt(info.value[5]));
const title = ref("");
const lessonList = ref([]);

const content = ref("stage");

const langlist = ref({
  ko: learningdetail_ko,
  vt: learningdetail_vt,
});

onBeforeMount(async () => {
  const res100 = await mathLessonList();
  lessonList.value = res100.data.data.lessonList;

  const temp = lessonList.value;
  title.value = temp.filter(
    (item) => item.semester === semester.value && item.unit === unit.value
  )[0].unitTitle;
});

const handleMathUnit = async (data) => {
  const temp = lessonList.value;
  const {
    semester: _s,
    unit: _u,
    unitTitle,
  } = temp.filter(
    (item) => item.semester === data.semester && item.unit === data.unit
  )[0];

  semester.value = _s.toString();
  unit.value = _u.toString();
  title.value = unitTitle;
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
.flex-item {
  max-width: 880px;
}
.wrap-status-menu {
  width: fit-content;
  height: 40px;
  margin: 20px 0;
  background-color: var(--chart-blue-bg);
  border-radius: 40px;
}
.menu-btn__active,
.menu-btn__deactive {
  height: inherit;
  padding: 0 32px;
  color: white;
  border-radius: 40px;
}
.menu-btn__active {
  background-color: var(--main-blue);
}
</style>
