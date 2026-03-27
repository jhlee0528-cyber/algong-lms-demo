<template>
  <div class="container">
    <h2 class="headline">학습 설정 > 과제 미션 관리 > 미션 결과 조회</h2>

    <WrapContent>
      <div class="inner">
        <div class="flex-center-between">
          <h4 class="headline2">{{ mission?.missionName }}</h4>
          <div class="btn-wrap">
            <button class="btn-sm" @click="openDeleteConfirmModal">
              과제 삭제
            </button>
            <button
              class="btn-sm"
              :class="{ fill: !isExpired, disabled: isExpired }"
              @click="goToEdit"
              :disabled="isExpired"
            >
              과제 수정
            </button>
          </div>
        </div>

        <div class="detail">
          <div class="item">
            <div class="info">
              <h6>단원</h6>
              <p v-if="subject === 'eng' && mission?.engLessonInfo">
                {{ mission?.engLessonInfo.lessonIndex }}단원 &lt;{{
                  mission?.engLessonInfo.lessonName
                }}&gt;
              </p>
              <p v-else-if="subject === 'math'">
                {{ mission.mathLessonInfo.grade }}학년
                {{ mission?.mathLessonInfo?.semester }}학기
                {{ mission?.mathLessonInfo?.unit }}단원 &lt;{{
                  mission?.mathLessonInfo?.unitTitle
                }}&gt;
              </p>
            </div>
          </div>

          <div class="item">
            <div class="info">
              <h6>기간</h6>
              <p>{{ formattedStartDate }} ~ {{ formattedEndDate }}</p>
            </div>
          </div>

          <div class="item">
            <div class="info">
              <h6>과제 유형</h6>
              <ul v-if="subject === 'eng'">
                <li v-if="hasActivity">액티비티 ({{ formatActivityText }})</li>
                <li v-if="hasAiChat">AI 대화 ({{ formatAiChatText }})</li>
                <li v-if="hasAiTutor">AI 튜터 ({{ formatAiTutorText }})</li>
              </ul>

              <ul v-else-if="subject === 'math'">
                <li v-if="mission?.missionTypeText">
                  {{ mission?.missionTypeText?.typeText }}
                  ({{ mission?.mathLessonInfo?.semester }}학기
                  {{ mission?.mathLessonInfo?.unit }}단원
                  <template v-if="mission?.missionTypeText?.missionType === 2">
                    <template
                      v-for="(item, index) in mission?.missionTypeText
                        ?.lessonInfo"
                      :key="index"
                    >
                      {{ lessonTexts[item.lesson] }}
                      {{ item.count }}문제<template
                        v-if="
                          index !==
                          mission?.missionTypeText?.lessonInfo.length - 1
                        "
                        >,
                      </template>
                    </template>
                  </template>
                  <template v-else>
                    {{ mission?.missionTypeText?.count }}문제
                  </template>
                  )
                </li>
              </ul>
            </div>
          </div>

          <div class="item">
            <div class="info">
              <h6>보상</h6>
              <ul>
                <li>4종 스톤 x{{ mission?.rewards?.stone }}</li>
                <li>골드 x{{ mission?.rewards?.gold }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </WrapContent>

    <WrapContent>
      <div class="inner">
        <h4 class="headline2">미션 결과 요약</h4>
        <div class="summary-wrap">
          <div class="flex">
            <h6>완료율</h6>
            <div class="chart-wrap">
              <div class="chart_blue-bg" style="width: 200px; height: 12px">
                <div
                  class="chart_bar"
                  :style="{ width: missionCompletionStats.percentage + '%' }"
                ></div>
              </div>
              <span class="chart-text"
                >{{ missionCompletionStats.completeCount }}/{{
                  missionCompletionStats.totalCount
                }}명 완료</span
              >
            </div>
          </div>

          <div class="flex">
            <h6>정답률</h6>

            <div class="circle-wrap">
              <template v-if="subject === 'eng'">
                <div
                  v-if="
                    mission?.missionTypeText?.listening > 0 ||
                    mission?.missionTypeText?.reading > 0 ||
                    mission?.missionTypeText?.speaking > 0 ||
                    mission?.missionTypeText?.writing > 0
                  "
                >
                  <v-progress-circular
                    :model-value="mission?.activityAnswerPercent || 0"
                    :rotate="-90"
                    :size="80"
                    :width="10"
                    bg-color="#eaf4ff"
                    color="var(--main-blue)"
                  >
                    <span style="color: #3d90ef"
                      >{{ mission?.activityAnswerPercent || 0 }}%</span
                    >
                  </v-progress-circular>
                  <p>액티비티</p>
                </div>
                <div
                  v-if="
                    mission?.missionTypeText?.gptTalking > 0 ||
                    mission?.missionTypeText?.talking > 0
                  "
                >
                  <v-progress-circular
                    :model-value="mission?.talkingAnswerPercent || 0"
                    :rotate="-90"
                    :size="80"
                    :width="10"
                    bg-color="#eaf4ff"
                    color="var(--main-blue)"
                  >
                    <span style="color: #3d90ef"
                      >{{ mission?.talkingAnswerPercent || 0 }}%</span
                    >
                  </v-progress-circular>
                  <p>AI 대화</p>
                </div>
                <div v-if="mission?.missionTypeText?.tutor > 0">
                  <v-progress-circular
                    :model-value="mission?.tutorAnswerPercent || 0"
                    :rotate="-90"
                    :size="80"
                    :width="10"
                    bg-color="#eaf4ff"
                    color="var(--main-blue)"
                  >
                    <span style="color: #3d90ef"
                      >{{ mission?.tutorAnswerPercent || 0 }}%</span
                    >
                  </v-progress-circular>
                  <p>AI 튜터</p>
                </div>
              </template>
              <template v-else-if="subject === 'math'">
                <div>
                  <v-progress-circular
                    :model-value="
                      mission?.missionTypeText?.missionType === 3
                        ? mission?.completeStudentCount > 0
                          ? 100
                          : 0
                        : mission?.mathAnswerPercent || 0
                    "
                    :rotate="-90"
                    :size="80"
                    :width="10"
                    bg-color="#eaf4ff"
                    color="var(--main-blue)"
                  >
                    <span style="color: #3d90ef"
                      >{{
                        mission?.missionTypeText?.missionType === 3
                          ? mission?.completeStudentCount > 0
                            ? 100
                            : 0
                          : mission?.mathAnswerPercent || 0
                      }}%</span
                    >
                  </v-progress-circular>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </WrapContent>

    <WrapContent>
      <div class="inner">
        <h4 class="headline2">학생별 미션 결과</h4>
        <table class="table-default">
          <thead>
            <tr>
              <th width="120">학생명</th>
              <th width="114">상태</th>
              <th width="150">진행률</th>
              <th width="132">완료일</th>
              <th>학습 시간</th>
              <th>획득 점수</th>
              <th>상세 조회</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in filteredStudentsResult" :key="index">
              <td>{{ student.name }}</td>
              <td>
                <span
                  :class="[
                    'badge',
                    student.complete ? 'completed' : 'incomplete',
                  ]"
                >
                  {{ student.complete ? "완료" : "미완료" }}
                </span>
              </td>
              <td>
                <span class="center">
                  <div class="chart_blue-bg" style="width: 84px; height: 8px">
                    <div
                      class="chart_bar"
                      :style="{ width: student.progress + '%' }"
                    ></div>
                  </div>
                  <span class="font-sm">{{ student.progress }}%</span>
                </span>
              </td>
              <td>{{ formatCompleteDate(student.completeDate) }}</td>
              <td>
                {{
                  student.studyTime
                    ? student.studyTime < 60
                      ? `${student.studyTime}초`
                      : `${Math.floor(student.studyTime / 60)}분`
                    : "-"
                }}
              </td>
              <td>
                {{ student.answerPercent ? `${student.answerPercent}점` : "-" }}
              </td>
              <td>
                <DetailIcon @click="openDetailModal(student)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </WrapContent>

    <!-- 상세 조회 모달 -->
    <v-dialog v-model="showDetailModal" max-width="960">
      <MissionDetailModal
        v-model="showDetailModal"
        :student="selectedStudent"
        :detailMission="detailMission"
        :subject="subject"
        @close="handleCloseDetail"
      />
    </v-dialog>

    <!-- 삭제 확인 모달 -->
    <v-dialog v-model="showDeleteConfirmModal" max-width="480">
      <v-card class="delete-confirm-modal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <circle cx="20" cy="20" r="18.5" stroke="#F88D10" stroke-width="3" />
          <path
            d="M20 8.66406V23.9974"
            stroke="#F88D10"
            stroke-width="3"
            stroke-linecap="round"
          />
          <circle cx="20" cy="29.5" r="1.5" fill="#F88D10" />
        </svg>
        <v-card-title class="headline">확인 요청</v-card-title>
        <v-card-text>
          <p class="body1">해당 과제에 대한 모든 기록이 삭제됩니다.</p>
          <p class="body1">정말 삭제하시겠습니까?</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="modal-btn cancel"
            @click="showDeleteConfirmModal = false"
            >취소</v-btn
          >
          <v-btn class="modal-btn ok" @click="confirmDelete">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 삭제 완료 모달 -->
    <v-dialog v-model="showDeleteSuccessModal" max-width="480">
      <v-card class="delete-success-modal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <circle cx="20" cy="20" r="18.5" stroke="#10D298" stroke-width="3" />
          <path
            d="M9.5 20.5555L16.8333 27.2749L29.5 11.8203"
            stroke="#10D298"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <v-card-title class="headline">삭제 완료</v-card-title>
        <v-card-text>
          <p class="body1">해당 과제에 대한 모든 기록을 삭제했습니다.</p>
          <p class="body1">학생 화면에서도 미션이 보이지 않게 됩니다.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn class="modal-btn ok" @click="closeDeleteSuccessModal"
            >확인</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, watch, onMounted } from "vue";
import WrapContent from "../common/WrapContent.vue";
import MissionDetailModal from "./MissionDetailModal.vue";
import DetailIcon from "../icons/DetailIcon.vue";
import {
  deleteEnglishMission,
  getMathUnitDetail,
  deleteMathMission,
  getStudentMissionDetail,
  teacherinfo,
  getMathGradeUnitDetail,
} from "../../api/api-list-2";

const props = defineProps({
  mission: {
    type: Object,
    required: true,
  },
  subject: {
    type: String,
    required: true,
    validator: (value) => ["eng", "math"].includes(value),
  },
});

const emit = defineEmits(["back-to-list", "edit-mission"]);

const showDetailModal = ref(false);
const showDeleteConfirmModal = ref(false);
const showDeleteSuccessModal = ref(false);
const selectedStudent = ref(null);
const mathLessonDetails = ref(null);
const detailMission = ref(null);
const teacherInfo = ref(null);

const formatDate = (date, withYear = true, delimiter = ".") => {
  if (!date) return "";
  const d = new Date(date);
  const dayStr = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  const dateStr = `${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}${delimiter}${String(d.getDate()).padStart(2, "0")}(${dayStr})`;
  return withYear ? `${d.getFullYear()}${delimiter}${dateStr}` : dateStr;
};

const formattedStartDate = computed(() =>
  props.mission?.startDate ? formatDate(props.mission.startDate) : ""
);

const formattedEndDate = computed(() =>
  props.mission?.endDate ? formatDate(props.mission.endDate) : ""
);

const formatCompleteDate = (date) =>
  !date || date === "-" ? "-" : formatDate(date, false, "/");

const missionCompletionStats = computed(() => {
  if (!props.mission?.studentsResult || !teacherInfo.value)
    return { completeCount: 0, totalCount: 0, percentage: 0 };

  const filteredStudents = props.mission.studentsResult.filter(
    (student) => student.id !== teacherInfo.value.id
  );
  const totalCount = filteredStudents.length;
  const completeCount = filteredStudents.filter(
    (student) => student.complete
  ).length;
  const percentage = totalCount > 0 ? (completeCount / totalCount) * 100 : 0;

  return {
    completeCount,
    totalCount,
    percentage: Math.round(percentage),
  };
});

const isExpired = computed(() => {
  if (!props.mission?.endDate) return false;
  const endDate = new Date(props.mission.endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return endDate < today;
});

const lessonTexts = computed(() => {
  if (!mathLessonDetails.value || !props.mission?.missionTypeText?.lessonInfo)
    return {};

  return props.mission.missionTypeText.lessonInfo.reduce((acc, item) => {
    const lessonDetail = mathLessonDetails.value[item.lesson];
    acc[item.lesson] =
      lessonDetail?.lessonTitle || lessonDetail || `${item.lesson} 차시`;
    return acc;
  }, {});
});

const formatItemsText = (items, labels) => {
  return Object.entries(labels)
    .filter(([key]) => items?.[key] > 0)
    .map(([key, label]) => `${label} ${items[key]}회`)
    .join(", ");
};

const formatActivityText = computed(() =>
  formatItemsText(props.mission?.missionTypeText || {}, {
    listening: "듣기",
    reading: "읽기",
    speaking: "말하기",
    writing: "쓰기",
  })
);

const formatAiChatText = computed(() =>
  formatItemsText(props.mission?.missionTypeText || {}, {
    talking: "교과서 대화",
    gptTalking: "GPT 대화",
  })
);

const formatAiTutorText = computed(() => {
  const tutor = props.mission?.missionTypeText?.tutor;
  return tutor > 0 ? `단어맞춤학습 ${tutor}회` : "";
});

const hasActivity = computed(() => formatActivityText.value.length > 0);
const hasAiChat = computed(() => formatAiChatText.value.length > 0);
const hasAiTutor = computed(() => formatAiTutorText.value.length > 0);

const filteredStudentsResult = computed(() => {
  if (!props.mission?.studentsResult || !teacherInfo.value)
    return props.mission?.studentsResult || [];
  return props.mission.studentsResult.filter(
    (student) => student.id !== teacherInfo.value.id
  );
});

const openDetailModal = async (student) => {
  selectedStudent.value = {
    ...student,
    mission: props.mission,
  };

  const requestData = {
    uid: props.mission.uid,
    subject: props.subject,
    id: selectedStudent.value.id,
  };

  try {
    const response = await getStudentMissionDetail(requestData);
    if (response.data.data.status === false) {
      console.warn("미션 상세 데이터를 가져오는데 실패했습니다.");
      return;
    }
    detailMission.value = response.data.data;

    if (props.subject === "math") {
      detailMission.value.mathLessonInfo.grade =
        props.mission.mathLessonInfo.grade;
    }

    showDetailModal.value = true;
  } catch (error) {
    console.error("미션 상세 정보 조회 실패:", error);
  }
};

const handleCloseDetail = () => {
  showDetailModal.value = false;
  selectedStudent.value = null;
};

const openDeleteConfirmModal = () => {
  showDeleteConfirmModal.value = true;
};

const confirmDelete = () => {
  const deleteFn =
    props.subject === "eng" ? deleteEnglishMission : deleteMathMission;
  deleteFn({ uid: props.mission.uid })
    .then(() => {
      showDeleteConfirmModal.value = false;
      showDeleteSuccessModal.value = true;
    })
    .catch((error) => {
      console.error("미션 삭제 실패:", error);
      showDeleteConfirmModal.value = false;
    });
};

const closeDeleteSuccessModal = () => {
  showDeleteSuccessModal.value = false;
  emit("back-to-list");
};

const goToEdit = () => {
  emit("edit-mission", props.mission);
};

const fetchMathLessonDetails = async () => {
  try {
    const response = await getMathGradeUnitDetail({
      grade: props.mission.mathLessonInfo.grade,
    });

    const unitDetails = response.data.data.find(
      (unit) =>
        unit.semester === props.mission.mathLessonInfo.semester &&
        unit.unitTitle === props.mission.mathLessonInfo.unitTitle
    );

    if (unitDetails) {
      mathLessonDetails.value = unitDetails.lessons.reduce((acc, lesson) => {
        acc[lesson.lesson] = lesson;
        return acc;
      }, {});
    } else {
      console.log("일치하는 단원을 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("수학 차시 정보 조회 실패:", error);
  }
};

const fetchTeacherInfo = async () => {
  try {
    const response = await teacherinfo();
    if (response.data && response.data.data) {
      teacherInfo.value = response.data.data;
    }
  } catch (error) {
    console.error("선생님 정보를 가져오는 중 오류 발생:", error);
  }
};

watch(
  () => props.mission,
  (newVal) => {
    if (
      newVal?.missionTypeText?.missionType === 2 &&
      props.subject === "math"
    ) {
      fetchMathLessonDetails();
    }
  },
  { immediate: true }
);

onMounted(() => {
  // console.log("전달받은 미션 데이터:", props.mission);
  fetchTeacherInfo();
});
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  > div {
    width: 880px;
  }
}

.inner {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.gap {
  display: flex;
  flex-direction: column;
  gap: 15px;

  p {
    font-size: 16px;
    color: #636363;
  }
}

.btn {
  min-width: 126px;
  min-height: 48px;

  background: #10d298;
  color: #fff;
  margin: 0 auto;
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 24px;
  font-family: "notosansregular";
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  &.blue {
    background: #258bff;
  }
}

.body2-bold {
  color: #ffba00;
  display: flex;
  align-items: center;
  gap: 6px;
}

.detail .info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: #292929;

  h6 {
    color: #3d90ef;
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

  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}

h6 {
  font-family: "notosans";
  font-size: 16px;
  color: #292929;
  white-space: nowrap;
}

.circle-wrap {
  display: flex;
  gap: 30px;
  align-items: center;
}

/* v-radio 커스텀 스타일 */
:deep(.v-radio) {
  .v-selection-control {
    min-height: unset;
  }

  .v-selection-control__input {
    .v-selection-control__radio {
      width: 20px;
      height: 20px;
      border: 2px solid #88c0ff !important;
      border-radius: 50%;
      background-color: transparent;
    }

    .v-selection-control__radio::before {
      opacity: 0;
      border-radius: 50%;
    }
  }

  .v-selection-control--dirty {
    .v-selection-control__radio {
      border: 6px solid #3d90ef !important;
      background-color: #fff;
    }
  }

  .v-label {
    font-size: 16px;
    color: #292929;
    opacity: 1;
  }
}

.summary-wrap {
  display: flex;
  gap: 120px;
  align-items: center;
  height: 140px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: calc(42%);
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: #e8e8e8;
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
  gap: 40px;

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

.arrow-icon.is-open {
  transform: rotate(180deg);
}
.btn-wrap {
  display: flex;
  gap: 20px;
}
.btn-sm {
  padding: 8px 24px;
  border: 1px solid #258bff;
  color: #258bff;
  border-radius: 6px;
  font-size: 14px;
  line-height: 18px;
}
.btn-sm.fill {
  border: none;
  background: #258bff;
  color: #fff;
}
.btn-sm.disabled {
  border: none;
  background: #cae3ff;
  color: #fff;
  cursor: default;
}

:deep(.v-input__details) {
  display: none;
}

.delete-confirm-modal,
.delete-success-modal {
  width: 100%;
  padding: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px !important;
  .v-card-title {
    /* padding: 0 0 16px; */
  }

  .v-card-text {
    padding: 16px 0 24px;

    p {
      margin: 0;

      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }

  .v-card-actions {
    gap: 5px;
    /* margin-top: 20px; */
    .modal-btn {
      border: none;
      width: 180px;
      height: 50px;
      border-radius: 10px;
      font-size: 18px;
      font-family: notosans;

      &.cancel {
        border: 1px solid #d2d2d2;
        color: #292929;
      }

      &.ok {
        background-color: #258bff;
        color: #fff;
      }
    }
  }
}
.table-default td {
  padding: 18px 10px !important;
}
td span.font-sm {
  font-size: 12px;
}
</style>
