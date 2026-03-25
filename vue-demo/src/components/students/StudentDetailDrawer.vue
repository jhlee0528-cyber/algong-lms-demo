<script setup lang="ts">
import { ref, computed } from 'vue'
import { Bar, Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
)

interface Props {
  student: {
    id: number
    name: string
    progress: number
    accuracy: number
    learningTime: number
    readingBooks: number
    status: string
  }
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

// 탭 상태
type TabType = 'activity' | 'pronunciation' | 'ai-chat'
const activeTab = ref<TabType>('activity')

// 액티비티 탭 - 단원별 정답률 데이터
const unitAccuracyData = computed(() => ({
  labels: ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6'],
  datasets: [
    {
      label: '정답률 (%)',
      data: [85, 92, 78, 88, 90, 82],
      backgroundColor: '#3D90EF',
      borderColor: '#258AFF',
      borderWidth: 1,
    }
  ]
}))

const unitAccuracyOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: '단원별 정답률',
      font: {
        size: 14,
        weight: 'bold' as const
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        callback: (value: string | number) => value + '%'
      }
    }
  }
}

// 진행률 레이더 차트 데이터
const progressRadarData = computed(() => ({
  labels: ['단어', '문장', '대화', '독서', '발음', '듣기'],
  datasets: [
    {
      label: '진행률 (%)',
      data: [85, 78, 92, 75, 88, 82],
      backgroundColor: 'rgba(61, 144, 239, 0.2)',
      borderColor: '#3D90EF',
      borderWidth: 2,
      pointBackgroundColor: '#3D90EF',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#3D90EF'
    }
  ]
}))

const progressRadarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: '영역별 진행률',
      font: {
        size: 14,
        weight: 'bold' as const
      }
    }
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 20,
        callback: (value: string | number) => value + '%'
      }
    }
  }
}

// 학습 문제 수 데이터
const learningProblems = computed(() => [
  { type: '단어', count: 245, color: 'bg-blue-500' },
  { type: '문장', count: 183, color: 'bg-green-500' },
  { type: '대화', count: 127, color: 'bg-purple-500' },
])

// AI 발음평가 탭 데이터
const pronunciationData = computed(() => ({
  averageScore: 87,
  improvementWords: [
    { word: 'through', score: 65, issue: '발음 정확도 낮음' },
    { word: 'schedule', score: 70, issue: '강세 위치 오류' },
    { word: 'comfortable', score: 72, issue: '음절 생략' },
    { word: 'vocabulary', score: 75, issue: '발음 속도 빠름' },
  ]
}))

// AI 대화 탭 데이터
const aiChatData = computed(() => ({
  totalChats: 24,
  recentChats: [
    {
      date: '2026-03-24',
      topic: '자기소개',
      sentences: 15,
      score: 92,
    },
    {
      date: '2026-03-23',
      topic: '좋아하는 음식',
      sentences: 12,
      score: 88,
    },
    {
      date: '2026-03-22',
      topic: '주말 계획',
      sentences: 18,
      score: 85,
    },
  ]
}))

// Drawer 닫기 (배경 클릭)
const handleBackdropClick = () => {
  emit('close')
}

// Drawer 내부 클릭 시 이벤트 전파 중지
const handleDrawerClick = (e: Event) => {
  e.stopPropagation()
}
</script>

<template>
  <!-- 배경 오버레이 -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 z-50 transition-opacity"
      @click="handleBackdropClick"
    ></div>
  </Transition>

  <!-- Drawer 패널 -->
  <Transition name="slide">
    <div
      v-if="isOpen"
      class="fixed top-0 right-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto"
      @click="handleDrawerClick"
    >
      <!-- 헤더 -->
      <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
        <div>
          <h2 class="text-xl font-bold text-gray-900">{{ student.name }} 학습상세</h2>
          <p class="text-sm text-gray-500">학습진행률 {{ student.progress }}% · 정답률 {{ student.accuracy }}%</p>
        </div>
        <button
          @click="$emit('close')"
          class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 탭 메뉴 -->
      <div class="border-b border-gray-200 px-6">
        <nav class="flex gap-4">
          <button
            @click="activeTab = 'activity'"
            :class="[
              'px-4 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'activity'
                ? 'text-algong-blue border-algong-blue'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            액티비티
          </button>
          <button
            @click="activeTab = 'pronunciation'"
            :class="[
              'px-4 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'pronunciation'
                ? 'text-algong-blue border-algong-blue'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            AI발음평가
          </button>
          <button
            @click="activeTab = 'ai-chat'"
            :class="[
              'px-4 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'ai-chat'
                ? 'text-algong-blue border-algong-blue'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            AI대화
          </button>
        </nav>
      </div>

      <!-- 탭 컨텐츠 -->
      <div class="p-6 space-y-6">
        <!-- 액티비티 탭 -->
        <div v-if="activeTab === 'activity'" class="space-y-6">
          <!-- 단원별 정답률 그래프 -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <div class="h-64">
              <Bar :data="unitAccuracyData" :options="unitAccuracyOptions" />
            </div>
          </div>

          <!-- 학습 문제 수 -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h3 class="text-sm font-semibold text-gray-900 mb-4">학습 문제 수</h3>
            <div class="space-y-3">
              <div
                v-for="item in learningProblems"
                :key="item.type"
                class="flex items-center justify-between"
              >
                <div class="flex items-center gap-3">
                  <div :class="['w-3 h-3 rounded-full', item.color]"></div>
                  <span class="text-sm text-gray-700">{{ item.type }}</span>
                </div>
                <span class="text-sm font-semibold text-gray-900">{{ item.count }}문제</span>
              </div>
            </div>
          </div>

          <!-- 진행률 레이더 차트 -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <div class="h-80">
              <Radar :data="progressRadarData" :options="progressRadarOptions" />
            </div>
          </div>
        </div>

        <!-- AI발음평가 탭 -->
        <div v-if="activeTab === 'pronunciation'" class="space-y-6">
          <!-- 평균 발음 점수 -->
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 text-center">
            <p class="text-sm text-gray-600 mb-2">평균 발음 점수</p>
            <p class="text-5xl font-bold text-algong-blue">{{ pronunciationData.averageScore }}</p>
            <p class="text-sm text-gray-500 mt-2">100점 만점</p>
          </div>

          <!-- 개선 필요 단어 목록 -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h3 class="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-algong-orange" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              개선 필요 단어
            </h3>
            <div class="space-y-3">
              <div
                v-for="(item, index) in pronunciationData.improvementWords"
                :key="index"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p class="font-medium text-gray-900">{{ item.word }}</p>
                  <p class="text-xs text-gray-500">{{ item.issue }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold" :class="item.score < 70 ? 'text-algong-red' : 'text-algong-orange'">
                    {{ item.score }}점
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI대화 탭 -->
        <div v-if="activeTab === 'ai-chat'" class="space-y-6">
          <!-- 대화 통계 -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <p class="text-sm text-gray-600 mb-2">총 대화 횟수</p>
              <p class="text-3xl font-bold text-algong-blue">{{ aiChatData.totalChats }}</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <p class="text-sm text-gray-600 mb-2">평균 문장 수</p>
              <p class="text-3xl font-bold text-algong-green">15</p>
            </div>
          </div>

          <!-- 최근 대화 내역 -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h3 class="text-sm font-semibold text-gray-900 mb-4">최근 대화 내역</h3>
            <div class="space-y-3">
              <div
                v-for="(chat, index) in aiChatData.recentChats"
                :key="index"
                class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <p class="font-medium text-gray-900">{{ chat.topic }}</p>
                    <p class="text-xs text-gray-500">{{ chat.date }}</p>
                  </div>
                  <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                    {{ chat.score }}점
                  </span>
                </div>
                <div class="flex items-center gap-4 text-xs text-gray-600">
                  <span>💬 {{ chat.sentences }}문장</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Fade 애니메이션 (배경) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide 애니메이션 (Drawer) */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* 스크롤바 스타일링 */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
