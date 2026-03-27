<template>
  <div class="wrap noselect">
    <!-- <Popup v-if="showPopup" ref="popup" /> -->
    <div class="inner">
      <!-- 36레벨 커리큘럼 카드 -->
      <div class="card curriculum-card">
        <h3 class="curriculum-title">36레벨 학습 커리큘럼</h3>

        <div class="curriculum-container">
          <!-- 좌측: 계단형 타임라인 -->
          <div class="curriculum-timeline">
            <div class="timeline-container">
              <!-- 각 구간 -->
              <div
                v-for="(group, index) in levelGroups"
                :key="index"
                class="timeline-segment"
              >
                <!-- 구간 선 -->
                <div
                  class="segment-line"
                  :style="{
                    left: group.left + '%',
                    top: group.lineTop + 'px',
                    backgroundColor: group.color
                  }"
                ></div>

                <!-- CEFR 원형 배지 -->
                <div
                  class="cefr-circle"
                  :style="{
                    left: (group.left + 8.33) + '%',
                    top: group.badgeTop + 'px',
                    backgroundColor: group.color
                  }"
                >
                  <span>{{ group.cefr }}</span>
                </div>

                <!-- 레벨 텍스트 (선 아래) -->
                <div
                  class="level-info"
                  :style="{
                    left: (group.left + 8.33) + '%',
                    top: group.textTop + 'px'
                  }"
                >
                  <div class="level-range-text">{{ group.range }}</div>
                  <div class="level-name-text">{{ group.name }}</div>
                </div>

                <!-- 세로 연결선 (마지막 제외) -->
                <div
                  v-if="index < levelGroups.length - 1"
                  class="connector-line"
                  :style="{
                    left: (group.left + 16.66) + '%',
                    top: levelGroups[index + 1].lineTop + 'px',
                    height: (group.lineTop - levelGroups[index + 1].lineTop) + 'px',
                    backgroundColor: levelGroups[index + 1].color
                  }"
                ></div>

                <!-- 과목 팝업 (호버 시) -->
                <div
                  class="subject-popup"
                  :style="{
                    left: (group.left + 8.33) + '%',
                    top: group.popupTop + 'px',
                    borderTopColor: group.color
                  }"
                >
                  <div
                    v-for="(subject, idx) in group.subjects"
                    :key="idx"
                    class="popup-subject"
                  >
                    {{ subject }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 모바일 전용 심플 커리큘럼 -->
          <div class="curriculum-simple-mobile">
            <div
              v-for="(group, index) in levelGroups"
              :key="index"
              class="simple-step"
              :style="{ '--step-color': group.color }"
            >
              <!-- CEFR 원형 배지 -->
              <div class="simple-badge" :style="{ backgroundColor: group.color }">
                {{ group.cefr }}
              </div>
              <!-- 연결선 -->
              <div class="simple-line" :style="{ backgroundColor: group.color }"></div>
              <!-- 레벨 텍스트 -->
              <div class="simple-label">{{ group.range }}</div>
            </div>
          </div>

          <!-- 우측: 학생 레벨 분포 -->
          <div class="level-distribution">
            <div class="distribution-header">
              <h4 class="distribution-title">현재 반 레벨 분포</h4>
              <span class="distribution-total">총 {{ store.state.branchData[store.state.currentBranch]?.total || 0 }}명</span>
            </div>
            <div class="distribution-grid">
              <div
                v-for="(level, index) in levelGroups"
                :key="index"
                class="distribution-item"
              >
                <span class="distribution-level">{{ level.range }}</span>
                <span class="distribution-count">{{ level.studentCount }}명</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 과목 선택 섹션 -->
      <div class="card subject-selection-card">
        <div class="subject-selection-container">
          <div class="subject-left">
            <div class="subject-label">과목 선택</div>

            <div class="subject-tabs">
              <button
                v-for="subject in subjects"
                :key="subject"
                :class="['subject-tab', { active: selectedSubject === subject }]"
                @click="selectSubject(subject)"
              >
                {{ subject }}
              </button>
            </div>
          </div>

          <!-- 평균 진행률 표시 (가로형) -->
          <div class="avg-progress-bar-horizontal">
            <p class="avg-label">평균 진행률</p>
            <span class="avg-percent">{{ currentAvgProgress }}%</span>
            <div class="progress-bar-wrapper">
              <div
                class="progress-bar-fill"
                :style="{
                  width: currentAvgProgress + '%',
                  backgroundColor: getProgressColor(currentAvgProgress)
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="card" v-show="infos.length">
        <div class="flex-center-between" style="margin-bottom: 24px">
          <h4 class="headline2">
            {{ getLearningResultTitle }}
          </h4>
        </div>

        <!-- 필터 버튼 -->
        <div class="filter-container">
          <div class="filter-buttons">
            <button
              :class="['filter-btn', { active: currentFilter === 'all' }]"
              @click="setFilter('all')"
            >
              전체({{ getFilterCount('all') }})
            </button>
            <button
              :class="['filter-btn', 'filter-normal', { active: currentFilter === 'normal' }]"
              @click="setFilter('normal')"
            >
              <span class="status-dot" style="background-color: #0FD197;"></span>
              정상({{ getFilterCount('normal') }})
            </button>
            <button
              :class="['filter-btn', 'filter-warning', { active: currentFilter === 'warning' }]"
              @click="setFilter('warning')"
            >
              <span class="status-dot" style="background-color: #F78D0F;"></span>
              주의({{ getFilterCount('warning') }})
            </button>
            <button
              :class="['filter-btn', 'filter-danger', { active: currentFilter === 'danger' }]"
              @click="setFilter('danger')"
            >
              <span class="status-dot" style="background-color: #F23A3A;"></span>
              관리필요({{ getFilterCount('danger') }})
            </button>
          </div>
          <button class="btn-send-all" @click="sendAllSms">
            전체 발송
          </button>
        </div>

        <div>
          <table class="table-style">
            <thead>
              <tr>
                <th style="width: 80px">
                  <div class="flex_center">
                    <div style="vertical-align: center">
                      {{ langlist[store.state.lang]["번호"] }}
                    </div>
                    <div
                      class="updown"
                      @click="onClickSortNumber('attendanceNumber')"
                    ></div>
                  </div>
                </th>
                <th style="width: 130px">
                  <div class="flex_center">
                    <div style="vertical-align: center">
                      {{ langlist[store.state.lang]["이름"] }}
                    </div>
                    <div class="updown" @click="onClickSortString"></div>
                  </div>
                </th>
                <th style="width: 80px; text-align: center;">
                  레벨
                </th>
                <th style="width: 150px">
                  <div class="flex_center">
                    <div style="vertical-align: center">
                      {{ langlist[store.state.lang]["학습 진행률"] }}
                    </div>
                    <div
                      class="updown"
                      @click="onClickSortNumber('finishedPercent')"
                    ></div>
                  </div>
                </th>
                <th style="width: 115px">
                  <div class="flex_center">
                    <div style="vertical-align: center">
                      {{ langlist[store.state.lang]["정답률"] }}
                    </div>
                    <div
                      class="updown"
                      @click="onClickSortNumber('correctPercent')"
                    ></div>
                  </div>
                </th>
                <th style="width: 114px">
                  <div class="flex_center">
                    <div style="vertical-align: center">
                      {{ langlist[store.state.lang]["학습시간"] }}
                    </div>
                    <div
                      class="updown"
                      @click="onClickSortNumber('studyTime')"
                    ></div>
                  </div>
                </th>
                <th style="width: 100px; text-align: center;">
                  독서량
                </th>
                <th style="width: 119px">
                  {{ langlist[store.state.lang]["학습상세"] }}
                </th>
                <th style="width: 100px; text-align: center;">
                  발송
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(j, i) in filteredInfos" :key="i">
                <td>
                  {{ String(j.attendanceNumber).padStart(2, "0") || "-" }}
                </td>
                <td>{{ j.name || "-" }}</td>
                <td style="text-align: center;">
                  <div
                    class="status-level-badge"
                    :style="{
                      borderColor: getLevelColor(j.level)
                    }"
                  >
                    Lv.{{ getLevelNumber(j.level) }}
                  </div>
                </td>
                <td>
                  <div style="display:flex; align-items:center; gap:8px; width:100%;">
                    <span style="width:36px; font-size:12px; color:#292929; flex-shrink:0;">
                      {{ j.finishedPercent }}%
                    </span>
                    <div style="flex:1; height:8px; background:#f0f0f0; border-radius:4px; overflow:hidden; max-width:100px;">
                      <div
                        :style="{
                          width: j.finishedPercent + '%',
                          height: '100%',
                          borderRadius: '4px',
                          backgroundColor: getStatusColor(j.finishedPercent),
                          maxWidth: '100%'
                        }"
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="donut-wrap">
                    <div
                      class="donut-chart"
                      :style="{
                        background: `conic-gradient(
                          #3D90EF 0% ${j.correctPercent}%,
                          #f0f0f0 ${j.correctPercent}% 100%
                        )`
                      }"
                    >
                      <div class="donut-inner">
                        <span class="donut-text">{{ j.correctPercent }}%</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {{ parseInt(j.studyTime / 60) || "0"
                  }}{{ langlist[store.state.lang]["분"] }}
                </td>
                <td style="text-align: center;">
                  {{ j.readingCount || 0 }}권
                </td>
                <td>
                  <button
                    class="btn_more body2-bold"
                    @click="onClickMore(j.userId, selected)"
                  >
                    More
                  </button>
                </td>
                <td style="text-align: center; vertical-align: middle;">
                  <button
                    class="btn-send-sms"
                    :class="{ active: j.smsActive }"
                    @click="toggleSms(j)"
                  >
                    <svg width="16" height="13" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z" />
                    </svg>
                    <span>발송</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 모바일 전용 학생 목록 -->
        <div class="mobile-student-list">
          <div
            v-for="(student, i) in filteredInfos"
            :key="i"
            class="mobile-student-item"
          >
            <!-- 상단: 번호 + 이름 + 레벨 배지 + 발송 버튼 -->
            <div class="msi-top">
              <span class="msi-num">{{ String(student.attendanceNumber).padStart(2,'0') }}</span>
              <span class="msi-name">{{ student.name }}</span>
              <div
                class="msi-level"
                :style="{ borderColor: getLevelColor(student.level) }"
              >
                Lv.{{ getLevelNumber(student.level) }}
              </div>
              <button
                class="msi-send"
                :class="{ active: student.smsActive }"
                @click="toggleSms(student)"
              >
                <svg width="13" height="10" viewBox="0 0 20 16" fill="currentColor">
                  <path d="M18 0H2C0.9 0 0 0.9 0 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z"/>
                </svg>
              </button>
            </div>

            <!-- 하단: 진행률 바 + 정답률 + 학습시간 -->
            <div class="msi-bottom">
              <div class="msi-progress-wrap">
                <span class="msi-progress-num">{{ student.finishedPercent }}%</span>
                <div class="msi-progress-bar">
                  <div
                    :style="{
                      width: student.finishedPercent + '%',
                      backgroundColor: getStatusColor(student.finishedPercent)
                    }"
                  ></div>
                </div>
              </div>
              <span class="msi-stat">정답 {{ student.correctPercent }}%</span>
              <span class="msi-stat">{{ parseInt(student.studyTime/60)||student.studyTime }}분</span>
            </div>
          </div>
        </div>
      </div>

      <div v-show="!infos.length" class="card loading-skeleton"></div>
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
  <!-- <v-dialog persistent width="600" v-model="store.state.showPopup2">
    <maintenancePopup @maintenance0115close="handleClose()"></maintenancePopup>
  </v-dialog> -->
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import {
  lessonInfo,
  lessonStudentInfo,
  lessonaverageprogress,
  userInfo,
} from "../../api/api-list";
import WrapContent from "../../components/common/WrapContent.vue";
import { saveCookie, getSaveCookie, deleteCookie } from "../../store/cookie";
import { learningstatus_ko } from "../../assets/translate/ko";
import { learningstatus_vt } from "../../assets/translate/vt";
import { classEngSummary, getSSORestrict } from "../../api/api-list-2";

import { popupVoteStatus } from "../../api/api-list";
import { getLanguage } from "../../api/api-list-2";

import Popup from "../../components/learning_status/Popup.vue";
import { branchStudents, getStudentsByBranch } from "../../data/students.js";

const store = useStore();
const router = useRouter();

const units = ref([]);
const infos = ref([]);
const selected = ref(1);
const selectedUnit = ref("");
const average = ref(0);
const publisher = ref("");
const isUnitOpen = ref(false);
const UnitRef = ref(null);
const unitProgress = ref([]);
const userinfo = ref({});
const restrict = ref(0);

const langlist = ref({
  ko: learningstatus_ko,
  vt: learningstatus_vt,
});

const showPopup = ref(false);

// 필터 및 SMS 관련 상태
const currentFilter = ref('all');
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
  }[student.status] || '확인 필요';

  const levelNum = parseInt(String(student.level).match(/\d+/)?.[0] || '1');
  let levelGroup = 'Lv.1-6';
  if (levelNum <= 6) levelGroup = 'Lv.1-6';
  else if (levelNum <= 12) levelGroup = 'Lv.7-12';
  else if (levelNum <= 18) levelGroup = 'Lv.13-18';
  else if (levelNum <= 24) levelGroup = 'Lv.19-24';
  else if (levelNum <= 30) levelGroup = 'Lv.25-30';
  else levelGroup = 'Lv.31-36';

  return `안녕하세요 ${student.name} 학부모님,

알공 교습소에서 ${student.name} 학생의 이번 주 학습 현황을 안내드립니다.

📊 학습 현황
- 학습 상태: ${statusText}
- 현재 레벨: ${levelGroup}
- 학습 진행률: ${student.finishedPercent}%
- 정답률: ${student.correctPercent}%
- 학습 시간: ${Math.floor(student.studyTime / 60)}분
- 독서량: ${student.readingCount || 0}권

💬 한마디
${student.feedback || '꾸준한 학습 참여 부탁드립니다.'}

궁금하신 점은 언제든지 연락 주세요. 함께 해결해 드리겠습니다.
감사합니다. 🙏`;
};

// 과목 선택 관련 상태
const subjects = ref(['전체', 'Phonics', 'Speaking', 'Reading', 'Grammar', 'Writing']);
const selectedSubject = ref('전체');

// 과목별 평균 진행률 더미 데이터
// 과목별 평균 진행률 더미 데이터 (지점별)
const subjectAvgProgress = {
  '전체': {
    '서울 금천구 1호점': 42,
    '서울 강남구 2호점': 68,
    '서울 마포구 3호점': 31,
    '경기 수원시 5호점': 48,
    '부산 해운대구 9호점': 61
  },
  'Phonics': {
    '서울 금천구 1호점': 58,
    '서울 강남구 2호점': 78,
    '서울 마포구 3호점': 42,
    '경기 수원시 5호점': 55,
    '부산 해운대구 9호점': 71
  },
  'Speaking': {
    '서울 금천구 1호점': 45,
    '서울 강남구 2호점': 65,
    '서울 마포구 3호점': 35,
    '경기 수원시 5호점': 50,
    '부산 해운대구 9호점': 58
  },
  'Reading': {
    '서울 금천구 1호점': 51,
    '서울 강남구 2호점': 72,
    '서울 마포구 3호점': 38,
    '경기 수원시 5호점': 53,
    '부산 해운대구 9호점': 66
  },
  'Grammar': {
    '서울 금천구 1호점': 35,
    '서울 강남구 2호점': 58,
    '서울 마포구 3호점': 24,
    '경기 수원시 5호점': 39,
    '부산 해운대구 9호점': 52
  },
  'Writing': {
    '서울 금천구 1호점': 28,
    '서울 강남구 2호점': 51,
    '서울 마포구 3호점': 19,
    '경기 수원시 5호점': 33,
    '부산 해운대구 9호점': 45
  }
};

// 현재 선택된 과목 + 지점의 평균 진행률
const currentAvgProgress = computed(() => {
  const branch = store.state.currentBranch;
  const subject = selectedSubject.value || '전체';
  return subjectAvgProgress[subject]?.[branch] ?? 42;
});

// 평균 진행률 색상 (신호등)
const getProgressColor = (progress) => {
  if (progress >= 70) return '#0FD197';
  if (progress >= 40) return '#F78D0F';
  return '#F23A3A';
};

// 과목별 더미 데이터 범위
const subjectDataRanges = {
  '전체': {
    progress: { min: 40, max: 80 },
    correct: { min: 65, max: 88 },
    time: { min: 10, max: 20 }
  },
  'Phonics': {
    progress: { min: 60, max: 90 },
    correct: { min: 80, max: 95 },
    time: { min: 15, max: 25 }
  },
  'Speaking': {
    progress: { min: 40, max: 70 },
    correct: { min: 65, max: 85 },
    time: { min: 10, max: 20 }
  },
  'Reading': {
    progress: { min: 45, max: 75 },
    correct: { min: 70, max: 88 },
    time: { min: 12, max: 22 }
  },
  'Grammar': {
    progress: { min: 30, max: 65 },
    correct: { min: 55, max: 80 },
    time: { min: 8, max: 18 }
  },
  'Writing': {
    progress: { min: 25, max: 60 },
    correct: { min: 50, max: 75 },
    time: { min: 8, max: 15 }
  }
};

// 36레벨 커리큘럼 타임라인 데이터 - 지점별 학생 수 반영
const levelGroups = computed(() => {
  const branch = store.state.currentBranch;
  const branchInfo = store.state.branchData[branch];
  const levels = branchInfo.levels;

  const containerH = 240;
  const lineH = 12;
  const badgeH = 40;

  const groups = [
    { range: 'Lv.1-6',   name: 'Spark A',    cefr: 'Pre-A1', color: '#F78D0F', bottomVal: 10,  left: 0,     subjects: ['Speaking 1','Phonics 1','Reading 1'] },
    { range: 'Lv.7-12',  name: 'Spark B',    cefr: 'A1',     color: '#F5C518', bottomVal: 36,  left: 16.66, subjects: ['Speaking 2','Phonics 2','Reading 2'] },
    { range: 'Lv.13-18', name: 'Motivate A', cefr: 'A2-',    color: '#7BC67E', bottomVal: 62,  left: 33.33, subjects: ['Speaking 3','Phonics 3','Grammar 1'] },
    { range: 'Lv.19-24', name: 'Motivate B', cefr: 'A2',     color: '#3D90EF', bottomVal: 88,  left: 50,    subjects: ['Speaking 4','Reading 3','Writing 1'] },
    { range: 'Lv.25-30', name: 'Activate A', cefr: 'B1-',    color: '#5B5EA6', bottomVal: 110, left: 66.66, subjects: ['Speaking 5','Grammar 2','Writing 2'] },
    { range: 'Lv.31-36', name: 'Activate B', cefr: 'B1',     color: '#0FD197', bottomVal: 132, left: 83.33, subjects: ['Speaking 6','Grammar 3','Writing 3'] },
  ];

  return groups.map((g, i) => {
    const lineTop = containerH - g.bottomVal - lineH;
    const badgeTop = lineTop - badgeH - 8;
    const textTop = lineTop + lineH + 8;
    const popupTop = badgeTop - 95;
    return {
      ...g,
      lineTop,
      badgeTop,
      textTop,
      popupTop,
      studentCount: levels[i]
    };
  });
});

// CEFR Y축 라벨 (위에서 아래로: B2 → Pre-A1)
const cefrLabels = ['B2', 'B1', 'A2', 'A1', 'Pre-A1'];

const handleClose = async () => {
  store.state.showPopup2 = false;
};

const checkPopupStatus = async () => {
  try {
    const language = (await getLanguage()).data.data;
    if (language === 0) {
      const response = await popupVoteStatus();
      showPopup.value = !response || response.length === 0;

      if (showPopup.value === false) {
        const flag = getSaveCookie("maintenance0115");
        if (
          flag === "false" ||
          flag === "" ||
          flag === undefined ||
          flag === null
        ) {
          store.state.showPopup2 = true;
        }
      }
    }
  } catch (error) {
    console.error("투표 상태 확인 중 오류 발생:", error);
    showPopup.value = false;
  }
};

const checkMaintenancePopup = async () => {
  const flag = getSaveCookie("maintenance0115");

  if (flag === "false" || flag === "" || flag === undefined || flag === null) {
    store.state.showPopup2 = true;
  }
};

onBeforeMount(async () => {
  //await checkPopupStatus();
  //await checkMaintenancePopup();

  const res100 = await userInfo();

  userinfo.value = res100.data.data;

  const check = userinfo.value;
  if (!check) {
    deleteCookie("info");
    window.location.reload();
  }

  const { schoolCode } = userinfo.value;

  const res101 = await getSSORestrict(schoolCode);

  restrict.value = res101.data.data;

  const student = (await lessonStudentInfo(1)).data.data;

  await classEngSummary();

  const _restrict = restrict.value;
  if (!student.length && _restrict !== -1) {
    sessionStorage.setItem("sso", true);
    router.push({ path: "/setting" });
  }
});

onMounted(async () => {
  onClickOutside(UnitRef, () => {
    isUnitOpen.value = false;
  });

  const checkPublisher = (p) => {
    switch (p) {
      case "CJ":
        return "천재";
      case "DK":
        return "대교";
      case "DA":
        return "동아";
      case "YBMK":
        return "YBM(김혜리)";
      case "YBMC":
        return "YBM(최희경)";
    }
  };

  const lesson = (await lessonInfo()).data.data;

  const lessonsave = getSaveCookie(
    `lessonsave${userinfo.value.grade}${userinfo.value.classNum}${userinfo.value.id}`
  );

  if (lessonsave) {
    const num = parseInt(lessonsave);
    if (num === NaN) {
      selected.value = 1;
    } else if (num < 1 || num > lesson.length) {
      selected.value = 1;
    } else {
      selected.value = lessonsave;
    }
  }

  units.value = lesson;
  selectedUnit.value =
    String(selected.value).padStart(2, "0") +
    ".  " +
    units.value[selected.value - 1];

  // 실제 학생 데이터 로드
  loadStudents();

  const student = (await lessonStudentInfo(selected.value)).data.data;

  if (student.length) {
    const progress = (await lessonaverageprogress()).data.data;
    unitProgress.value = progress;

    publisher.value = checkPublisher(store.state.publisher);
    if (infos.value.length > 0) {
      average.value = Math.ceil(
        infos.value.reduce((acc, cur) => acc + cur.finishedPercent, 0) / infos.value.length
      );
    }
  }
});

// 학생 데이터 로드 함수
const loadStudents = () => {
  const branch = store.state.currentBranch;
  const students = getStudentsByBranch(branch);

  // 기존 컴포넌트 필드명과 맞추기
  infos.value = students.map(s => ({
    ...s,
    userId: s.id,
    missionPercent: s.finishedPercent,
    studyTime: s.studyTime * 60, // 분→초 변환
  })).sort((a, b) => a.attendanceNumber - b.attendanceNumber);
};

// 지점 변경 시 학생 목록 재로드
watch(() => store.state.currentBranch, () => {
  loadStudents();
});

const publisherText = (p) => {
  switch (p) {
    case "CJ":
      return "천재(함순애)";
    // case "DK":
    //   return "대교";
    case "DA":
      return "동아";
    case "YBMK":
      return "YBM(김혜리)";
    case "YBMC":
      return "YBM(최희경)";
    case "MN":
      return "미래엔";
    case "CJL":
      return "천재(이동환)";
    case "CJK":
      return "천재(김태은)";
    case "IC":
      return "아이스크림";
    case "VS":
      return "비상";
  }
};

const backgroundVars = (publisher, grade) => {
  const imageUrl = `https://argame3.blob.core.windows.net/textbookimage/textbook/${publisher}_${grade}.png`;

  return {
    "--bg-image": `url(${imageUrl})`,
  };
};

const backgroundVars2 = (publisher, grade) => {
  if (publisher === "SP") {
    return `https://argame3.blob.core.windows.net/textbookimage/textbook/SP.png`;
  } else {
    return `https://argame3.blob.core.windows.net/textbookimage/textbook/${publisher}_${grade}.png`;
  }
};

const onClickDropbox = () => {
  isUnitOpen.value = true;
};

const onClickUnit = async (num, title) => {
  isUnitOpen.value = false;
  selectedUnit.value = String(num).padStart(2, "0") + ".  " + title;
  selected.value = num;
  saveCookie(
    `lessonsave${userinfo.value.grade}${userinfo.value.classNum}${userinfo.value.id}`,
    num
  );

  const res = await lessonStudentInfo(num);
  const student = res.data.data;

  // SMS 상태, 독서량, 레벨 속성 추가
  const studentsWithExtras = student.map(s => ({
    ...s,
    smsActive: false,
    readingCount: 0,  // 독서량 데이터가 없으므로 0으로 설정
    level: `Lv.${Math.floor(Math.random() * 6) + 1}`  // 랜덤 레벨
  }));

  infos.value = studentsWithExtras.sort((a, b) => a.attendanceNumber - b.attendanceNumber);
};

const onClickSortNumber = (type) => {
  const sortedAscending = infos.value.every(
    (val, i, arr) => i === 0 || arr[i - 1][type] <= val[type]
  );
  infos.value.sort((a, b) =>
    sortedAscending ? b[type] - a[type] : a[type] - b[type]
  );
};

const onClickSortString = () => {
  const sortedAscending = infos.value.every(
    (val, i, arr) =>
      i === 0 || arr[i - 1]["name"].localeCompare(val["name"]) > 0
  );
  infos.value.sort((a, b) =>
    sortedAscending
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );
};

const onClickMore = (id, lesson) => {
  router.push(`/learning/${id}/0`);
};

// 상태 계산 함수
const getStudentStatus = (progress) => {
  if (progress >= 70) return 'normal';
  if (progress >= 40) return 'warning';
  return 'danger';
};

// 랜덤 레벨 생성 (더미 데이터)
const getRandomLevel = () => {
  const level = Math.floor(Math.random() * 6) + 1;
  return `Lv.${level}`;
};

const getStatusColor = (progress) => {
  const status = getStudentStatus(progress);
  switch (status) {
    case 'normal': return '#0FD197';
    case 'warning': return '#F78D0F';
    case 'danger': return '#F23A3A';
    default: return '#d0d0d0';
  }
};

// 레벨에서 숫자만 추출
const getLevelNumber = (level) => {
  if (!level) return '?';
  // "Lv.3" → "3", "3" → "3" 처리
  const match = String(level).match(/\d+/);
  return match ? match[0] : '?';
};

// 레벨별 커리큘럼 색상 (테두리용)
const getLevelColor = (level) => {
  const num = parseInt(String(level).match(/\d+/)?.[0] || '1');
  if (num <= 6)  return '#F78D0F';  // 주황
  if (num <= 12) return '#F5C518';  // 노랑
  if (num <= 18) return '#7BC67E';  // 연두
  if (num <= 24) return '#3D90EF';  // 파랑
  if (num <= 30) return '#5B5EA6';  // 남색
  return '#0FD197';                 // 초록
};

const getStatusClass = (progress) => {
  const status = getStudentStatus(progress);
  return `chart_bar-${status}`;
};

// 필터링된 학생 목록
const filteredInfos = computed(() => {
  if (currentFilter.value === 'all') {
    return infos.value;
  }
  return infos.value.filter(student => {
    const status = getStudentStatus(student.finishedPercent);
    return status === currentFilter.value;
  });
});

// 학습결과 제목 동적 생성
const getLearningResultTitle = computed(() => {
  if (selectedSubject.value && selectedSubject.value !== '') {
    return `${selectedSubject.value} ${langlist.value[store.state.lang]["학습결과"]}`;
  }
  return `${selected.value}${langlist.value[store.state.lang]["단원"]} ${langlist.value[store.state.lang]["학습결과"]}`;
});

// 필터별 학생 수 계산 (지점 데이터 기반)
const getFilterCount = (filterType) => {
  const branch = store.state.currentBranch;
  const branchInfo = store.state.branchData[branch];

  if (filterType === 'all') {
    return branchInfo.total;
  } else if (filterType === 'normal') {
    return branchInfo.normal;
  } else if (filterType === 'warning') {
    return branchInfo.warning;
  } else if (filterType === 'danger') {
    return branchInfo.danger;
  }

  // 실제 학생 데이터가 있는 경우 기존 로직 사용
  if (infos.value.length > 0) {
    return infos.value.filter(student => {
      const status = getStudentStatus(student.finishedPercent);
      return status === filterType;
    }).length;
  }

  return 0;
};

// 필터 변경
const setFilter = (filterType) => {
  currentFilter.value = filterType;
};

// SMS 관련 함수
const toggleSms = (student) => {
  if (student.smsActive) {
    student.smsActive = false;
  } else {
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

const sendAllSms = () => {
  alert('전체 학생에게 문자를 발송합니다.');
};

// 랜덤 값 생성 함수
const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 과목별 더미 데이터 생성
const generateSubjectData = (subject) => {
  const range = subjectDataRanges[subject];
  return infos.value.map(student => ({
    ...student,
    finishedPercent: getRandomInRange(range.progress.min, range.progress.max),
    correctPercent: getRandomInRange(range.correct.min, range.correct.max),
    studyTime: getRandomInRange(range.time.min, range.time.max) * 60 // 분을 초로 변환
  }));
};

// 과목 선택 함수
const selectSubject = (subject) => {
  selectedSubject.value = subject;
  // 과목별 더미 데이터로 테이블 업데이트
  infos.value = generateSubjectData(subject);
  console.log(`${subject} 과목 선택됨`);
};

// 레벨 그룹 툴팁 생성
const getSubjectTooltip = (levelRange) => {
  const [start, end] = levelRange.replace('Lv.', '').split('-').map(Number);
  return `Phonics ${start}-${end} · Speaking ${start}-${end} · Reading ${start}-${end} · Grammar ${start}-${end} · Writing ${start}-${end}`;
};
</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
  padding: 100px 0;
}
.inner {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-sizing: border-box;
}
.card {
  width: 100%;
  border-radius: 20px;
  background: #fff;
  padding: 26px 30px;
}
.flex {
  display: flex;
  gap: 40px;
}
.wrap-dropdown {
  position: relative;
  width: 550px;
  margin-top: 16px;
  z-index: 6;
  font-size: 16px;
}

.unit-dropdown {
  width: inherit;
  height: 56px;
  padding: 0 28px;
  color: var(--main-black);
  background-color: var(--main-lightblue);
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  font-size: 16px;
}

.arrow {
  position: absolute;
  width: 40px;
  height: 40px;
  right: 6px;
  transform: translate(0%, -50%);
  background-image: url("../../assets/image/Btn_Down02.png");
  background-size: 40%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  z-index: 0;
}

.wrap-units {
  position: absolute;
  width: 100%;
  height: fit-content;
  max-height: 150px;
  top: 68px;
  right: 0;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05));
  overflow-y: auto;
}

.wrap-units::-webkit-scrollbar {
  width: 8px;
}

.wrap-units::-webkit-scrollbar-thumb {
  height: 30%;
  background: #c9c9c9;
  border-radius: 10px;
}

.unit {
  height: 50px;
  box-sizing: border-box;
  padding: 11px 28px;
  cursor: pointer;
}

.unit_selected {
  box-sizing: border-box;
  height: 50px;
  padding: 10px 28px;
  background-color: var(--main-lightblue);
  color: var(--main-blue);
  cursor: pointer;
}

.unit:hover {
  background-color: #ebebeb;
}

.table-style {
  width: 100%;
  border-spacing: 0;
  border-radius: 16px;
  box-shadow: 0 0 0 1px var(--chart-blue-bg);
  overflow: hidden;
  text-align: center;
  table-layout: auto;

  thead {
    background-color: var(--main-lightblue);
  }

  th {
    position: relative;
    padding: 14px 8px;
    font-size: 14px;
    font-weight: 600;
    color: var(--main-black);
  }
  td {
    padding: 18px 8px;
    font-size: 14px;
    color: var(--main-black);
  }

  th,
  td {
    border-bottom: 1px solid var(--chart-blue-bg);
  }

  tr:last-child td {
    border-bottom: none;
  }
}

.table-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.updown {
  width: 18px;
  height: 18px;
  margin-left: 3px;
  background-image: url("../../assets/image/Btn_UpDown.png");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.btn_more {
  width: 60px;
  height: 30px;
  color: var(--main-blue);
  background-color: white;
  border-radius: 20px;
  border: 1px solid var(--main-blue);
  margin: 0 auto;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

.btn_more:hover {
  background-color: var(--main-blue);
  color: white;
  transition: 200ms ease;
}

@keyframes fadeBackground {
  from {
    background-color: rgb(220, 220, 220); /* 시작 색상 */
  }
  to {
    background-color: rgb(240, 240, 240); /* 종료 색상 */
  }
}

.long {
  width: 180px;
}

.textbook_img {
  background-image: var(--bg-image);
  background-size: 100%;
}

.blue-bg {
  width: fit-content;
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 10px 24px;
  color: var(--main-black);
  background-color: var(--main-lightblue);
  border-radius: 12px;
  font-size: 14px;
}
.loading-skeleton {
  width: 100%;
  height: 830px;
  background-color: rgb(220, 220, 220);
  animation: fadeBackground 1s infinite;
}

/* 필터 버튼 */
.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-buttons {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--main-black);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    border-color: #d0d0d0;
    background-color: #f9f9f9;
  }

  &.active {
    background-color: var(--main-lightblue);
    border-color: var(--main-blue);
    color: var(--main-blue);
  }
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.btn-send-all {
  padding: 8px 20px;
  background-color: var(--button-blue);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
}

/* 상태 인디케이터 */
/* 레벨 배지 (직사각형, 흰 배경 + 커리큘럼 색상 테두리) */
.status-level-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 3px 8px;
  border-radius: 6px;
  border: 2px solid;
  background-color: white;
  font-size: 11px;
  font-weight: 700;
  color: #292929;
  white-space: nowrap;
  letter-spacing: -0.3px;
}

/* 프로그레스 바 색상 */
.chart_bar-normal {
  background-color: #0FD197 !important;
}

.chart_bar-warning {
  background-color: #F78D0F !important;
}

.chart_bar-danger {
  background-color: #F23A3A !important;
}

/* 가로 프로그레스바 (인라인 스타일 사용으로 주석 처리)
.flex-horizon_center {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.chart_bar_wrap {
  flex: 1;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  min-width: 0;
  max-width: 120px;
}

.chart_bar {
  height: 100%;
  border-radius: 4px;
  max-width: 100%;
  transition: width 0.3s ease;
}
*/

/* 정답률 도넛 차트 */
.donut-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.donut-chart {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.donut-inner {
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
}

.donut-text {
  font-size: 9px;
  font-weight: 700;
  color: #292929;
  line-height: 1;
}

/* 발송 버튼 */
.btn-send-sms {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: transparent;
  border: 1.5px solid #d0d0d0;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    fill: #d0d0d0;
    transition: fill 0.2s ease;
  }

  &:hover {
    border-color: #b0b0b0;
    color: #444;

    svg {
      fill: #b0b0b0;
    }
  }

  &.active {
    background-color: #258AFF;
    border-color: #258AFF;
    color: white;

    svg {
      fill: white;
    }

    &:hover {
      background-color: #1a73e8;
      border-color: #1a73e8;
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

/* 36레벨 커리큘럼 카드 */
.curriculum-card {
  padding: 26px 30px;
  min-height: 320px;
  overflow: visible;
}

.curriculum-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--main-black);
  margin-bottom: 20px;
}

.curriculum-container {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

/* 계단형 타임라인 */
.curriculum-timeline {
  flex: 1;
}

.timeline-container {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: visible;
}

.timeline-segment {
  position: relative;
}

/* 구간 선 */
.segment-line {
  position: absolute;
  width: 16.66%;
  height: 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    height: 18px;
    filter: brightness(1.1);

    ~ .cefr-circle {
      transform: translateY(-6px);
    }

    ~ .subject-popup {
      opacity: 1;
      visibility: visible;
    }
  }
}

/* CEFR 원형 배지 */
.cefr-circle {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transform: translateX(-50%);
  transition: transform 0.2s ease;
  cursor: pointer;

  span {
    font-size: 9px;
    font-weight: 700;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  }
}

/* 레벨 텍스트 (선 아래) */
.level-info {
  position: absolute;
  transform: translateX(-50%);
  text-align: center;
  cursor: pointer;
}

.level-range-text {
  font-size: 13px;
  font-weight: 700;
  color: #292929;
  margin-bottom: 2px;
}

.level-name-text {
  font-size: 11px;
  font-weight: 500;
  color: #9A9A9A;
}

/* 세로 연결선 */
.connector-line {
  position: absolute;
  width: 2px;
  transform: translateX(-50%);
}

/* 과목 팝업 */
.subject-popup {
  position: absolute;
  transform: translateX(-50%);
  background: white;
  border-radius: 10px;
  padding: 12px 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-top: 3px solid;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 100;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid white;
  }
}

.popup-subject {
  font-size: 12px;
  color: #292929;
  padding: 4px 0;
  font-weight: 500;

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
}

/* 호버 시 팝업 표시 */
.segment-line:hover ~ .subject-popup {
  opacity: 1;
  visibility: visible;
}

.cefr-circle:hover ~ .subject-popup {
  opacity: 1;
  visibility: visible;
}


/* 과목 선택 섹션 */
.subject-selection-card {
  padding: 20px 30px;
}

.subject-selection-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.subject-left {
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
}

.subject-label {
  font-size: 16px;
  font-weight: 600;
  color: var(--main-black);
  min-width: 80px;
}

.subject-tabs {
  display: flex;
  gap: 8px;
  flex: 1;
}

.subject-tab {
  padding: 10px 20px;
  background-color: white;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--main-black2);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #d0d0d0;
    background-color: #f9f9f9;
  }

  &.active {
    background-color: #258AFF;
    border-color: #258AFF;
    color: white;
  }
}

/* 평균 진행률 가로형 바 */
.avg-progress-bar-horizontal {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 24px;
  background-color: #F1F8FF;
  border-radius: 12px;
  min-width: fit-content;
}

.avg-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--main-blue);
  margin: 0;
}

.avg-percent {
  font-size: 18px;
  font-weight: 700;
  color: var(--main-black);
  font-family: notosans;
}

.progress-bar-wrapper {
  width: 120px;
  height: 6px;
  background-color: var(--chart-blue-bg);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: all 0.3s ease;
}

/* 학생 레벨 분포 */
.level-distribution {
  width: 280px;
  flex-shrink: 0;
  background-color: var(--main-lightblue);
  border-radius: 12px;
  padding: 20px;
}

.distribution-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.distribution-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--main-black);
  margin: 0;
}

.distribution-total {
  font-size: 14px;
  font-weight: 700;
  color: var(--main-blue);
}

.distribution-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.distribution-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px;
  background-color: white;
  border-radius: 8px;
}

.distribution-level {
  font-size: 12px;
  font-weight: 600;
  color: var(--main-black2);
}

.distribution-count {
  font-size: 16px;
  font-weight: 700;
  color: var(--main-blue);
}

/* 모바일 전용 심플 커리큘럼 */
.curriculum-simple-mobile {
  display: flex;
  align-items: flex-end;
  width: 100%;
  padding: 40px 0 0 0;
  height: 160px;
  position: relative;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .curriculum-simple-mobile {
    display: none;
  }
}

/* 모바일 학생 목록 */
.mobile-student-list {
  display: none;
}

/* 모바일 반응형 */
@media (max-width: 767px) {
  .inner {
    padding: 16px;
    padding-bottom: 80px;
  }

  /* 커리큘럼 카드 */
  .curriculum-container {
    flex-direction: column;
    gap: 0;
  }

  .curriculum-card {
    overflow: visible !important;
  }

  /* 타임라인 차트 숨기기 */
  .curriculum-timeline {
    display: none !important;
  }

  .timeline-container {
    display: none;
  }

  /* 모바일 심플 커리큘럼 표시 */
  .curriculum-simple-mobile {
    display: flex;
  }

  .simple-step {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    height: 100%;
  }

  /* 핵심: 선처럼 보이게 - 두께 얇게, 너비 100% */
  .simple-step:nth-child(1) .simple-line {
    height: 18px;
  }
  .simple-step:nth-child(2) .simple-line {
    height: 36px;
  }
  .simple-step:nth-child(3) .simple-line {
    height: 54px;
  }
  .simple-step:nth-child(4) .simple-line {
    height: 72px;
  }
  .simple-step:nth-child(5) .simple-line {
    height: 90px;
  }
  .simple-step:nth-child(6) .simple-line {
    height: 108px;
  }

  .simple-line {
    width: 100%;
    border-radius: 3px 3px 0 0;
    box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.4),
                inset 1px 0 0 rgba(255, 255, 255, 0.4);
  }

  /* CEFR 원 - 선 바로 위에 위치 */
  .simple-badge {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    font-weight: 700;
    color: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    z-index: 2;
  }

  .simple-step:nth-child(1) .simple-badge {
    bottom: 18px;
  }
  .simple-step:nth-child(2) .simple-badge {
    bottom: 36px;
  }
  .simple-step:nth-child(3) .simple-badge {
    bottom: 54px;
  }
  .simple-step:nth-child(4) .simple-badge {
    bottom: 72px;
  }
  .simple-step:nth-child(5) .simple-badge {
    bottom: 90px;
  }
  .simple-step:nth-child(6) .simple-badge {
    bottom: 108px;
  }

  /* 레벨 텍스트 - 선 아래 */
  .simple-label {
    font-size: 9px;
    font-weight: 700;
    color: #525252;
    margin-top: 4px;
    text-align: center;
    white-space: nowrap;
    letter-spacing: -0.3px;
  }

  /* 레벨 분포만 표시, 전체 너비로 확장 */
  .level-distribution {
    width: 100%;
    margin-top: 12px;
  }

  .distribution-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .distribution-item {
    padding: 10px 8px;
    text-align: center;
  }

  .distribution-level {
    font-size: 11px;
  }

  .distribution-count {
    font-size: 16px;
  }

  /* 커리큘럼 타이틀 안내 문구 제거 */
  .distribution-title::after {
    display: none;
  }

  /* 과목 선택 바 */
  .subject-selection-container {
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }

  .subject-label {
    font-size: 14px;
    font-weight: 600;
  }

  .subject-tabs {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    overflow-x: visible;
    flex-wrap: unset;
  }

  .subject-tab {
    flex-shrink: unset;
    white-space: nowrap;
    padding: 8px 4px;
    font-size: 12px;
    text-align: center;
    justify-content: center;
    width: 100%;
  }

  .avg-progress-bar-horizontal {
    width: 100%;
    justify-content: space-between;
    padding: 12px 16px;
  }

  .avg-label {
    font-size: 13px;
  }

  .avg-percent {
    font-size: 16px;
  }

  .progress-bar-wrapper {
    width: 100px;
  }

  /* 필터 컨테이너 */
  .filter-container {
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
  }

  .filter-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }

  .filter-group {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 6px;
    padding-bottom: 4px;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .filter-btn {
    white-space: nowrap;
    padding: 8px 6px;
    font-size: 12px;
    text-align: center;
    justify-content: center;
  }

  .btn-send-all {
    width: 100%;
    padding: 10px;
    font-size: 13px;
  }

  .search-box {
    width: 100%;
    max-width: 100%;

    input {
      font-size: 13px;
    }
  }

  /* 뷰 토글 버튼 숨기기 */
  .view-toggle {
    display: none !important;
  }

  /* 테이블 및 카드 그리드 숨기기 */
  table.table-style,
  .table-container,
  .table-body-scroll,
  .card-grid {
    display: none !important;
  }

  /* 모바일 학생 목록 */
  .mobile-student-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }

  .mobile-student-item {
    background: white;
    border-radius: 12px;
    padding: 12px 14px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .msi-top {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .msi-num {
    font-size: 12px;
    color: #9a9a9a;
    min-width: 20px;
  }

  .msi-name {
    font-size: 15px;
    font-weight: 600;
    color: #292929;
    flex: 1;
  }

  .msi-level {
    font-size: 11px;
    font-weight: 700;
    color: #292929;
    padding: 2px 8px;
    border-radius: 6px;
    border: 2px solid;
    background: white;
  }

  .msi-send {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1.5px solid #e0e0e0;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #9a9a9a;
    flex-shrink: 0;

    &.active {
      background: #258aff;
      border-color: #258aff;
      color: white;
    }
  }

  .msi-bottom {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .msi-progress-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .msi-progress-num {
    font-size: 12px;
    font-weight: 600;
    color: #292929;
    min-width: 32px;
  }

  .msi-progress-bar {
    flex: 1;
    height: 6px;
    background: #f0f0f0;
    border-radius: 3px;
    overflow: hidden;

    div {
      height: 100%;
      border-radius: 3px;
      transition: width 0.3s;
    }
  }

  .msi-stat {
    font-size: 11px;
    color: #525252;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* SMS 모달 */
  .modal-overlay {
    padding: 16px;
  }

  .sms-modal {
    max-width: 95%;
    max-height: 90vh;
  }

  .sms-header {
    padding: 16px 20px;

    h3 {
      font-size: 16px;
    }
  }

  .sms-body {
    padding: 16px 20px;
  }

  .sms-footer {
    padding: 16px 20px;
    gap: 8px;

    button {
      padding: 8px 16px;
      font-size: 13px;
    }
  }

  /* 테이블 (모바일에서는 숨김 처리) */
  .table-header,
  .table-row {
    font-size: 11px;
    padding: 10px 6px;
  }

  .table-row {
    .student-name-cell {
      font-size: 12px;
    }
  }
}

/* 태블릿 (768px ~ 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }

  .subject-tab {
    flex: none;
    min-width: 120px;
  }
}
</style>
