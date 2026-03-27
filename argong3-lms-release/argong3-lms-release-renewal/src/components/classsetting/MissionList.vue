<template>
  <div class="container">
    <h2 class="headline">학습 설정 > 과제 미션 관리</h2>

    <div class="create-btn-wrap">
      <button class="btn" :class="{ disabled: isCreateDisabled }" :disabled="isCreateDisabled" @click="$emit('create-mission')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M19.0938 11.5938C19.0938 11.8324 18.9989 12.0614 18.8301 12.2301C18.6614 12.3989 18.4324 12.4937 18.1938 12.4937H12.4937V18.1938C12.4937 18.4324 12.3989 18.6614 12.2301 18.8301C12.0614 18.9989 11.8324 19.0938 11.5938 19.0938C11.3551 19.0938 11.1261 18.9989 10.9574 18.8301C10.7886 18.6614 10.6937 18.4324 10.6937 18.1938V12.4937H4.99375C4.75506 12.4937 4.52614 12.3989 4.35735 12.2301C4.18857 12.0614 4.09375 11.8324 4.09375 11.5938C4.09375 11.3551 4.18857 11.1261 4.35735 10.9574C4.52614 10.7886 4.75506 10.6937 4.99375 10.6937H10.6937V4.99375C10.6937 4.75506 10.7886 4.52614 10.9574 4.35735C11.1261 4.18857 11.3551 4.09375 11.5938 4.09375C11.8324 4.09375 12.0614 4.18857 12.2301 4.35735C12.3989 4.52614 12.4937 4.75506 12.4937 4.99375V10.6937H18.1938C18.4324 10.6937 18.6614 10.7886 18.8301 10.9574C18.9989 11.1261 19.0938 11.3551 19.0938 11.5938Z"
            fill="white"
          />
        </svg>
        신규미션 생성
      </button>
      <p v-if="isCreateDisabled" class="limit-msg">Basic 플랜은 교사미션 생성이 5개까지 가능합니다.</p>
    </div>

    <WrapContent>
      <div class="inner">
        <div class="flex-center-between">
          <h4 class="body2-bold">
            <span class="star"></span>
            수업 집중
          </h4>
          <div class="checkbox-container">
            <div class="checkbox-group">
              <div>
                <input
                  type="checkbox"
                  id="all"
                  v-model="pendingFilter.all"
                  @change="handleFilterChange('all')"
                />
                <label for="all">전체</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="unassigned"
                  v-model="pendingFilter.beforeStart"
                  @change="handleFilterChange('beforeStart')"
                />
                <label for="unassigned">시작전</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="inProgress"
                  v-model="pendingFilter.ongoing"
                  @change="handleFilterChange('ongoing')"
                />
                <label for="inProgress">진행중</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="completed"
                  v-model="pendingFilter.ended"
                  @change="handleFilterChange('ended')"
                />
                <label for="completed">종료</label>
              </div>
            </div>

            <button class="checkbox-btn" @click="applyFilter">적용</button>
          </div>
        </div>

        <div v-if="loading" class="loading-skeleton"></div>
        <template v-else>
          <table class="table-default">
            <thead>
              <tr>
                <th width="60">번호</th>
                <th>과제명</th>
                <th width="86">대상</th>
                <th width="170">과제 기간</th>
                <th width="138">상태</th>
                <th width="110">상세 조회</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(mission, index) in paginatedMissions"
                :key="mission.uid"
              >
                <td>
                  {{
                    (
                      missions.length -
                      ((currentPage - 1) * itemsPerPage + index)
                    )
                      .toString()
                      .padStart(2, "0")
                  }}
                </td>
                <td>
                  <span class="flex">
                    <span v-if="mission.missionMode" class="star"></span>
                    {{ mission.missionName }}</span
                  >
                </td>
                <td>
                  <span
                    v-if="
                      mission.students.length === mission.totalStudentsCount
                    "
                  >
                    {{ getFilteredStudentsCount(mission).display }}
                  </span>
                  <span v-else>
                    {{ getFilteredStudentsCount(mission).display }}
                  </span>
                </td>
                <td>
                  {{ formatDateRange(mission.startDate, mission.endDate) }}
                </td>
                <td>
                  <span class="center">
                    <template v-if="mission.missionStatus === -1">
                      <span class="badge not-started">시작전</span>
                    </template>
                    <template v-else-if="mission.missionStatus === 0">
                      <div
                        class="chart_blue-bg"
                        style="width: 84px; height: 6px"
                      >
                        <div
                          class="chart_bar"
                          :style="{
                            width:
                              calculateProgress(
                                mission.completeStudentsCount,
                                getFilteredStudentsCount(mission).count
                              ) + '%',
                          }"
                        ></div>
                      </div>
                      <span class="font-sm"
                        >{{ mission.completeStudentsCount }}/{{
                          getFilteredStudentsCount(mission).count
                        }}명 완료</span
                      >
                    </template>
                    <template v-else-if="mission.missionStatus === 1">
                      <span class="badge completed">종료</span>
                      <span class="font-sm"
                        >{{ mission.completeStudentsCount }}/{{
                          getFilteredStudentsCount(mission).count
                        }}명 완료</span
                      >
                    </template>
                  </span>
                </td>
                <td>
                  <span class="more" @click="$emit('show-result', mission)"
                    >More</span
                  >
                </td>
              </tr>
            </tbody>
          </table>

          <v-pagination
            class="pagination-default"
            color="blue"
            v-model="currentPage"
            :length="pagelength"
            :size="30"
            total-visible="8"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
          ></v-pagination>
        </template>
      </div>
    </WrapContent>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  defineProps,
  defineEmits,
} from "vue";
import { useStore } from "vuex";
import WrapContent from "../common/WrapContent.vue";
import { getStudentList, getMissionCount } from "../../api/api-list-2";
import { userInfo } from "../../api/api-list";

const props = defineProps({
  missions: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(["create-mission", "show-result"]);

const store = useStore();
const currentPage = ref(1);
const itemsPerPage = 8;
const localMissions = ref([]);
const loading = ref(true);
const teacherList = ref([]);
const isCreateDisabled = ref(false);

const pendingFilter = reactive({
  all: true,
  beforeStart: false,
  ongoing: false,
  ended: false,
});

const filter = reactive({
  all: true,
  beforeStart: false,
  ongoing: false,
  ended: false,
});

const days = ["일", "월", "화", "수", "목", "금", "토"];

const formatDateRange = (startDate, endDate) => {
  const format = (date) => {
    const d = new Date(date);
    const m = d.getMonth() + 1;
    const dd = d.getDate();
    const dow = days[d.getDay()];
    return `${m}/${dd}(${dow})`;
  };
  return `${format(startDate)} - ${format(endDate)}`;
};

const calculateProgress = (completeCount, totalCount) => {
  if (totalCount === 0) return 0;
  return Math.round((completeCount / totalCount) * 100);
};

const handleFilterChange = (type) => {
  if (type === "all") {
    const value = pendingFilter.all;
    pendingFilter.beforeStart = value;
    pendingFilter.ongoing = value;
    pendingFilter.ended = value;
  } else {
    pendingFilter.all = false;
    if (
      pendingFilter.beforeStart &&
      pendingFilter.ongoing &&
      pendingFilter.ended
    ) {
      pendingFilter.all = true;
    }
  }
};

const applyFilter = () => {
  filter.all = pendingFilter.all;
  filter.beforeStart = pendingFilter.beforeStart;
  filter.ongoing = pendingFilter.ongoing;
  filter.ended = pendingFilter.ended;
  currentPage.value = 1;
};

const fetchStudentList = async () => {
  try {
    const response = await getStudentList();
    if (response.data?.data) {
      teacherList.value = response.data.data
        .filter((student) => student.schoolLevel === "lms")
        .map((teacher) => teacher.user);
    }
  } catch (error) {
    console.error("선생님 목록 오류:", error);
  }
};

const getFilteredStudentsCount = (mission) => {
  const filteredStudents = mission.students.filter(
    (student) => !teacherList.value.includes(student)
  );

  if (filteredStudents.length === mission.totalStudentsCount) {
    return {
      display: "반 전체",
      count: filteredStudents.length,
    };
  }

  return {
    display: `${filteredStudents.length}/${mission.totalStudentsCount}명`,
    count: filteredStudents.length,
  };
};

const filteredMissions = computed(() => {
  if (filter.all) return localMissions.value;

  return localMissions.value.filter((mission) => {
    if (filter.beforeStart && mission.missionStatus === -1) return true;
    if (filter.ongoing && mission.missionStatus === 0) return true;
    if (filter.ended && mission.missionStatus === 1) return true;
    return false;
  });
});

const pagelength = computed(() =>
  Math.ceil(filteredMissions.value.length / itemsPerPage)
);

const paginatedMissions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return [...filteredMissions.value].reverse().slice(start, end);
});

watch(
  () => props.missions,
  (newMissions) => {
    // console.log('미션 목록:', newMissions)
    localMissions.value = [...newMissions];
    loading.value = false;
  },
  { immediate: true }
);

onMounted(async () => {
  fetchStudentList();
  try {
    const res = await userInfo();
    if (res?.data?.data?.payPlan === 'b') {
      const subject = store.state.currentSubject === 'math' ? 'math' : 'eng';
      const countRes = await getMissionCount(subject);
      if (countRes?.data?.data.count >= 5) {
        isCreateDisabled.value = true;
      }
    }
  } catch (err) {
    console.error(err);
    isCreateDisabled.value = false;
  }
});
</script>


<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  > div {
    width: 880px;
  }
}

.inner {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.create-btn-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.limit-msg {
  font-size: 13px;
  color: #e03e3e;
  font-family: "notosansregular";
}

.btn {
  min-width: 140px;
  min-height: 44px;
  background: var(--status-green);
  color: #fff;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 24px;
  font-family: "notosansregular";
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover:not(.disabled) {
    opacity: 0.9;
  }
  &.blue {
    background: var(--button-blue);
  }
  &.disabled {
    background: #b0b0b0;
    cursor: not-allowed;
    opacity: 0.7;
  }
}

h4 {
  color: #ffba00;
  display: flex;
  align-items: center;
  gap: 6px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.checkbox-group {
  display: flex;
  gap: 10px;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}

.checkbox-group input[type="checkbox"] {
  margin-right: 4px;
}

.checkbox-group label {
  font-size: 14px;
  color: #212529;
}

.checkbox-btn {
  background: var(--button-blue);
  color: white;
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 13px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  &:hover {
    opacity: 0.9;
  }
}

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
  color: hsl(0, 0%, 16%);
  text-align: center;
}
td span.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
td span.font-sm {
  font-size: 12px;
}

.loading-skeleton {
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
  animation: fadeBackground 1s infinite;
  border-radius: 20px;
}
</style>
