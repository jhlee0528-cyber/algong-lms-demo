<template>
  <div class="container">
    <h2 class="headline">학습 설정 > 과제 미션 관리 > 신규미션 생성</h2>
    <WrapContent>
      <div class="inner">
        <!-- 과제명 -->
        <div class="step">
          <h4>1. 과제명</h4>
          <input
            type="text"
            maxlength="16"
            placeholder="16자 이내로 과제명을 작성해주세요."
            class="border-input"
            v-model="missionName"
          />
        </div>

        <!-- 단원 -->
        <div class="step">
          <div class="section-header">
            <h4>2. 단원 선택</h4>
            <TooltipIcon
              :tooltipText="[
                `'학습 단원 설정'에서 열려 있는 단원만 선택 가능합니다.`,
              ]"
            />
          </div>
          <div class="select">
            <button class="select-wrap" @click="toggleDropdown">
              <span
                class="label"
                :style="{ color: selectedUnit ? '#292929' : '#adadad' }"
              >
                {{
                  selectedUnit
                    ? `${selectedUnit.id}단원 &lt;${selectedUnit.name}&gt;`
                    : "단원을 선택해주세요"
                }}
              </span>
              <svg
                class="arrow-icon"
                :class="{ 'is-open': isOpen }"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12.822 17.8136C12.4243 18.3876 11.5757 18.3876 11.178 17.8136L5.29315 9.31949C4.83367 8.65629 5.30833 7.75 6.11514 7.75L17.8849 7.75C18.6917 7.75 19.1663 8.65629 18.7069 9.3195L12.822 17.8136Z"
                  fill="#525252"
                />
              </svg>
            </button>
            <ul class="option" v-show="isOpen" ref="dropdownList">
              <li
                v-for="(unit, index) in units"
                :key="index"
                class="option-list"
                @click="selectUnit(unit)"
                :class="{ selected: unit === selectedUnit }"
              >
                {{ unit.id }}단원 &lt;{{ unit.name }}&gt;
              </li>
            </ul>
          </div>
        </div>

        <!-- 과제 -->
        <div class="step">
          <h4>3. 과제 선택</h4>
          <div class="border">
            <div class="flex-center-between">
              <h6>액티비티</h6>
              <TooltipIcon
                :tooltipText="[
                  `알공 내 '액티비티' 콘텐츠에서 각 단원별 주요 단어, 문장을 각 학습 영역에 집중하여 학습할 수 있습니다.`,
                ]"
                width="310px"
              />
            </div>
            <div class="checkbox-group">
              <div>
                <input
                  type="checkbox"
                  id="listening"
                  v-model="selectedActivities.listening"
                />
                <label for="listening">듣기</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="reading"
                  v-model="selectedActivities.reading"
                />
                <label for="reading">읽기</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="speaking"
                  v-model="selectedActivities.speaking"
                />
                <label for="speaking">말하기</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="writing"
                  v-model="selectedActivities.writing"
                />
                <label for="writing">쓰기</label>
              </div>
            </div>
          </div>

          <div class="border">
            <div class="flex-center-between">
              <h6>AI 대화</h6>
              <TooltipIcon
                :tooltipText="[
                  `·교과서 대화 : 교과 문장 위주의 기본 다이얼로그 말하기 학습`,
                  `·GPT 교과대화 : 교과 주제와 관련하여 GPT와 자유 대화 연습`,
                ]"
              />
            </div>
            <div class="checkbox-group">
              <div>
                <input
                  type="checkbox"
                  id="talking"
                  v-model="selectedActivities.talking"
                />
                <label for="talking">교과서 대화</label>
              </div>
              <div v-if="publisher !== 'SP'">
                <input
                  type="checkbox"
                  id="gptTalking"
                  v-model="selectedActivities.gptTalking"
                />
                <label for="gptTalking">GPT 교과대화</label>
              </div>
            </div>
          </div>

          <div class="border" v-if="premium">
            <div class="flex-center-between">
              <h6>AI 튜터</h6>
              <TooltipIcon
                :tooltipText="[
                  `기초 학습이 부족한 학생은 단원 내 단어를 위주로 AI 튜터와 복습 진행,`,
                  `단원 이해도가 높은 학생은 단원 주제와 관련 된 초등 필수 단어를 추가로 학습합니다. `,
                ]"
              />
            </div>
            <div class="checkbox-group">
              <div>
                <input
                  type="checkbox"
                  id="단어"
                  v-model="selectedActivities.tutor"
                />
                <label for="단어">단어 맞춤 학습</label>
              </div>
            </div>
          </div>
        </div>

        <!-- 과제별 횟수 -->
        <div class="step">
          <div class="section-header">
            <h4>4. 과제별 횟수 선택</h4>
            <TooltipIcon
              :tooltipText="[
                `·액티비티 : 1회당 단어와 문장 각각 4문제를 학습 (말하기는 문장만)`,
                `·AI 대화 : 1회당 1개의 다이얼로그를 연습 (GPT 대화는  3턴대화)`,
                `·AI 튜터 : 1회당 1개 ~ 5개의 단어를 학습`,
              ]"
            />
          </div>
          <div class="border">
            <div
              v-for="activity in filteredActivities"
              :key="activity.key"
              class="mission-item"
            >
              <div class="mission-info">
                <h6>{{ getActivityType(activity.key) }}</h6>
                <p>{{ getActivityName(activity.key) }}</p>
              </div>
              <div class="mission-count">
                <div class="count-input">
                  <button class="count-btn" @click="decrement(activity.key)">
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    :value="counts[activity.key]"
                    @input="updateCount(activity.key, $event.target.value)"
                    disabled
                  />
                  <button class="count-btn" @click="increment(activity.key)">
                    +
                  </button>
                </div>
                <span>예상 소요 시간 : {{ counts[activity.key] * 2 }}분</span>
              </div>
            </div>
            <p class="total-time">총 예상 소요 시간 : 약 {{ totalTime }}분</p>
          </div>
        </div>

        <!-- 전송 대상 -->
        <div class="step">
          <div class="section-header">
            <h4>5. 전송 대상 설정</h4>
            <TooltipIcon
              :tooltipText="[
                `과제를 전송할 대상을 자유롭게 설정 가능합니다.`,
                `'교사 계정'을 체크하면, 교사 알공 계정에도 동일한 미션이 부여됩니다.`,
              ]"
            />
          </div>

          <div class="border p-0">
            <div class="border-title">학생 리스트</div>
            <div class="border-content">
              <div class="student-list-header">
                <div class="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="selectAll"
                    v-model="selectAllStudents"
                    @change="toggleAllStudents"
                  />
                  <label for="selectAll">전체 선택</label>

                  <input
                    type="checkbox"
                    id="selectTeacher"
                    v-model="teacherChecked"
                    style="margin-left: 34px"
                  />
                  <label for="selectTeacher">교사 계정</label>
                </div>
                <div class="student-count">
                  {{ selectedStudents.filter(Boolean).length }}/{{
                    students.length
                  }}명 선택 됨
                </div>
              </div>

              <div class="student-grid">
                <div
                  v-for="(student, index) in students"
                  :key="student.id"
                  class="student-row"
                >
                  <input
                    type="checkbox"
                    :id="'student-' + student.id"
                    v-model="selectedStudents[index]"
                  />
                  <label :for="'student-' + student.id">{{
                    student.name
                  }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 보상 -->
        <div class="step">
          <div class="section-header">
            <h4>6. 보상 설정</h4>
            <TooltipIcon
              :tooltipText="[
                `과제 분량별 설정 가능 최대 보상수`,
                `· 0~5분 과제 : 각 스톤 1개씩 + 골드 2,000`,
                `· 6~10분 과제 : 각 스톤 2개씩 + 골드 4,000`,
                `· 11~15분 과제 : 각 스톤 3개씩 + 골드 6,000`,
                `· 16분 이상 과제 : 각 스톤 4개씩 + 골드 8,000`,
              ]"
            />
          </div>
          <v-chip color="green">
            {{ timeDescription }}
          </v-chip>
          <div class="reward-wrap">
            <div class="reward">
              <img :src="StonesIcon" alt="스톤 이미지" />
              <p>4종 스톤</p>
              <div class="count-input">
                <button
                  class="count-btn"
                  @click="decrement('stone')"
                  :disabled="counts.stone <= 0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8.71819 8.70982H12.2896C12.4791 8.70982 12.6607 8.63457 12.7947 8.50061C12.9287 8.36666 13.0039 8.18498 13.0039 7.99554C13.0039 7.8061 12.9287 7.62441 12.7947 7.49046C12.6607 7.35651 12.4791 7.28125 12.2896 7.28125H8.71819H7.28962H3.71819C3.52875 7.28125 3.34707 7.35651 3.21312 7.49046C3.07916 7.62441 3.00391 7.8061 3.00391 7.99554C3.00391 8.18498 3.07916 8.36666 3.21312 8.50061C3.34707 8.63457 3.52875 8.70982 3.71819 8.70982H7.28962H8.71819Z"
                      fill="#3480D8"
                    />
                  </svg>
                </button>
                <input
                  type="number"
                  min="1"
                  :max="maxStone"
                  :value="counts.stone"
                  @input="updateCount('stone', $event.target.value)"
                  disabled
                />
                <button
                  class="count-btn"
                  @click="increment('stone')"
                  :disabled="counts.stone >= maxStone"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M12.2896 8.70647H8.71819V12.2779C8.71819 12.4673 8.64294 12.649 8.50898 12.783C8.37503 12.9169 8.19335 12.9922 8.00391 12.9922C7.81447 12.9922 7.63278 12.9169 7.49883 12.783C7.36488 12.649 7.28962 12.4673 7.28962 12.2779V8.70647H3.71819C3.52875 8.70647 3.34707 8.63122 3.21312 8.49726C3.07916 8.36331 3.00391 8.18163 3.00391 7.99219C3.00391 7.80275 3.07916 7.62107 3.21312 7.48711C3.34707 7.35316 3.52875 7.2779 3.71819 7.2779H7.28962V3.70647C7.28962 3.51703 7.36488 3.33535 7.49883 3.2014C7.63278 3.06744 7.81447 2.99219 8.00391 2.99219C8.19335 2.99219 8.37503 3.06744 8.50898 3.2014C8.64294 3.33535 8.71819 3.51703 8.71819 3.70647V7.2779H12.2896C12.4791 7.2779 12.6607 7.35316 12.7947 7.48711C12.9287 7.62107 13.0039 7.80275 13.0039 7.99219C13.0039 8.18163 12.9287 8.36331 12.7947 8.49726C12.6607 8.63122 12.4791 8.70647 12.2896 8.70647Z"
                      fill="#3480D8"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="reward">
              <img :src="GoldIcon" alt="골드 이미지" />
              <p>골드</p>
              <div class="count-input">
                <button
                  class="count-btn"
                  @click="decrement('gold')"
                  :disabled="counts.gold <= 0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8.71819 8.70982H12.2896C12.4791 8.70982 12.6607 8.63457 12.7947 8.50061C12.9287 8.36666 13.0039 8.18498 13.0039 7.99554C13.0039 7.8061 12.9287 7.62441 12.7947 7.49046C12.6607 7.35651 12.4791 7.28125 12.2896 7.28125H8.71819H7.28962H3.71819C3.52875 7.28125 3.34707 7.35651 3.21312 7.49046C3.07916 7.62441 3.00391 7.8061 3.00391 7.99554C3.00391 8.18498 3.07916 8.36666 3.21312 8.50061C3.34707 8.63457 3.52875 8.70982 3.71819 8.70982H7.28962H8.71819Z"
                      fill="#3480D8"
                    />
                  </svg>
                </button>
                <input
                  type="number"
                  min="1000"
                  :max="maxGold"
                  :value="counts.gold"
                  @input="updateCount('gold', $event.target.value)"
                  disabled
                />
                <button
                  class="count-btn"
                  @click="increment('gold')"
                  :disabled="counts.gold >= maxGold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M12.2896 8.70647H8.71819V12.2779C8.71819 12.4673 8.64294 12.649 8.50898 12.783C8.37503 12.9169 8.19335 12.9922 8.00391 12.9922C7.81447 12.9922 7.63278 12.9169 7.49883 12.783C7.36488 12.649 7.28962 12.4673 7.28962 12.2779V8.70647H3.71819C3.52875 8.70647 3.34707 8.63122 3.21312 8.49726C3.07916 8.36331 3.00391 8.18163 3.00391 7.99219C3.00391 7.80275 3.07916 7.62107 3.21312 7.48711C3.34707 7.35316 3.52875 7.2779 3.71819 7.2779H7.28962V3.70647C7.28962 3.51703 7.36488 3.33535 7.49883 3.2014C7.63278 3.06744 7.81447 2.99219 8.00391 2.99219C8.19335 2.99219 8.37503 3.06744 8.50898 3.2014C8.64294 3.33535 8.71819 3.51703 8.71819 3.70647V7.2779H12.2896C12.4791 7.2779 12.6607 7.35316 12.7947 7.48711C12.9287 7.62107 13.0039 7.80275 13.0039 7.99219C13.0039 8.18163 12.9287 8.36331 12.7947 8.49726C12.6607 8.63122 12.4791 8.70647 12.2896 8.70647Z"
                      fill="#3480D8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 기간 -->
        <div class="step">
          <h4>7. 기간 설정</h4>
          <v-radio-group v-model="selectedDateOption">
            <v-radio
              color="#3D90EF"
              label="지금 ~ 오늘 자정까지"
              value="today"
            ></v-radio>
            <v-radio
              color="#3D90EF"
              label="시작일 ~ 종료일 설정"
              value="custom"
            ></v-radio>
          </v-radio-group>
          <div class="datepicker-wrap">
            <VueDatePicker
              v-if="selectedDateOption === 'custom'"
              locale="ko"
              v-model="dateRange"
              range
              :format="prettyDate"
              :year-range="yearRange"
              :enable-time-picker="false"
              class="custom-datepicker"
              :disabled-dates="disabledDates"
              week-start="0"
              cancel-text="취소"
              select-text="확인"
            />
          </div>
        </div>

        <!-- 수업 모드 -->
        <div class="step">
          <div class="section-header">
            <h4>8. 수업 모드 설정</h4>
            <TooltipIcon
              :tooltipText="[
                `· 수업 모드를 설정하면, 학생들이 과제를 완료 할 때까지`,
                `　학습 미션 외 다른 콘텐츠 이용이 제한 됩니다.`,
                `· 수업 모드는 설정 후, 1시간 동안 유지 되며 자동으로 해제됩니다.`,
                `· 수업 모드는 '오늘' 진행 가능한 미션만 설정할 수 있습니다.`,
              ]"
            />
          </div>
          <v-chip
            color="red"
            v-if="isClassModeDisabled"
            class="disabled-message"
          >
            수업 모드는 '오늘' 진행 가능한 미션만 설정할 수 있습니다.
          </v-chip>
          <v-radio-group
            v-model="selectedPriority"
            :disabled="isClassModeDisabled"
          >
            <v-radio color="#3D90EF" label="미설정" value="normal"></v-radio>
            <v-radio
              color="#3D90EF"
              label="수업 모드 설정"
              value="classMode"
              :disabled="isClassModeDisabled"
            ></v-radio>
          </v-radio-group>
        </div>
      </div>
    </WrapContent>

    <button class="btn blue" @click="saveMission" :disabled="isSaving">
      {{ isSaving ? "저장 중..." : "과제 저장" }}
    </button>

    <!-- 입력 확인 모달 -->
    <v-dialog v-model="showInputCheckModal" max-width="480">
      <v-card class="confirm-modal">
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
          <p class="body1">
            {{ validationErrors.join(", ") }}이(가) 입력되지 않았습니다.
          </p>
          <p class="body1">모든 항목을 입력해주세요.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn class="modal-btn ok" @click="closeModal('input')">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 시작일 확인 모달 -->
    <v-dialog v-model="showStartDateModal" max-width="480">
      <v-card class="confirm-modal">
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
          <p class="body1">과제 '시작일'전까지 '대기중 미션'으로 표시 되며,</p>
          <p class="body1">'시작일'부터 '진행중'인 미션으로 표시됩니다.</p>
          <p class="body1">이대로 저장할까요?</p>
        </v-card-text>
        <v-card-actions>
          <v-btn class="modal-btn cancel" @click="closeModal('date')"
            >취소</v-btn
          >
          <v-btn class="modal-btn ok" @click="confirmStartDate">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 설정 완료 모달 -->
    <v-dialog v-model="showCompleteModal" max-width="480">
      <v-card class="success-modal">
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
        <v-card-title class="headline">설정 완료</v-card-title>
        <v-card-text>
          <p class="body1">과제 생성을 완료했습니다.</p>
          <p class="body1">학생 화면에서도 미션 확인이 가능합니다.</p>
        </v-card-text>
        <v-card-actions>
          <!-- 메인으로 이동 -->
          <v-btn class="modal-btn ok" @click="goToList">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  computed,
  watch,
  defineEmits,
  onBeforeMount,
} from "vue";
import WrapContent from "../common/WrapContent.vue";
import TooltipIcon from "../common/TooltipIcon.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import dayjs from "dayjs";
import GoldIcon from "@/assets/image/icon_gold.png";
import StonesIcon from "@/assets/image/icon_stones.png";
import { createEnglishMission, getStudentList } from "@/api/api-list-2.js";
import { lessonInfo, userInfo, openlessoninfo } from "@/api/api-list";
import { useStore } from "vuex";

const emit = defineEmits(["back-to-list"]);

const store = useStore();
const publisher = ref("");

onBeforeMount(() => {
  publisher.value = store.state.publisher;
});

const isOpen = ref(false);
const selectedUnit = ref("");
const dropdownList = ref(null);
const selectedDateOption = ref(null);
const pendingSave = ref(false);
const counts = ref({
  listening: 1,
  reading: 1,
  writing: 1,
  speaking: 1,
  talking: 1,
  gptTalking: 1,
  tutor: 1,
  stone: 1,
  gold: 1000,
});

const totalTime = computed(() => {
  let time = 0;
  if (selectedActivities.value.listening) time += counts.value.listening * 2;
  if (selectedActivities.value.reading) time += counts.value.reading * 2;
  if (selectedActivities.value.writing) time += counts.value.writing * 2;
  if (selectedActivities.value.speaking) time += counts.value.speaking * 2;
  if (selectedActivities.value.talking) time += counts.value.talking * 2;
  if (selectedActivities.value.gptTalking) time += counts.value.gptTalking * 2;
  if (selectedActivities.value.tutor) time += counts.value.tutor * 2;
  return time;
});

const selectAllStudents = ref(false);
const selectedStudents = ref([]);
const students = ref([]);
const missionName = ref("");
const selectedActivities = ref({
  listening: false,
  reading: false,
  writing: false,
  speaking: false,
  talking: false,
  gptTalking: false,
  tutor: false,
});
const selectedPriority = ref(null);
const dateRange = ref([
  dayjs().startOf("day").toDate(),
  dayjs().add(7, "day").endOf("day").toDate(),
]);

const teacherId = ref(null);
const teacherChecked = ref(false);

const isClassModeDisabled = computed(() => {
  if (selectedDateOption.value === "today") {
    return false;
  }
  if (!dateRange.value || dateRange.value.length !== 2) return false;
  const startDate = dayjs(dateRange.value[0]).startOf("day");
  const today = dayjs().startOf("day");
  return startDate.isAfter(today);
});

watch(selectedDateOption, (newValue) => {
  if (newValue === "today") {
    dateRange.value = [
      dayjs().startOf("day").toDate(),
      dayjs().endOf("day").toDate(),
    ];
  } else if (
    newValue === "custom" &&
    (!dateRange.value ||
      dateRange.value[1].getTime() === dayjs().endOf("day").toDate().getTime())
  ) {
    dateRange.value = [
      dayjs().startOf("day").toDate(),
      dayjs().add(7, "day").endOf("day").toDate(),
    ];
  }
});

watch(
  dateRange,
  (newValue) => {
    if (newValue && newValue.length === 2) {
      const startDate = dayjs(newValue[0]).startOf("day");
      const today = dayjs().startOf("day");

      if (startDate.isAfter(today)) {
        selectedPriority.value = "normal";
      }
    }
  },
  { deep: true }
);

const units = ref([]);

onMounted(async () => {
  const res = await lessonInfo();
  const res2 = await openlessoninfo();

  const lessonData = res.data.data;
  const openinfo = res2.data.data;

  units.value = lessonData
    .map((title, index) => ({
      id: index + 1,
      name: title,
    }))
    .filter((unit) => openinfo.includes(unit.id));

  fetchStudents();
});

const filteredActivities = computed(() => {
  const entries = Object.entries(selectedActivities.value);
  return entries.filter((item) => item[1]).map((item) => ({ key: item[0] }));
});

const maxStone = computed(() => {
  if (totalTime.value <= 5) return 1;
  if (totalTime.value <= 10) return 2;
  if (totalTime.value <= 15) return 3;
  return 4;
});

const maxGold = computed(() => {
  if (totalTime.value <= 5) return 2000;
  if (totalTime.value <= 10) return 4000;
  if (totalTime.value <= 15) return 6000;
  return 8000;
});

const timeDescription = computed(() => {
  if (totalTime.value <= 5)
    return "0~5분 과제: 4종 스톤 1개씩 + 골드 2,000까지 담기 가능합니다.";
  if (totalTime.value <= 10)
    return "6~10분 과제: 4종 스톤 2개씩 + 골드 4,000까지 담기 가능합니다.";
  if (totalTime.value <= 15)
    return "11~15분 과제: 4종 스톤 3개씩 + 골드 6,000까지 담기 가능합니다.";
  return "16분 이상 과제: 4종 스톤 4개씩 + 골드 8,000까지 담기 가능합니다.";
});

const fetchStudents = async () => {
  try {
    const response = await getStudentList();

    if (response.data && response.data.data) {
      students.value = [];
      selectedStudents.value = [];

      response.data.data.forEach((user) => {
        if (user.schoolLevel === "student") {
          // 학생 계정
          students.value.push({
            id: user.user,
            name: user.name,
          });
          selectedStudents.value.push(false);
        } else if (user.schoolLevel === "teacher") {
          // 교사 계정
          teacherId.value = user.user;
        }
      });
    }
  } catch (error) {
    console.error("학생 데이터를 가져오는데 실패했습니다:", error);
  }
};

const toggleDropdown = (event) => {
  event.stopPropagation();
  isOpen.value = !isOpen.value;
};

const selectUnit = (unit) => {
  selectedUnit.value = unit;
  isOpen.value = false;
};

const handleClickOutside = (event) => {
  if (
    dropdownList.value &&
    !dropdownList.value.contains(event.target) &&
    !event.target.closest(".select-wrap")
  ) {
    isOpen.value = false;
  }
};

const increment = (type) => {
  if (type === "gold") {
    if (counts.value[type] < maxGold.value) {
      counts.value[type] = Math.min(counts.value[type] + 1000, maxGold.value);
    }
  } else if (type === "stone") {
    if (counts.value[type] < maxStone.value) {
      counts.value[type]++;
    }
  } else {
    counts.value[type]++;
  }
};

const decrement = (type) => {
  if (type === "gold") {
    if (counts.value[type] > 1000) {
      counts.value[type] -= 1000;
    } else {
      counts.value[type] = 1000;
    }
  } else if (type === "stone") {
    if (counts.value[type] > 1) {
      counts.value[type]--;
    } else {
      counts.value[type] = 1;
    }
  } else {
    if (counts.value[type] > 1) {
      counts.value[type]--;
    } else {
      counts.value[type] = 1;
    }
  }
};

const updateCount = (type, value) => {
  if (type === "gold") {
    const newValue = Math.max(0, Math.floor(parseInt(value) / 1000) * 1000);
    counts.value[type] = Math.min(newValue, maxGold.value);
  } else {
    const newValue = Math.max(0, parseInt(value) || 0);
    counts.value[type] = Math.min(newValue, maxStone.value);
  }
};

const toggleAllStudents = () => {
  if (selectAllStudents.value) {
    selectedStudents.value = Array(students.value.length).fill(true);
  } else {
    selectedStudents.value = Array(students.value.length).fill(false);
  }
};

const prettyDate = (dates) => {
  const [start, end] = dates;
  return `${dayjs(start).locale("ko").format("YYYY-MM-DD (ddd)")} ~ ${dayjs(end)
    .locale("ko")
    .format("YYYY-MM-DD (ddd)")}`;
};

const disabledDates = (date) => {
  const today = dayjs().startOf("day");
  return dayjs(date).isBefore(today);
};

const validateMission = () => {
  const errors = [];

  if (!missionName.value) {
    errors.push("과제명");
  }
  if (!selectedUnit.value) {
    errors.push("단원 선택");
  }
  if (!Object.values(selectedActivities.value).some((value) => value)) {
    errors.push("과제 선택");
  }
  if (selectedStudents.value.filter(Boolean).length === 0) {
    errors.push("전송 대상");
  }
  if (
    selectedDateOption.value === "custom" &&
    (!dateRange.value || dateRange.value.length !== 2)
  ) {
    errors.push("기간 설정");
  }

  const hasValidCounts = Object.entries(selectedActivities.value).some(
    ([key, isSelected]) => {
      if (isSelected) {
        return counts.value[key] > 0;
      }
      return true;
    }
  );
  if (!hasValidCounts) {
    errors.push("과제별 횟수");
  }

  if (counts.value.stone < 1 || counts.value.stone > maxStone.value) {
    errors.push("스톤 보상");
  }
  if (counts.value.gold < 1000 || counts.value.gold > maxGold.value) {
    errors.push("골드 보상");
  }

  if (selectedPriority.value === "classMode" && isClassModeDisabled.value) {
    errors.push("수업 모드");
  }

  return errors;
};

const showInputCheckModal = ref(false);
const showStartDateModal = ref(false);
const showCompleteModal = ref(false);
const validationErrors = ref([]);
const isSaving = ref(false);

const closeModal = (type) => {
  if (type === "input") {
    showInputCheckModal.value = false;
  } else if (type === "date") {
    showStartDateModal.value = false;
  } else if (type === "complete") {
    showCompleteModal.value = false;
  }
};

const saveMission = () => {
  if (isSaving.value) return;

  const errors = validateMission();

  if (errors.length > 0) {
    validationErrors.value = errors;
    showInputCheckModal.value = true;
    return;
  }

  // 기간 설정이 오늘 이후인 경우 확인
  if (
    selectedDateOption.value === "custom" &&
    dateRange.value &&
    dateRange.value.length === 2
  ) {
    const startDate = dayjs(dateRange.value[0]).startOf("day");
    const today = dayjs().startOf("day");

    if (startDate.isAfter(today)) {
      pendingSave.value = true;
      showStartDateModal.value = true;
      return;
    }
  }

  doSaveMission();
};

const doSaveMission = () => {
  if (isSaving.value) return;

  isSaving.value = true;

  const selectedStudentIds = students.value
    .filter((_, index) => selectedStudents.value[index])
    .map((student) => student.id);

  if (teacherChecked.value && teacherId.value) {
    selectedStudentIds.push(teacherId.value);
  }

  const missionData = {
    missionName: missionName.value,
    lesson: selectedUnit.value.id,
    contents: Object.entries(selectedActivities.value).reduce(
      (acc, [key, isSelected]) => {
        if (isSelected && counts.value[key] > 0) {
          const contentKey = {
            listening: "listening",
            reading: "reading",
            writing: "writing",
            speaking: "speaking",
            talking: "talking",
            gptTalking: "gptTalking",
            tutor: "tutor",
          }[key];
          if (contentKey) {
            acc[contentKey] = counts.value[key];
          }
        }
        return acc;
      },
      {}
    ),
    students: selectedStudentIds,
    rewards: {
      stone: counts.value.stone,
      gold: counts.value.gold,
    },
    startDate:
      selectedDateOption.value === "today"
        ? dayjs().format("YYYY-MM-DD")
        : dayjs(dateRange.value[0]).format("YYYY-MM-DD"),
    endDate:
      selectedDateOption.value === "today"
        ? dayjs().format("YYYY-MM-DD")
        : dayjs(dateRange.value[1]).format("YYYY-MM-DD"),
    missionMode: selectedPriority.value === "classMode",
  };

  // console.log("missionData", missionData);

  createEnglishMission(missionData)
    .then(() => {
      showCompleteModal.value = true;
    })
    .catch((error) => {
      console.error("미션 생성 실패:", error);
    })
    .finally(() => {
      isSaving.value = false;
    });
};

const confirmStartDate = () => {
  showStartDateModal.value = false;
  if (pendingSave.value) {
    pendingSave.value = false;
    doSaveMission();
  }
};

const goToList = () => {
  showCompleteModal.value = false;
  emit("back-to-list");
};

const getActivityType = (key) => {
  const types = {
    listening: "액티비티",
    reading: "액티비티",
    writing: "액티비티",
    speaking: "액티비티",
    talking: "AI 대화",
    gptTalking: "AI 대화",
    tutor: "AI 튜터",
  };
  return types[key] || "";
};

const getActivityName = (key) => {
  const names = {
    listening: "듣기",
    reading: "읽기",
    writing: "쓰기",
    speaking: "말하기",
    talking: "교과서 대화",
    gptTalking: "GPT 교과대화",
    tutor: "단어 맞춤 학습",
  };
  return names[key] || "";
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// 보상 설정 자동 조정
watch(
  totalTime,
  () => {
    if (counts.value.stone > maxStone.value) {
      counts.value.stone = maxStone.value;
    }

    if (counts.value.gold > maxGold.value) {
      counts.value.gold = maxGold.value;
    }
  },
  { immediate: true }
);

const premium = ref(false);

onMounted(async () => {
  const res = await userInfo();
  const check = res.data.data;

  if (check.payPlan === "p" || check.payPlan === "pm") {
    premium.value = true;
  } else {
    premium.value = false;
  }
});

const yearRange = computed(() => {
  return [dayjs().year(), dayjs().add(1, "year").year()];
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
  gap: 35px;
}

.step {
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

.border {
  padding: 20px;
  border: 1px solid #d2d2d2;
  border-radius: 16px;

  .checkbox-group {
    margin-top: 15px;
  }

  &.p-0 {
    padding: 0 !important;
  }
}

.border-title {
  border-radius: 16px 16px 0px 0px;
  border-bottom: 1px solid #d2d2d2;
  background: #f5f5f5;
  padding: 12px 20px;
  font-size: 16px;
  color: #525252;
  font-family: "notosans";
}

.border-content {
  padding: 14px 20px;
  font-size: 16px;
}

.border-input,
.select-wrap {
  width: 100%;
  border: 1px solid #d2d2d2;
  border-radius: 16px;
  padding: 18px 16px;
  font-size: 16px;
  color: #292929;
}

.border-input::placeholder {
  color: #adadad;
}

.select-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.select {
  position: relative;
  width: 100%;
}

.option {
  z-index: 999;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cae3ff;
    border-radius: 3px;

    &:hover {
      background: #3d90ef;
    }
  }

  > li {
    cursor: pointer;
    padding: 11px 20px;
    font-size: 16px;
    transition: all 0.2s;

    &:hover {
      background: #eaf4ff;
      color: var(--main-blue);
    }

    &.selected {
      background: #eaf4ff;
      color: var(--main-blue);
    }
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 18px;
}

.border .mission-item:nth-child(1) {
  padding-top: 0;
}

.mission-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
  padding: 15px 0;
}

h6 {
  font-size: 16px;
  color: #292929;
}

.mission-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #292929;
}

.mission-count {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 16px;
  color: #6b6b6b;

  .count-input {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  span {
    width: 140px;
  }
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

  &:last-child {
    border-bottom: none;
  }
}

.total-time {
  color: #3d90ef !important;
  font-size: 16px;
  font-family: "notosans";
  display: flex;
  justify-content: end;
  padding-top: 40px;
}

.reward-wrap {
  display: flex;
  gap: 25px;
  padding-bottom: 10px;
}

.reward {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;

  p {
    font-size: 12px;
    font-family: "notosans";
    color: #6b6b6b;
  }
}

.reward .count-input {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid #cae3ff;
  border-radius: 4px;
}

.reward .count-input input {
  width: 40px;
  height: 24px;
  border-left: 1px solid #cae3ff;
  border-right: 1px solid #cae3ff;
  padding: 0 4px;
  text-align: center;
  font-size: 14px;
  -moz-appearance: textfield;
}

.reward .count-btn {
  width: 22px;
  height: 24px;
  border-radius: 4px;
  background: #fff;
  color: #292929;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.mission-count .count-input input {
  width: 48px;
  height: 40px;
  border: 1px solid #cae3ff;
  border-radius: 4px;
  padding: 0 4px;
  text-align: center;
  font-size: 14px;
  -moz-appearance: textfield;
}

.count-input input::-webkit-inner-spin-button,
.count-input input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.mission-count .count-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #cae3ff;
  border-radius: 4px;
  background: #fff;
  color: #292929;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.count-btn:hover {
  background: #f5f5f5;
}

.count-btn:active {
  background: #e8e8e8;
}

.count-input span {
  color: #292929;
  margin-left: 4px;
}

.student-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 14px;
  border-bottom: 1px solid #e8e8e8;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.student-count {
  font-size: 14px;
  color: #6b6b6b;
}

.student-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  padding-top: 14px;
}

.student-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.student-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.student-item input[type="checkbox"] {
  margin-right: 4px;
}

.student-item label {
  font-size: 14px;
  color: #212529;
}

h6 {
  font-family: "notosans";
  font-size: 16px;
  color: #292929;
  white-space: nowrap;
}

.datepicker-wrap {
  padding-left: 40px;
}

:deep(.v-input__details) {
  display: none;
}

.arrow-icon.is-open {
  transform: rotate(180deg);
}

.disabled-message {
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 8px;
}

.v-chip.v-chip--density-default {
  border-radius: 8px !important;
}

.confirm-modal,
.success-modal {
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
</style>
