<template>
  <div class="grid-container">
    <WrapContent style="padding: var(--padding1)">
      <h4>
        {{ langlist[store.state.lang]["정답률 - 단원별"] }}
      </h4>
      <p class="subtitle" style="margin-bottom: 0">
        {{
          langlist[store.state.lang]["학습 내용을 숫자로 확인할 수 있습니다."]
        }}
      </p>
      <LineChart
        v-if="classData.length > 0"
        :classData="classData"
        :userData="studentData"
      />
    </WrapContent>

    <WrapContent style="padding: var(--padding1)">
      <h4>
        {{ langlist[store.state.lang]["학습 문제수"] }}
      </h4>
      <p class="subtitle">
        {{
          langlist[store.state.lang]["학습 내용을 숫자로 확인할 수 있습니다."]
        }}
      </p>
      <div class="flex-center-between">
        <div class="studycount">
          <div class="word-image"></div>
          <div class="count-title">
            {{ langlist[store.state.lang]["단어"] }}
          </div>
          <div class="count">{{ getDetailInfo.playWordCount || "0" }}</div>
        </div>
        <div class="studycount">
          <div class="sentence-image"></div>
          <div class="count-title">
            {{ langlist[store.state.lang]["문장"] }}
          </div>
          <div class="count">
            {{ getDetailInfo.playSentenceCount || "0" }}
          </div>
        </div>
        <div class="studycount">
          <div class="speech-image"></div>
          <div class="count-title">
            {{ langlist[store.state.lang]["대화"] }}
          </div>
          <div class="count">{{ getDetailInfo.playChatCount || "0" }}</div>
        </div>
      </div>
    </WrapContent>

    <WrapContent style="padding: var(--padding1)">
      <h4>
        {{ langlist[store.state.lang]["정답률 - 영역별"] }}
      </h4>
      <p class="subtitle">
        {{
          langlist[store.state.lang][
            "각 영역별 정답률을 반 평균과 비교하여 확인할 수 있습니다."
          ]
        }}
      </p>

      <div
        :class="{
          goup: store.state.lang === 'vt',
        }"
      >
        <RadarChart
          :classData="store.state.radarDataAverage"
          :userData="store.state.radarData"
        />
      </div>
    </WrapContent>

    <WrapContent style="padding: var(--padding1)">
      <h4>
        {{ langlist[store.state.lang]["진행률"] }}
      </h4>
      <p class="subtitle">
        {{
          langlist[store.state.lang]["학습 내용을 숫자로 확인할 수 있습니다."]
        }}
      </p>
      <ProcessComponent
        :process="{
          cateotry: 'listening',
          count: detailInfo.listeningProgress,
        }"
      />
      <ProcessComponent
        :process="{ cateotry: 'reading', count: detailInfo.readingProgress }"
      />
      <ProcessComponent
        :process="{ cateotry: 'writing', count: detailInfo.writingProgress }"
      />
      <ProcessComponent
        :process="{
          cateotry: 'speaking',
          count: detailInfo.speakingProgress,
        }"
      />
      <ProcessComponent
        :process="{
          cateotry: 'AI_Chatbot',
          count: detailInfo.chatbotProgress,
        }"
      />
    </WrapContent>

    <WrapContent>
      <h4>
        {{ langlist[store.state.lang]["학습 상세"] }}
      </h4>
      <p class="subtitle">
        {{
          langlist[store.state.lang][
            "학습자의 상세 학습 내용을 상세하게 확인할 수 있습니다."
          ]
        }}
      </p>
      <StudyDetail :info="computedStudyInfo" />
    </WrapContent>
  </div>

  <!-- 학습 상세 -->
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { lmsStudyDetail } from "../../../api/api-list.js";
import WrapContent from "../../../components/common/WrapContent.vue";
import LineChart from "../../../components/charts/LineChart.vue";
import RadarChart from "../../../components/charts/RadarChart.vue";
import StudyDetail from "../../../components/learning_status/StudyDetail.vue";
import ProcessComponent from "../../../components/learning_status/ProcessComponent";
import { learningdetail_ko } from "../../../assets/translate/ko";
import { learningdetail_vt } from "../../../assets/translate/vt";
import { lessonGraphSummary } from "../../../api/api-list-2.js";

const langlist = ref({
  ko: learningdetail_ko,
  vt: learningdetail_vt,
});

const store = useStore();
const route = useRoute();

const path = ref(route.path.split("/"));
const userId = ref(path.value[2]);
const num = ref(path.value[3]);

const detailInfo = ref({});
const studyDetail = ref([]);

const studentData = ref([]);
const classData = ref([]);

onMounted(async () => {
  try {
    loadData(route.params.lesson);
  } catch (err) {}
});

const loadData = async (lesson) => {
  if (lesson === "0") {
    return;
  }
  store.state.lineDataAverage = [];
  store.state.lineData = [];
  store.state.radarData = [0, 0, 0, 0, 0];
  store.state.radarDataAverage = [0, 0, 0, 0, 0];

  const detail_info = await store.dispatch("GET_LESSON_STUDENT_DETAIL_INFO", {
    id: userId.value,
    lesson,
  });
  const detail_result = await lmsStudyDetail(userId.value, lesson);

  if (detail_info && detail_result) {
    detailInfo.value = detail_info;
    studyDetail.value = detail_result;
  }

  const { studentValue, classValue } = (await lessonGraphSummary(userId.value))
    .data.data;
  studentData.value = studentValue;
  classData.value = classValue;

  //await store.dispatch("LMS_TOTAL_PERCENT_ALL", userId.value);
  //await store.dispatch("GET_CHAPTER_AVERAGE");
  await store.dispatch("GET_LESSON_SECTION_AVERAGE", lesson);
};

const getDetailInfo = computed(() => {
  if (detailInfo.value === undefined) {
    return [];
  } else {
    return detailInfo.value;
  }
});

const computedStudyInfo = computed(() => {
  if (studyDetail.value === undefined) {
    return [];
  } else {
    return studyDetail.value;
  }
});

onBeforeRouteUpdate(async (to, from) => {
  if (from.params.lesson === "0") {
    loadData(to.params.lesson);
  } else {
    const detail_result = await lmsStudyDetail(
      to.params.userId,
      to.params.lesson
    );
    const detail_info = await store.dispatch("GET_LESSON_STUDENT_DETAIL_INFO", {
      id: to.params.userId,
      lesson: to.params.lesson,
    });
    await store.dispatch("GET_LESSON_SECTION_AVERAGE", to.params.lesson);

    if (detail_info && detail_result) {
      detailInfo.value = detail_info;
      studyDetail.value = detail_result;
    }
  }
});
</script>

<style scoped lang="scss">
.grid-container {
  width: 880px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

  h4 {
    font-size: 20px;
    margin-bottom: 4px;
  }
  .subtitle {
    color: #525252;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 20px;
  }
}

.grid-container > div {
  width: 100%;
  height: 100%;
}

.grid-container > div:nth-child(5) {
  grid-column: span 2; /* 3번째 아이템이 2개 열을 차지하도록 설정 */
}

.chart-label {
  position: absolute;
  width: 40px;
  text-align: center;
  transform: translate(-50%, -50%);
}

.studycount {
  width: 110px;
  height: 167px;
  padding: 16px 25px;
  border-radius: var(--default-border-radius);
  background-color: var(--main-lightblue);
}

.studycount div {
  text-align: center;
}

.count-title,
.study-type {
  font-size: 16px;
  font-family: notosansregular;
  color: var(--main-black);
}

.count {
  color: var(--main-blue);
  margin-top: -5px;
  font-size: 30px;
  font-family: notosans;
  line-height: 45px;
}

.count-title {
  margin: 10px 0 0px 0;
}

.goup {
  margin-top: -20px;
}
</style>
