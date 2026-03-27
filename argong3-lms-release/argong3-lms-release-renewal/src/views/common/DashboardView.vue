<template>
  <div class="dashboard-wrap">
    <div class="dashboard-container">
      <div class="header-row">
        <h2 class="headline">대시보드</h2>
        <div class="total-students">전체 학생수 {{ dummyData?.totalStudents || 0 }}명</div>
      </div>

      <!-- 신호등 요약 카드 (통합) -->
      <div v-if="dummyData" class="status-cards">
        <div
          class="status-card status-normal"
          :class="{ active: selectedStatus === 'normal' }"
          @click="selectStatusCard('normal')"
        >
          <div class="card-upper">
            <div class="status-icon">🟢</div>
            <h3 class="card-title">정상</h3>
            <p class="card-desc">학습진행률 70% 이상</p>
            <div class="card-count">{{ dummyData.normal }}명</div>
          </div>

          <div class="card-gauge-section">
            <p class="gauge-label">평균 학습진행률</p>
            <div class="progress-gauge">
              <div
                class="gauge-circle"
                :style="{
                  background:
                    'conic-gradient(#3D90EF 0% ' +
                    dummyData.avgProgress +
                    '%, var(--chart-blue-bg) ' +
                    dummyData.avgProgress +
                    '% 100%)',
                }"
              >
                <span class="gauge-center">{{ dummyData.avgProgress }}%</span>
              </div>
            </div>
          </div>

          <!-- 추세 섹션 -->
          <div v-if="trendBars && trendBars.normal" class="card-trend-section">
            <p class="trend-label">최근 7일 추세</p>
            <div class="trend-bars">
              <div
                v-for="(value, index) in trendBars.normal"
                :key="index"
                class="trend-bar"
              >
                <div
                  class="trend-bar-fill"
                  :style="{ height: value + '%', backgroundColor: '#3D90EF' }"
                ></div>
              </div>
            </div>
            <div class="trend">
              <span :class="trendData.normal > 0 ? 'trend-up' : 'trend-down'">
                {{ trendData.normal > 0 ? '↑' : '↓' }} {{ Math.abs(trendData.normal) }}%
              </span>
              <span class="trend-label">지난주 대비</span>
            </div>
          </div>
        </div>

        <div
          class="status-card status-warning"
          :class="{ active: selectedStatus === 'warning' }"
          @click="selectStatusCard('warning')"
        >
          <div class="card-upper">
            <div class="status-icon">🟡</div>
            <h3 class="card-title">주의</h3>
            <p class="card-desc">학습진행률 40~69%</p>
            <div class="card-count">{{ dummyData.warning }}명</div>
          </div>

          <div class="card-gauge-section">
            <p class="gauge-label">이번 주 학습 참여율</p>
            <div class="progress-gauge">
              <div
                class="gauge-circle"
                :style="{
                  background:
                    'conic-gradient(#3D90EF 0% ' +
                    dummyData.weeklyParticipation +
                    '%, var(--chart-blue-bg) ' +
                    dummyData.weeklyParticipation +
                    '% 100%)',
                }"
              >
                <span class="gauge-center">{{ dummyData.weeklyParticipation }}%</span>
              </div>
            </div>
          </div>

          <!-- 추세 섹션 -->
          <div v-if="trendBars && trendBars.warning" class="card-trend-section">
            <p class="trend-label">최근 7일 추세</p>
            <div class="trend-bars">
              <div
                v-for="(value, index) in trendBars.warning"
                :key="index"
                class="trend-bar"
              >
                <div
                  class="trend-bar-fill"
                  :style="{ height: value + '%', backgroundColor: '#3D90EF' }"
                ></div>
              </div>
            </div>
            <div class="trend">
              <span :class="trendData.warning > 0 ? 'trend-up' : 'trend-down'">
                {{ trendData.warning > 0 ? '↑' : '↓' }} {{ Math.abs(trendData.warning) }}%
              </span>
              <span class="trend-label">지난주 대비</span>
            </div>
          </div>
        </div>

        <div
          class="status-card status-danger"
          :class="{ active: selectedStatus === 'danger' }"
          @click="selectStatusCard('danger')"
        >
          <div class="card-upper">
            <div class="status-icon">🔴</div>
            <h3 class="card-title">관리필요</h3>
            <p class="card-desc">학습진행률 40% 미만</p>
            <div class="card-count">{{ dummyData.danger }}명</div>
          </div>

          <div class="card-gauge-section">
            <p class="gauge-label">평균 정답률</p>
            <div class="progress-gauge">
              <div
                class="gauge-circle"
                :style="{
                  background:
                    'conic-gradient(#3D90EF 0% ' +
                    dummyData.avgCorrectRate +
                    '%, var(--chart-blue-bg) ' +
                    dummyData.avgCorrectRate +
                    '% 100%)',
                }"
              >
                <span class="gauge-center">{{ dummyData.avgCorrectRate }}%</span>
              </div>
            </div>
          </div>

          <!-- 추세 섹션 -->
          <div v-if="trendBars && trendBars.danger" class="card-trend-section">
            <p class="trend-label">최근 7일 추세</p>
            <div class="trend-bars">
              <div
                v-for="(value, index) in trendBars.danger"
                :key="index"
                class="trend-bar"
              >
                <div
                  class="trend-bar-fill"
                  :style="{ height: value + '%', backgroundColor: '#3D90EF' }"
                ></div>
              </div>
            </div>
            <div class="trend">
              <span :class="trendData.danger > 0 ? 'trend-up' : 'trend-down'">
                {{ trendData.danger > 0 ? '↑' : '↓' }} {{ Math.abs(trendData.danger) }}%
              </span>
              <span class="trend-label">지난주 대비</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 관리필요 학생 빠른 목록 -->
      <WrapContent v-if="dummyData" class="students-list">
        <div class="list-header">
          <h4>{{ currentTitle }}</h4>
          <span class="list-count">{{ currentCount }}명</span>
        </div>

        <div class="students-table-wrapper">
          <table class="students-table table-head-fixed">
            <thead>
              <tr>
                <th>이름</th>
                <th>학습진행률</th>
                <th>최근 학습일</th>
                <th>문자발송</th>
              </tr>
            </thead>
          </table>
          <div class="table-body-scroll">
            <table class="students-table">
              <tbody>
                <tr v-for="student in currentStudents" :key="student.id">
                  <td>{{ student.name }}</td>
                  <td>
                    <div class="progress-mini">
                      <span class="progress-text">{{ student.progress }}%</span>
                      <div class="progress-bar-mini">
                        <div
                          class="progress-fill-mini"
                          :style="{ width: student.progress + '%', backgroundColor: student.color }"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>{{ student.lastStudyDate }}</td>
                  <td>
                    <button
                      class="btn-send-icon"
                      :class="{ active: student.smsActive }"
                      @click="toggleSms(student)"
                    >
                      <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </WrapContent>
    </div>

    <!-- 문자발송 확인 모달 -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3>문자 발송</h3>
          <button class="modal-close" @click="closeModal">&times;</button>
        </div>

        <div class="modal-body">
          <div class="recipient-info">
            <span class="recipient-label">받는 사람</span>
            <span class="recipient-name">{{ selectedStudent?.name }} 학부모님</span>
          </div>

          <!-- 읽기 모드 -->
          <div v-if="!isEditingMessage" class="message-preview">
            <div class="kakao-bubble">
              <pre class="message-text">{{ editableMessage }}</pre>
            </div>
          </div>

          <!-- 편집 모드 -->
          <div v-else class="message-edit">
            <textarea
              v-model="editableMessage"
              class="message-textarea"
              rows="12"
            ></textarea>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="closeModal">취소</button>
          <button
            class="btn-edit"
            @click="isEditingMessage = !isEditingMessage"
          >
            {{ isEditingMessage ? '미리보기' : '✏️ 수정' }}
          </button>
          <button class="btn-send" @click="confirmSend">발송하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import WrapContent from '../../components/common/WrapContent.vue';
import { branchStudents } from '../../data/students.js';

const router = useRouter();
const store = useStore();

// 모달 상태
const isModalOpen = ref(false);
const selectedStudent = ref(null);
const isEditingMessage = ref(false);
const editableMessage = ref('');

// 문자 메시지 생성 함수
const generateSmsMessage = (student) => {
  const statusText = {
    normal: '정상',
    warning: '주의',
    danger: '관리 필요'
  }[getStudentStatus(student.progress)] || '확인 필요';

  return `안녕하세요 ${student.name} 학부모님,

알공 교습소에서 ${student.name} 학생의 이번 주 학습 현황을 안내드립니다.

📊 학습 현황
- 학습 상태: ${statusText}
- 학습 진행률: ${student.progress}%
- 최근 학습일: ${student.lastStudyDate || '정보 없음'}

💬 한마디
꾸준한 학습 참여 부탁드립니다.

궁금하신 점은 언제든지 연락 주세요. 함께 해결해 드리겠습니다.
감사합니다. 🙏`;
};

// 선택된 상태 (정상/주의/관리필요)
const selectedStatus = ref('danger'); // 기본값: 관리필요

// 각 상태별 학생 데이터 (ref로 관리)
const normalStudents = ref([]);
const warningStudents = ref([]);
const dangerStudents = ref([]);

// 바 차트 추세 데이터 (7일)
const trendBars = ref({
  normal: [65, 70, 68, 75, 78, 80, 82],
  warning: [45, 50, 48, 52, 55, 58, 60],
  danger: [35, 40, 38, 42, 45, 43, 48]
});

// 지난주 대비 퍼센트 추세 데이터
const trendData = ref({
  normal: 0,
  warning: 0,
  danger: 0
});

// 추세 데이터 생성 함수
const generateTrends = (branch) => {
  const branchInfo = store.state.branchData[branch];

  // 바 차트: 정상 학생 추세 (평균 학습진행률 기준)
  const normalBase = branchInfo.avgProgress || 75;
  trendBars.value.normal = Array.from({ length: 7 }, (_, i) => {
    const variation = Math.random() * 10 - 5; // -5 ~ +5 변동
    return Math.min(100, Math.max(40, Math.round(normalBase + variation + i * 2)));
  });

  // 바 차트: 주의 학생 추세 (참여율 기준)
  const warningBase = branchInfo.participation || 60;
  trendBars.value.warning = Array.from({ length: 7 }, (_, i) => {
    const variation = Math.random() * 10 - 5; // -5 ~ +5 변동
    return Math.min(100, Math.max(30, Math.round(warningBase + variation + i * 1.5)));
  });

  // 바 차트: 관리필요 학생 추세 (정답률 기준)
  const dangerBase = branchInfo.correctRate || 50;
  trendBars.value.danger = Array.from({ length: 7 }, (_, i) => {
    const variation = Math.random() * 10 - 5; // -5 ~ +5 변동
    return Math.min(100, Math.max(20, Math.round(dangerBase + variation + i * 1)));
  });

  // 퍼센트 추세: 정상 - 주로 상승 (+1.0 ~ +6.0)
  trendData.value.normal = +(Math.random() * 5 + 1).toFixed(1);

  // 퍼센트 추세: 주의 - 상승/하락 혼재 (-3.0 ~ +3.0)
  trendData.value.warning = +((Math.random() * 6 - 3)).toFixed(1);

  // 퍼센트 추세: 관리필요 - 주로 하락 (-4.0 ~ +2.0)
  trendData.value.danger = +((Math.random() * 6 - 4)).toFixed(1);
};

// 지점별 학생 목록 업데이트 함수
const updateDashboardData = (branch) => {
  const students = branchStudents[branch] || [];

  // 상태별 학생 목록 업데이트
  normalStudents.value = students
    .filter(s => s.status === 'normal')
    .map(s => ({
      id: s.id,
      name: s.name,
      progress: s.finishedPercent,
      lastStudyDate: s.lastStudyDate,
      smsActive: s.smsActive,
      color: '#0FD197'
    }));

  warningStudents.value = students
    .filter(s => s.status === 'warning')
    .map(s => ({
      id: s.id,
      name: s.name,
      progress: s.finishedPercent,
      lastStudyDate: s.lastStudyDate,
      smsActive: s.smsActive,
      color: '#F78D0F'
    }));

  dangerStudents.value = students
    .filter(s => s.status === 'danger')
    .map(s => ({
      id: s.id,
      name: s.name,
      progress: s.finishedPercent,
      lastStudyDate: s.lastStudyDate,
      smsActive: s.smsActive,
      color: '#F23A3A'
    }));
};

// onMounted에서도 호출
onMounted(() => {
  const currentBranch = store.state.currentBranch;
  updateDashboardData(currentBranch);
  generateTrends(currentBranch);
});

// currentBranch 변경 시 학생 목록 업데이트
watch(() => store.state.currentBranch, (newBranch) => {
  updateDashboardData(newBranch);
  generateTrends(newBranch);
});

// 현재 지점의 데이터를 computed로 가져오기
const dummyData = computed(() => {
  const branch = store.state.currentBranch;
  const branchInfo = store.state.branchData[branch];

  return {
    normal: branchInfo.normal,
    warning: branchInfo.warning,
    danger: branchInfo.danger,
    avgProgress: branchInfo.avgProgress,
    weeklyParticipation: branchInfo.participation,
    participatingStudents: branchInfo.participatingStudents,
    totalStudents: branchInfo.totalStudents,
    avgCorrectRate: branchInfo.correctRate,
    trend: branchInfo.trend,
  };
});

// 현재 선택된 상태의 학생 목록
const currentStudents = computed(() => {
  if (selectedStatus.value === 'normal') return normalStudents.value;
  if (selectedStatus.value === 'warning') return warningStudents.value;
  return dangerStudents.value;
});

// 현재 선택된 상태의 제목
const currentTitle = computed(() => {
  if (selectedStatus.value === 'normal') return '정상 학생';
  if (selectedStatus.value === 'warning') return '주의 학생';
  return '관리필요 학생';
});

// 현재 선택된 상태의 학생 수
const currentCount = computed(() => {
  if (selectedStatus.value === 'normal') return dummyData.value.normal;
  if (selectedStatus.value === 'warning') return dummyData.value.warning;
  return dummyData.value.danger;
});

const selectStatusCard = (status) => {
  selectedStatus.value = status;
};

const goToLearningStatus = (status) => {
  // 필터 정보를 쿼리 파라미터로 전달
  router.push({
    path: '/learning/status',
    query: { filter: status }
  });
};

const toggleSms = (student) => {
  // 이미 활성화된 경우 비활성화
  if (student.smsActive) {
    student.smsActive = false;
  } else {
    // 비활성화된 경우 모달 표시
    selectedStudent.value = student;
    editableMessage.value = generateSmsMessage(student);
    isEditingMessage.value = false;
    isModalOpen.value = true;
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedStudent.value = null;
  isEditingMessage.value = false;
  editableMessage.value = '';
};

const confirmSend = () => {
  if (selectedStudent.value) {
    selectedStudent.value.smsActive = true;
    selectedStudent.value.lastMessage = editableMessage.value;
  }
  closeModal();
};
</script>

<style scoped lang="scss">
.dashboard-wrap {
  width: 100%;
  padding: 100px 0 50px;
  background-color: var(--bg-gray);
  min-height: 100vh;
}

.dashboard-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-sizing: border-box;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.headline {
  font-size: 28px;
  font-weight: 600;
  color: var(--main-black);
  margin: 0;
}

.total-students {
  font-size: 16px;
  font-weight: 700;
  color: var(--main-black);
}

/* 신호등 요약 카드 */
.status-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.status-card {
  background: white;
  border-radius: 16px;
  padding: 24px 28px 28px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 460px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.08);
  }

  &.active {
    transform: scale(1.02);
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
  }
}

.status-normal {
  border: 2px solid var(--status-green);
}

.status-warning {
  border: 2px solid var(--status-yellow);
}

.status-danger {
  border: 2px solid var(--status-red);
}

.status-icon {
  font-size: 44px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--main-black);
  margin-bottom: 6px;
}

.card-desc {
  font-size: 13px;
  color: var(--main-black2);
  margin-bottom: 16px;
}

.card-count {
  font-size: 32px;
  font-weight: 700;
  color: var(--main-black);
  font-family: notosans;
}

/* 카드 상단 영역 */
.card-upper {
  display: flex;
  flex-direction: column;
}

/* 카드 하단 게이지 영역 */
.card-gauge-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-top: 20px;
  margin-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  flex: 1;
  justify-content: center;
}

.gauge-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--main-black2);
  margin: 0;
}

/* 원형 게이지 */
.progress-gauge {
  display: flex;
  justify-content: center;
  align-items: center;
}

.gauge-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.gauge-center {
  position: absolute;
  width: 75px;
  height: 75px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: var(--main-black);
  font-family: notosans;
}

/* 추세 섹션 */
.card-trend-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;

  .trend-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--main-black2);
    margin: 0;
  }
}

.trend-bars {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 8px;
  height: 60px;
  width: 100%;
  padding: 0 20px;
}

.trend-bar {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
  background: #f5f5f5;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
}

.trend-bar-fill {
  width: 100%;
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
  min-height: 5%;
}

.trend {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
}

.trend-up {
  color: rgb(0, 160, 80);
  font-size: 14px;
  font-weight: 600;
}

.trend-down {
  color: var(--status-red);
  font-size: 14px;
  font-weight: 600;
}

.trend-label {
  font-size: 12px;
  color: var(--main-black3);
}

/* 관리필요 학생 목록 */
.students-list {
  width: 100%;

  :deep(.white-wrap) {
    width: 100%;
  }
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h4 {
    font-size: 18px;
    font-weight: 600;
    color: var(--main-black);
  }

  .list-count {
    font-size: 14px;
    color: var(--main-black2);
    background: var(--main-lightblue);
    padding: 4px 12px;
    border-radius: 12px;
  }
}

.students-table-wrapper {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
}

.students-table {
  width: 100%;
  border-spacing: 0;

  thead {
    background-color: var(--main-lightblue);
  }

  th {
    padding: 14px 16px;
    font-size: 14px;
    font-weight: 600;
    color: var(--main-black);
    text-align: left;

    &:first-child {
      width: 20%;
    }

    &:nth-child(2) {
      width: 35%;
    }

    &:nth-child(3) {
      width: 25%;
    }

    &:nth-child(4) {
      width: 20%;
      text-align: center;
    }
  }

  td {
    padding: 16px;
    font-size: 14px;
    color: var(--main-black);
    border-bottom: 1px solid #f0f0f0;

    &:first-child {
      width: 20%;
    }

    &:nth-child(2) {
      width: 35%;
    }

    &:nth-child(3) {
      width: 25%;
    }

    &:nth-child(4) {
      width: 20%;
      text-align: center;
      vertical-align: middle;
    }
  }

  tr:last-child td {
    border-bottom: none;
  }
}

.table-head-fixed {
  display: table;
  width: 100%;
  table-layout: fixed;
}

.table-body-scroll {
  max-height: 280px;
  overflow-y: auto;
  display: block;
  background: white;

  table {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d0d0d0;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #b0b0b0;
  }
}

.progress-mini {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-text {
  min-width: 45px;
  font-weight: 500;
}

.progress-bar-mini {
  flex: 1;
  max-width: 100px;
  height: 6px;
  background-color: var(--chart-blue-bg);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill-mini {
  height: 100%;
  background-color: var(--status-red);
  transition: width 0.3s ease;
}

.btn-send-icon {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 2px solid #d0d0d0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0 auto;

  svg {
    fill: #d0d0d0;
    transition: fill 0.2s ease;
  }

  &:hover {
    border-color: #b0b0b0;

    svg {
      fill: #b0b0b0;
    }
  }

  &.active {
    background-color: #258AFF;
    border-color: #258AFF;

    svg {
      fill: white;
    }

    &:hover {
      background-color: #1a73e8;
      border-color: #1a73e8;

      svg {
        fill: white;
      }
    }
  }
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 480px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.modal-header {
  padding: 24px 28px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--main-black);
    margin: 0;
  }
}

.modal-close {
  background: none;
  border: none;
  font-size: 28px;
  color: var(--main-black3);
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  &:hover {
    color: var(--main-black);
  }
}

.modal-body {
  padding: 28px;
}

.recipient-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;

  .recipient-label {
    font-size: 14px;
    color: var(--main-black2);
    font-weight: 500;
  }

  .recipient-name {
    font-size: 15px;
    color: var(--main-black);
    font-weight: 600;
  }
}

.message-preview {
  display: flex;
  justify-content: flex-start;
}

.kakao-bubble {
  background-color: #fee500;
  border-radius: 12px;
  padding: 16px 18px;
  max-width: 85%;
  position: relative;

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: #1a1a1a;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 12px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 8px 8px 0;
    border-color: transparent #fee500 transparent transparent;
  }
}

.message-text {
  white-space: pre-wrap;
  font-size: 13px;
  line-height: 1.7;
  color: #1a1a1a;
  font-family: inherit;
  margin: 0;
}

.message-edit {
  width: 100%;
}

.message-textarea {
  width: 100%;
  padding: 14px;
  border: 1.5px solid #e0e0e0;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.7;
  font-family: inherit;
  color: #292929;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #258AFF;
  }
}

.modal-footer {
  padding: 20px 28px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-cancel,
.btn-send {
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: var(--main-black);

  &:hover {
    background-color: #e8e8e8;
  }
}

.btn-edit {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: 1.5px solid #3D90EF;
  background: white;
  color: #3D90EF;
  transition: all 0.2s;

  &:hover {
    background: #f0f7ff;
  }
}

.btn-send {
  background-color: var(--button-blue);
  color: white;

  &:hover {
    opacity: 0.9;
  }
}

/* 모바일 반응형 */
@media (max-width: 767px) {
  .dashboard-container {
    padding: 16px;
    padding-bottom: 80px;
  }

  .header-row {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;

    .headline {
      font-size: 22px;
    }

    .total-students {
      font-size: 13px;
    }
  }

  /* 신호등 카드: 3열 → 1열 세로 스택 */
  .status-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  /* 각 카드 높이 축소 */
  .status-card {
    padding: 20px;
  }

  .card-title {
    font-size: 16px;
  }

  .card-desc {
    font-size: 12px;
  }

  .card-count {
    font-size: 28px;
  }

  /* 카드 내 원그래프 크기 축소 */
  .gauge-circle {
    width: 90px;
    height: 90px;
  }

  .gauge-center {
    width: 70px;
    height: 70px;
    font-size: 18px;
  }

  .gauge-label {
    font-size: 12px;
  }

  /* 추세 섹션 */
  .card-trend-section {
    .trend-label {
      font-size: 12px;
    }

    .trend-bars {
      height: 60px;
    }

    .trend {
      font-size: 12px;
    }
  }

  /* 학생 목록 섹션 */
  .students-section {
    .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;

      h3 {
        font-size: 18px;
      }
    }

    .view-toggle {
      gap: 6px;

      button {
        padding: 6px 12px;
        font-size: 12px;
      }
    }
  }

  /* 테이블 헤더 및 행 */
  .table-header,
  .table-row {
    font-size: 12px;
    padding: 12px 8px;
  }

  /* 학생 카드 모바일 */
  .student-card {
    padding: 16px;

    .student-name {
      font-size: 14px;
    }

    .student-level {
      font-size: 11px;
    }
  }

  /* SMS 모달 */
  .modal-overlay {
    padding: 16px;
  }

  .modal-container {
    max-width: 95%;
    max-height: 90vh;
  }

  .modal-header {
    padding: 16px 20px;

    h3 {
      font-size: 16px;
    }
  }

  .modal-content {
    padding: 16px 20px;
  }

  .modal-footer {
    padding: 16px 20px;
    gap: 8px;

    button {
      padding: 8px 16px;
      font-size: 13px;
    }
  }
}
</style>
