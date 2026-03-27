<template>
  <div class="container">
    <h2 class="headline">학습 설정 > 학생 과제 현황 > {{ stuInfo.name }}</h2>
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
                <input type="checkbox" id="all" v-model="tempFilter.all" @change="handleFilterChange('all')" />
                <label for="all">전체</label>
              </div>
              <div>
                <input type="checkbox" id="todo" v-model="tempFilter.todo" @change="handleFilterChange('todo')" />
                <label for="todo">시작전</label>
              </div>
              <div>
                <input type="checkbox" id="progress" v-model="tempFilter.progress" @change="handleFilterChange('progress')" />
                <label for="progress">진행중</label>
              </div>
              <div>
                <input type="checkbox" id="done" v-model="tempFilter.done" @change="handleFilterChange('done')" />
                <label for="done">완료</label>
              </div>
              <div>
                <input type="checkbox" id="undone" v-model="tempFilter.undone" @change="handleFilterChange('undone')" />
                <label for="undone">미완료</label>
              </div>
            </div>

            <button class="checkbox-btn" @click="applyFilter">적용</button>
          </div>
        </div>
        <table class="table-default">
          <thead>
            <tr>
              <th width="220">과제명</th>
              <th width="170">과제 기간</th>
              <th width="90">완료일</th>
              <th>상태</th>
              <th width="90">획득 점수</th>
              <th width="125">상세 조회</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="mission in paginatedMissions" :key="mission.uid">
              <tr>
                <td>
                  <span class="flex">
                    <span v-if="mission.missionMode" class="star"></span>
                    {{ mission.missionName }}</span>
                </td>
                <td>{{ formatDate(mission.startDate) }} ~ {{ formatDate(mission.endDate) }}</td>
                <td>{{ formatDate(mission.completeDate) }}</td>
                <td>
                  <span class="center">
                    <template v-if="mission.missionStatus === 0">
                      <div class="chart_blue-bg" style="width: 84px; height: 6px;">
                        <div class="chart_bar" :style="{ width: mission.progress + '%' }"></div>
                      </div>
                      <span style="font-size: 12px;">{{ mission.progress }}%</span>
                    </template>
                    <template v-else>
                      <span :class="['badge', getStatusClass(mission.missionStatus, mission.completeDate)]">
                        {{ getStatusText(mission.missionStatus, mission.completeDate) }}
                      </span>
                    </template>
                  </span>
                </td>
                <td>{{ mission.score ? `${mission.score}점` : '-' }}</td>
                <td>
                  <span class="more" @click="handleShowDetail(stuInfo, mission)">
                    More
                  </span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <v-dialog v-model="showDetailModal" max-width="960">
          <MissionDetailModal
            v-model="showDetailModal"
            :student="selectedStudent"
            :detailMission="detailMission"
            :subject="subject"
            @close="handleCloseDetail"
          />
        </v-dialog>

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
      </div>
    </WrapContent>
  </div>
</template>

<script setup>
import { defineProps, ref, reactive, computed, onMounted, watch } from 'vue';
import WrapContent from '../common/WrapContent.vue';
import MissionDetailModal from './MissionDetailModal.vue';
import { getStudentMissionList, getStudentMissionDetail } from '../../api/api-list-2';

const props = defineProps({
  stuInfo: { required: true },
  subject: { required: true }
});

const showDetailModal = ref(false);
const selectedStudent = ref(null);
const currentPage = ref(1);
const itemsPerPage = 8
const missions = ref([]);
const detailMission = ref(null);

const filter = reactive({
  all: true,
  todo: false,
  progress: false,
  done: false,
  undone: false,
});

const tempFilter = reactive({
  all: true,
  todo: false,
  progress: false,
  done: false,
  undone: false,
});

const filteredMissions = computed(() => {
  if (filter.all) return missions.value;
  return missions.value.filter(mission => {
    if (filter.todo && mission.missionStatus === -1) return true;
    if (filter.progress && mission.missionStatus === 0) return true;
    if (filter.done && mission.missionStatus === 1 && mission.completeDate !== '-') return true;
    if (filter.undone && mission.missionStatus === 1 && mission.completeDate === '-') return true;
    return false;
  });
});

const pagelength = computed(() =>
  Math.ceil(filteredMissions.value.length / itemsPerPage)
)

const paginatedMissions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return [...filteredMissions.value].slice(start, end)
})


const fetchStudentMissions = async () => {
  if (!props.stuInfo?.id) return;

  try {
    const response = await getStudentMissionList(props.stuInfo.id);
    missions.value = response.data.data
      .filter(mission => mission.subject === props.subject)
      .reverse();

    currentPage.value = 1;
  } catch (error) {
    console.error('미션 목록 조회 실패:', error);
  }
};

const formatDate = (dateStr) => {
  if (!dateStr || dateStr === '-') return '-';
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    if (isNaN(d.getTime())) return '-';
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
    return `${month}/${day}(${dayOfWeek})`;
  } catch (error) {
    console.error('날짜 포맷팅 에러:', error);
    return '-';
  }
};

const getStatusClass = (status, completeDate) => {
  switch (status) {
    case -1: return 'not-started';
    case 0: return '';
    case 1: return completeDate === '-' ? 'incomplete' : 'completed';
    default: return 'not-started';
  }
};

const getStatusText = (status, completeDate) => {
  switch (status) {
    case -1: return '시작전';
    case 0: return '진행중';
    case 1: return completeDate === '-' ? '미완료' : '완료';
    default: return '시작전';
  }
};

const handleShowDetail = async (student, mission) => {
  selectedStudent.value = student;
  showDetailModal.value = true;

  try {
    const requestData = {
      uid: mission.uid,
      subject: mission.subject,
      id: student.id,
    };

    const detailResponse = await getStudentMissionDetail(requestData);
    const result = detailResponse.data.data;

    if (result.status === false) {
      console.warn('미션 상세 데이터를 가져오는데 실패했습니다.');
      return;
    }

    detailMission.value = result;
  } catch (error) {
    console.error('미션 상세 정보 조회 실패:', error);
  }
};

const handleCloseDetail = () => {
  showDetailModal.value = false;
  detailMission.value = null;
};

const handleFilterChange = (type) => {
  if (type === 'all') {
    if (tempFilter.all) {
      tempFilter.todo = true;
      tempFilter.progress = true;
      tempFilter.done = true;
      tempFilter.undone = true;
    } else {
      tempFilter.todo = false;
      tempFilter.progress = false;
      tempFilter.done = false;
      tempFilter.undone = false;
    }
  } else {
    tempFilter.all = false;
    if (tempFilter.todo && tempFilter.progress && tempFilter.done && tempFilter.undone) {
      tempFilter.all = true;
    }
  }
};

const applyFilter = () => {
  Object.assign(filter, tempFilter);
};

onMounted(fetchStudentMissions);

watch(
  () => props.stuInfo,
  (newVal) => {
    if (newVal?.id) fetchStudentMissions();
  },
  { immediate: true }
);
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

.body2-bold {
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
  background: #258bff;
  color: white;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}
td span.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
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
</style>
