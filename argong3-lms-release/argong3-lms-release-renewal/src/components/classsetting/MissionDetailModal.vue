<template>
  <v-card class="wrap">
    <div class="modal-title">
      <h2>
        학습 설정 > 과제 미션 관리 > 미션 결과 조회 >
        <span class="name">{{ student?.name }}</span>
      </h2>
      <button @click="emit('close')">
        <CloseIcon />
      </button>
    </div>

    <div v-if="!detailMission" class="loading-skeleton"></div>
    <div v-else class="modal-content scrollbar">
      <div class="border">
        <div class="inner">
          <h4>
            {{ detailMission?.missionName }}
            <span v-if="detailMission?.missionMode" class="priority-text"
              ><span class="star"></span>수업 집중</span
            >
          </h4>
          <div class="detail">
            <div class="item">
              <div class="info">
                <h6>단원</h6>
                <p v-if="subject === 'eng'">
                  {{ detailMission?.engLessonInfo.lessonIndex }}단원 &lt;{{
                    detailMission?.engLessonInfo.lessonName
                  }}&gt;
                </p>
                <p v-else-if="subject === 'math'">
                  {{ detailMission.mathLessonInfo.grade }}학년
                  {{ detailMission?.mathLessonInfo?.semester }}학기
                  {{ detailMission?.mathLessonInfo?.unit || "" }}단원 &lt;{{
                    detailMission?.mathLessonInfo?.unitTitle || ""
                  }}&gt;
                </p>
              </div>
            </div>

            <div class="item">
              <div class="info">
                <h6>기간</h6>
                <p>
                  {{ formatDateWithDay(detailMission?.startDate) }} ~
                  {{ formatDateWithDay(detailMission?.endDate) }}
                </p>
              </div>
            </div>

            <div class="item">
              <div class="info">
                <h6>과제 유형</h6>
                <ul v-if="subject === 'eng' && detailMission?.missionTypeText">
                  <li v-if="hasActivity">
                    액티비티 ({{ formatActivityText }})
                  </li>
                  <li v-if="hasAiChat">AI 대화 ({{ formatAiChatText }})</li>
                  <li v-if="hasAiTutor">AI 튜터 ({{ formatAiTutorText }})</li>
                </ul>
                <p
                  v-if="
                    subject === 'math' &&
                    detailMission?.missionTypeText.missionType === 2
                  "
                >
                  {{ detailMission?.missionTypeText.typeText }}
                  ({{ detailMission?.mathLessonInfo?.semester }}학기
                  {{ detailMission?.mathLessonInfo?.unit }}단원
                  <template
                    v-for="(info, index) in detailMission?.missionTypeText
                      .lessonInfo"
                    :key="index"
                  >
                    {{ lessonTexts[info.lesson] }}
                    {{ info.count }}문제<template
                      v-if="
                        index <
                        detailMission?.missionTypeText.lessonInfo.length - 1
                      "
                      >,
                    </template>
                  </template>
                  )
                </p>
                <p
                  v-if="
                    subject === 'math' &&
                    detailMission?.missionTypeText.missionType !== 2
                  "
                >
                  {{ detailMission?.missionTypeText.typeText }}
                  ({{ detailMission?.mathLessonInfo?.semester }}학기
                  {{ detailMission?.mathLessonInfo?.unit }}단원
                  {{ detailMission?.missionTypeText.count }}문제)
                </p>
              </div>
            </div>

            <div class="item">
              <div class="info">
                <h6>보상</h6>
                <ul>
                  <li>4종 스톤 x{{ detailMission?.rewards.stone }}</li>
                  <li>골드 x{{ detailMission?.rewards.gold }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 요약 -->
      <div class="border">
        <h4>
          미션 결과 요약
          <span v-if="detailMission?.complete" class="badge completed"
            >완료</span
          >
          <span v-else class="badge incomplete">미완료</span>
        </h4>

        <div class="summary-wrap">
          <div class="flex" style="gap: 40px">
            <h6>완료율</h6>
            <div class="chart-wrap">
              <div class="chart_blue-bg" style="width: 200px; height: 12px">
                <div
                  class="chart_bar"
                  :style="{ width: `${detailMission?.progress || 0}%` }"
                ></div>
              </div>
              <span class="chart-text"
                >{{ detailMission?.progress || 0 }}% 완료</span
              >
            </div>
          </div>
          <div class="flex" style="gap: 40px">
            <h6>정답률</h6>
            <div class="circle-wrap">
              <template v-if="subject === 'eng'">
                <div
                  v-if="
                    detailMission?.missionTypeText?.listening > 0 ||
                    detailMission?.missionTypeText?.reading > 0 ||
                    detailMission?.missionTypeText?.speaking > 0 ||
                    detailMission?.missionTypeText?.writing > 0
                  "
                >
                  <v-progress-circular
                    :model-value="detailMission?.answerPercent.activity"
                    :rotate="-90"
                    :size="80"
                    :width="10"
                    bg-color="#eaf4ff"
                    color="var(--main-blue)"
                  >
                    <span style="color: #3d90ef"
                      >{{ detailMission?.answerPercent.activity }}%</span
                    >
                  </v-progress-circular>
                  <p>액티비티</p>
                </div>
                <div
                  v-if="
                    detailMission?.missionTypeText?.gptTalking > 0 ||
                    detailMission?.missionTypeText?.talking > 0
                  "
                >
                  <v-progress-circular
                    :model-value="detailMission?.answerPercent.talking"
                    :rotate="-90"
                    :size="80"
                    :width="10"
                    bg-color="#eaf4ff"
                    color="var(--main-blue)"
                  >
                    <span style="color: #3d90ef"
                      >{{ detailMission?.answerPercent.talking }}%</span
                    >
                  </v-progress-circular>
                  <p>AI 대화</p>
                </div>
                <div v-if="detailMission?.missionTypeText?.tutor > 0">
                  <v-progress-circular
                    :model-value="detailMission?.answerPercent.tutor"
                    :rotate="-90"
                    :size="80"
                    :width="10"
                    bg-color="#eaf4ff"
                    color="var(--main-blue)"
                  >
                    <span style="color: #3d90ef"
                      >{{ detailMission?.answerPercent.tutor }}%</span
                    >
                  </v-progress-circular>
                  <p>AI 튜터</p>
                </div>
              </template>

              <template v-else-if="subject === 'math'">
                <div>
                  <v-progress-circular
                    :model-value="
                      detailMission?.missionTypeText?.missionType === 3
                        ? detailMission?.progress > 0
                          ? 100
                          : 0
                        : detailMission?.answerPercent || 0
                    "
                    :rotate="-90"
                    :size="80"
                    :width="10"
                    bg-color="#eaf4ff"
                    color="var(--main-blue)"
                  >
                    <span style="color: #3d90ef"
                      >{{
                        detailMission?.missionTypeText?.missionType === 3
                          ? detailMission?.progress > 0
                            ? 100
                            : 0
                          : detailMission?.answerPercent || 0
                      }}%</span
                    >
                  </v-progress-circular>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- 영어 학습상세 -->
      <div v-if="subject === 'eng'">
        <EnglishStudyDetail
          :detailMission="detailMission"
          :isPremium="isPremium"
        />
      </div>

      <!-- 수학 학습상세 -->
      <div v-if="subject === 'math'">
        <div v-if="userInfoData">
          <MathStudyDetail
            :detailMission="detailMission"
            :grade="userInfoData.grade"
          />
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import CloseIcon from "../icons/CloseIcon.vue";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import weekday from "dayjs/plugin/weekday";
import customParseFormat from "dayjs/plugin/customParseFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import { userInfo } from "@/api/api-list";
import { getMathUnitDetail } from "@/api/api-list-2";
import EnglishStudyDetail from "./EnglishStudyDetail.vue";
import MathStudyDetail from "./MathStudyDetail.vue";
import { getMathGradeUnitDetail } from "../../api/api-list-2";

dayjs.extend(weekday);
dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.locale("ko");

const props = defineProps({
  student: {
    type: [Object, null],
    required: true,
  },
  detailMission: {
    type: [Object, null],
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const results = ref([]);
const mathLessonDetails = ref({});
const isPremium = ref(false);
const userInfoData = ref(null);

const hasActivity = computed(() => {
  const { listening, reading, speaking, writing } =
    props.detailMission?.missionTypeText || {};
  return [listening, reading, speaking, writing].some((value) => value > 0);
});

const hasAiChat = computed(() => {
  const { talking, gptTalking } = props.detailMission?.missionTypeText || {};
  return [talking, gptTalking].some((value) => value > 0);
});

const hasAiTutor = computed(() => {
  const { tutor } = props.detailMission?.missionTypeText || {};
  return tutor > 0;
});

const formatActivityText = computed(() => {
  const { listening, reading, speaking, writing } =
    props.detailMission?.missionTypeText || {};
  const parts = [];
  if (listening > 0) parts.push(`듣기 ${listening}회`);
  if (reading > 0) parts.push(`읽기 ${reading}회`);
  if (speaking > 0) parts.push(`말하기 ${speaking}회`);
  if (writing > 0) parts.push(`쓰기 ${writing}회`);
  return parts.join(", ");
});

const formatAiChatText = computed(() => {
  const { talking, gptTalking } = props.detailMission?.missionTypeText || {};
  const parts = [];
  if (talking > 0) parts.push(`교과서 대화 ${talking}회`);
  if (gptTalking > 0) parts.push(`GPT 대화 ${gptTalking}회`);
  return parts.join(", ");
});

const formatAiTutorText = computed(() => {
  const { tutor } = props.detailMission?.missionTypeText || {};
  return tutor > 0 ? `단어맞춤학습 ${tutor}회` : "";
});

const lessonTexts = computed(() => {
  if (
    !mathLessonDetails.value ||
    !props.detailMission?.missionTypeText?.lessonInfo
  ) {
    return {};
  }

  return props.detailMission.missionTypeText.lessonInfo.reduce((acc, item) => {
    const lessonDetail = mathLessonDetails.value[item.lesson];
    acc[item.lesson] =
      lessonDetail?.lessonTitle || lessonDetail || `${item.lesson} 차시`;
    return acc;
  }, {});
});

// Methods
const formatDateWithDay = (date) => {
  if (!date) return "";
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const formattedDate = dayjs(date);
  const dayOfWeek = days[formattedDate.day()];
  return `${formattedDate.format("YYYY.MM.DD")} (${dayOfWeek})`;
};

const processQuestions = () => {
  if (
    !props.detailMission ||
    !props.detailMission.questions ||
    !Array.isArray(props.detailMission.questions)
  ) {
    results.value = [];
    return;
  }

  // questions가 빈 배열인 경우
  if (props.detailMission.questions.length === 0) {
    results.value = [];
    return;
  }

  const questions = props.detailMission.questions
    .filter((el) => el && el.q_img_index) // 유효한 데이터만 필터링
    .map((el) => {
      const targetIndex = el.q_img_index.split("_")[2];
      const grade = targetIndex[0];
      const semester = targetIndex[1];
      const unit = targetIndex[2].padStart(2, "0");

      return {
        ...el,
        q_imgURL: `https://argame3.blob.core.windows.net/math-learning-resources-test/${grade}-${semester}/unit${unit}/question/${el.q_img_index}.png`,
        a_imgURL: `https://argame3.blob.core.windows.net/math-learning-resources-test/${grade}-${semester}/unit${unit}/answer/${el.a_img_index}.png`,
        submitAnswers:
          el.options && el.options.length
            ? el.submitAnswers.map(
                (element) =>
                  `${element}번 (${el.options[parseInt(element - 1)]})`
              )
            : el.submitAnswers,
      };
    });

  // lesson 값으로 그룹핑
  const lessonMap = {};
  questions.forEach((q) => {
    if (!lessonMap[q.lesson]) lessonMap[q.lesson] = [];
    lessonMap[q.lesson].push(q);
  });

  results.value = Object.entries(lessonMap).map(([lesson, qs]) => {
    const chunks = [];
    const chunkSize = 9;
    for (let i = 0; i < qs.length; i += chunkSize) {
      chunks.push(qs.slice(i, i + chunkSize));
    }

    return {
      lesson,
      title: `${lesson}차시`,
      questions: chunks,
      isOpen: false,
    };
  });
};

const fetchMathLessonDetails = async () => {
  try {
    if (!props.detailMission || !props.detailMission.mathLessonInfo) {
      console.log("수학 과제 정보가 없습니다.");
      return;
    }

    const response = await getMathGradeUnitDetail({
      grade: props.detailMission.mathLessonInfo.grade,
    });

    if (!response?.data?.data || !Array.isArray(response.data.data)) {
      console.log("수학 단원 정보를 가져올 수 없습니다.");
      return;
    }

    const unitDetails = response.data.data.find(
      (unit) =>
        unit.semester === props.detailMission.mathLessonInfo.semester &&
        unit.unitTitle === props.detailMission.mathLessonInfo.unitTitle
    );

    if (unitDetails) {
      mathLessonDetails.value = unitDetails.lessons.reduce((acc, lesson) => {
        acc[lesson.lesson] = lesson;
        return acc;
      }, {});
    } else {
      console.log("일치하는 단원을 찾을 수 없습니다.");
      mathLessonDetails.value = {};
    }
  } catch (error) {
    console.error("수학 차시 정보 조회 실패:", error);
    mathLessonDetails.value = {};
  }
};

const fetchUserInfo = async () => {
  try {
    const res = await userInfo();
    if (res?.data?.data) {
      const check = res.data.data;
      isPremium.value = check.payPlan === "p" || check.payPlan === "pm";
      userInfoData.value = {
        grade: check.grade,
      };
    } else {
      isPremium.value = false;
      userInfoData.value = null;
    }
  } catch (error) {
    isPremium.value = false;
    userInfoData.value = null;
  }
};

watch(
  () => props.detailMission,
  (newVal) => {
    if (!newVal || !newVal.questions || newVal.questions.length === 0) {
      results.value = [];
      return;
    }
    processQuestions();

    if (props.subject === "math" && newVal) {
      fetchMathLessonDetails();
    }
  },
  { immediate: true, deep: true }
);

onMounted(async () => {
  await fetchUserInfo();

  if (props.subject === "math" && props.detailMission) {
    await fetchMathLessonDetails();
  }

  if (props.detailMission && props.detailMission.questions) {
    processQuestions();
  }
});
</script>

<style scoped lang="scss">
.inner {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 40px;
  font-family: "notosans";

  h2 {
    font-size: 24px;
  }

  .name {
    color: #258bff;
  }
  button {
    cursor: pointer;
  }
}

:deep(.v-card) {
  border-radius: 16px;
  overflow: hidden;
}

:deep(.v-card-title) {
  font-size: 20px;
  color: #292929;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0 40px 30px;
  max-height: 650px;
  overflow: scroll;

  .border {
    border: 1px solid #cae3ff !important;
  }
  h5 {
    font-size: 20px;
  }
}

/* 차트 스타일 */
.chart-wrap {
  position: relative;
}
.chart_blue-bg {
  background: #e8f2ff;
  border-radius: 100px;
}
.chart_bar {
  height: 100%;
  background: #3d90ef;
  border-radius: 100px;
}
.chart-text {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
}

/* 정답률 섹션 스타일 */
.flex {
  display: flex;
  align-items: center;

  &:has(> .chart_blue-bg) {
    flex-direction: column;
    align-items: flex-start;
  }

  &:has(> v-progress-circular) {
    gap: 20px;
  }
}

/* 프로그레스 서클 컨테이너 스타일 */
:deep(.v-progress-circular) {
  margin-bottom: 12px;
  font-family: "notosans";

  .v-progress-circular__content {
    font-size: 16px;
    color: #292929;
  }
}

.v-progress-circular + p {
  font-size: 14px;
  color: #292929;
  text-align: center;
}

.summary-wrap {
  display: flex;
  gap: 120px;
  align-items: center;
  height: 100%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: calc(340px);
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: #e8e8e8;
  }

  > div {
    min-height: 140px;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: start;
    gap: 0;

    &::after {
      display: none;
    }
  }
}
.circle-wrap {
  display: flex;
  gap: 30px;
  align-items: center;
}

.border {
  padding: 20px;
  border: 1px solid #d2d2d2;
  border-radius: 16px;
}

h6 {
  font-size: 16px;
  color: #292929;
}

.detail .info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: #292929;

  h6 {
    color: #3d90ef;
    white-space: nowrap;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 30px;

    li {
      position: relative;

      &::before {
        content: "|";
        color: #d4d4d4;
        position: absolute;
        right: -16px;
      }
      &:last-child::before {
        display: none;
      }
    }
  }
}

.detail .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
  padding: 12px 0;

  &:last-child {
    border-bottom: none;
  }
}

h4 {
  display: flex;
  gap: 10px;
}

.priority-text {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #ffba00;
  font-family: "notosansregular";
}

.tab {
  min-width: 240px;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 16px;
  color: var(--main-blue);
  background: #dbecff;
  position: relative;
  border-radius: 20px 20px 0 0;
  text-align: center;
  font-family: "notosans";

  &.active {
    background: var(--main-blue);
    color: #fff;
  }
}

:deep(.pagination-default .v-btn--icon.v-btn--density-default) {
  width: 30px !important;
  height: 30px !important;
  min-width: 30px !important;
  min-height: 30px !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.info {
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
}

.info span {
  font-size: 14px;
}

.chart_blue-bg {
  width: 328px;
  height: 8px;
  background: #eee;
}

.loading-skeleton {
  width: 100%;
  height: 300px;
  background-color: rgb(220, 220, 220);
  animation: fadeBackground 1s infinite;
}
</style>
