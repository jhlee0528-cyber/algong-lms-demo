<script setup lang="ts">
import { ref } from 'vue'
import { Line, Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
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
type TabType = 'activity' | 'pronunciation' | 'ai-chat' | 'teacher-mission'
const activeTab = ref<TabType>('activity')

// 선택된 단원
const selectedUnit = ref(1)

// 학생 정보 (더미)
const studentInfo = {
  avatar: '👦',
  nickname: '공부왕',
  gems: {
    blue: 125,
    green: 89,
    pink: 43
  },
  gold: 2580,
  gameMissions: {
    construction: 65,
    quest: 82,
    achievement: 48
  },
  units: [
    { unit: 1, progress: 100, title: 'Unit 1: Greetings' },
    { unit: 2, progress: 85, title: 'Unit 2: My Family' },
    { unit: 3, progress: 60, title: 'Unit 3: Colors' },
    { unit: 4, progress: 30, title: 'Unit 4: Animals' },
  ]
}

// 정답률 단원별 (선 그래프)
const unitAccuracyData = {
  labels: Array.from({ length: 13 }, (_, i) => `${i + 1}`),
  datasets: [{
    label: '정답률 (%)',
    data: [85, 90, 88, 92, 87, 85, 90, 88, 85, 82, 80, 75, 70],
    borderColor: '#3D90EF',
    backgroundColor: 'rgba(61, 144, 239, 0.1)',
    tension: 0.4,
    fill: true,
  }]
}

const unitAccuracyOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: '정답률 단원별',
      font: { size: 14, weight: 'bold' as const }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: { callback: (value: string | number) => value + '%' }
    }
  }
}

// 정답률 영역별 (레이더 차트)
const areaAccuracyData = {
  labels: ['철자', '어순', '의미파악', '말하기', '소리', '듣기'],
  datasets: [{
    label: '정답률 (%)',
    data: [85, 92, 88, 78, 90, 85],
    backgroundColor: 'rgba(61, 144, 239, 0.2)',
    borderColor: '#3D90EF',
    borderWidth: 2,
    pointBackgroundColor: '#3D90EF',
  }]
}

const areaAccuracyOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: '정답률 영역별',
      font: { size: 14, weight: 'bold' as const }
    }
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: { stepSize: 20 }
    }
  }
}

// 학습 문제수
const problemCounts = {
  words: 245,
  sentences: 183,
  conversations: 127
}

// 진행률
const progressData = [
  { type: 'Listening', current: 3, total: 3 },
  { type: 'Reading', current: 2, total: 3 },
  { type: 'Writing', current: 2, total: 3 },
  { type: 'Speaking', current: 2, total: 3 },
  { type: 'AI Chatbot', current: 3, total: 3 },
]

// 학습 상세
const learningDetails = [
  {
    type: 'Listening',
    progress: 100,
    items: [
      { name: 'apple', status: 'Perfect' },
      { name: 'banana', status: 'Perfect' },
      { name: 'cat', status: 'Good' },
    ]
  },
  {
    type: 'Reading',
    progress: 80,
    items: [
      { name: 'dog', status: 'Perfect' },
      { name: 'elephant', status: 'Good' },
      { name: 'fish', status: 'Not bad' },
    ]
  },
  {
    type: 'Writing',
    progress: 80,
    items: [
      { name: 'Hello', status: 'Perfect' },
      { name: 'Goodbye', status: 'Good' },
    ]
  },
  {
    type: 'Speaking',
    progress: 80,
    items: [
      { name: 'Nice to meet you', status: 'Perfect' },
      { name: 'How are you?', status: 'Good' },
    ]
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Perfect': return 'text-algong-green'
    case 'Good': return 'text-algong-orange'
    case 'Not bad': return 'text-algong-red'
    default: return 'text-gray-500'
  }
}
</script>

<template>
  <!-- 배경 오버레이 -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 z-40"
      @click="$emit('close')"
    ></div>
  </Transition>

  <!-- 상세 패널 (오른쪽 1/3~1/2) -->
  <Transition name="slide">
    <div
      v-if="isOpen"
      class="fixed top-0 right-0 h-full w-full md:w-1/2 lg:w-2/5 bg-white shadow-2xl z-50 flex overflow-hidden"
      @click.stop
    >
      <!-- 왼쪽 사이드 패널 (고정) -->
      <div class="w-64 bg-gray-50 border-r border-gray-200 flex flex-col overflow-y-auto">
        <!-- 학생 정보 -->
        <div class="p-4 bg-white border-b border-gray-200">
          <div class="text-center mb-3">
            <div class="text-6xl mb-2">{{ studentInfo.avatar }}</div>
            <h3 class="font-bold text-gray-900">{{ student.name }}</h3>
            <p class="text-sm text-gray-500">{{ studentInfo.nickname }}</p>
          </div>

          <!-- 보유 재화 -->
          <div class="space-y-2 text-sm">
            <div class="flex items-center justify-between">
              <span class="flex items-center gap-2">
                <span class="w-4 h-4 rounded-full bg-blue-500"></span>
                파랑 보석
              </span>
              <span class="font-semibold">{{ studentInfo.gems.blue }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="flex items-center gap-2">
                <span class="w-4 h-4 rounded-full bg-green-500"></span>
                초록 보석
              </span>
              <span class="font-semibold">{{ studentInfo.gems.green }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="flex items-center gap-2">
                <span class="w-4 h-4 rounded-full bg-pink-500"></span>
                분홍 보석
              </span>
              <span class="font-semibold">{{ studentInfo.gems.pink }}</span>
            </div>
            <div class="flex items-center justify-between pt-2 border-t">
              <span class="flex items-center gap-2">
                <span class="text-yellow-500">🪙</span>
                골드
              </span>
              <span class="font-semibold text-yellow-600">{{ studentInfo.gold }}</span>
            </div>
          </div>
        </div>

        <!-- 게임 미션 진행도 -->
        <div class="p-4 border-b border-gray-200">
          <h4 class="text-sm font-semibold text-gray-700 mb-3">게임 미션 진행도</h4>
          <div class="grid grid-cols-3 gap-2">
            <div class="text-center">
              <div class="relative w-12 h-12 mx-auto mb-1">
                <svg class="w-12 h-12 transform -rotate-90">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" stroke-width="4" />
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#3D90EF" stroke-width="4"
                    :stroke-dasharray="`${studentInfo.gameMissions.construction * 1.25} 125`" />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center text-xs font-bold">
                  {{ studentInfo.gameMissions.construction }}%
                </div>
              </div>
              <p class="text-xs text-gray-600">공사</p>
            </div>
            <div class="text-center">
              <div class="relative w-12 h-12 mx-auto mb-1">
                <svg class="w-12 h-12 transform -rotate-90">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" stroke-width="4" />
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#0FD197" stroke-width="4"
                    :stroke-dasharray="`${studentInfo.gameMissions.quest * 1.25} 125`" />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center text-xs font-bold">
                  {{ studentInfo.gameMissions.quest }}%
                </div>
              </div>
              <p class="text-xs text-gray-600">퀘스트</p>
            </div>
            <div class="text-center">
              <div class="relative w-12 h-12 mx-auto mb-1">
                <svg class="w-12 h-12 transform -rotate-90">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" stroke-width="4" />
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#F78D0F" stroke-width="4"
                    :stroke-dasharray="`${studentInfo.gameMissions.achievement * 1.25} 125`" />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center text-xs font-bold">
                  {{ studentInfo.gameMissions.achievement }}%
                </div>
              </div>
              <p class="text-xs text-gray-600">업적</p>
            </div>
          </div>
        </div>

        <!-- 단원 선택 -->
        <div class="p-4 border-b border-gray-200 flex-1">
          <h4 class="text-sm font-semibold text-gray-700 mb-3">단원 선택</h4>
          <div class="space-y-2">
            <button
              v-for="unit in studentInfo.units"
              :key="unit.unit"
              @click="selectedUnit = unit.unit"
              :class="[
                'w-full text-left p-3 rounded-lg transition-colors',
                selectedUnit === unit.unit
                  ? 'bg-blue-100 border-2 border-algong-blue'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              ]"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium">{{ String(unit.unit).padStart(2, '0') }}</span>
                <span class="text-xs text-gray-500">{{ unit.progress }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  class="bg-algong-blue h-1.5 rounded-full"
                  :style="{ width: `${unit.progress}%` }"
                ></div>
              </div>
              <p class="text-xs text-gray-600 mt-1">{{ unit.title }}</p>
            </button>
          </div>
        </div>

        <!-- AI 종합 학습 레포트 버튼 -->
        <div class="p-4">
          <button class="w-full py-3 bg-algong-green hover:bg-green-600 text-white font-semibold rounded-lg transition-colors">
            AI 종합 학습 레포트
          </button>
        </div>
      </div>

      <!-- 오른쪽 메인 패널 -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- 헤더 -->
        <div class="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <h2 class="text-lg font-bold text-gray-900">학습 상세</h2>
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
        <div class="border-b border-gray-200 bg-white px-4">
          <nav class="flex gap-1">
            <button
              @click="activeTab = 'activity'"
              :class="[
                'px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'activity'
                  ? 'text-algong-blue border-algong-blue'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
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
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              ]"
            >
              AI 발음평가
            </button>
            <button
              @click="activeTab = 'ai-chat'"
              :class="[
                'px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'ai-chat'
                  ? 'text-algong-blue border-algong-blue'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              ]"
            >
              AI 대화
            </button>
            <button
              @click="activeTab = 'teacher-mission'"
              :class="[
                'px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'teacher-mission'
                  ? 'text-algong-blue border-algong-blue'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              ]"
            >
              교사미션
            </button>
          </nav>
        </div>

        <!-- 탭 컨텐츠 -->
        <div class="flex-1 overflow-y-auto p-6 bg-gray-50">
          <!-- 액티비티 탭 -->
          <div v-if="activeTab === 'activity'" class="space-y-6">
            <!-- 정답률 차트 2열 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white rounded-lg shadow p-4">
                <div class="h-64">
                  <Line :data="unitAccuracyData" :options="unitAccuracyOptions" />
                </div>
              </div>
              <div class="bg-white rounded-lg shadow p-4">
                <div class="h-64">
                  <Radar :data="areaAccuracyData" :options="areaAccuracyOptions" />
                </div>
              </div>
            </div>

            <!-- 학습 문제수 -->
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="text-sm font-semibold text-gray-800 mb-4">학습 문제수</h3>
              <div class="grid grid-cols-3 gap-4">
                <div class="text-center">
                  <div class="text-3xl mb-2">🔤</div>
                  <p class="text-sm text-gray-600">단어</p>
                  <p class="text-xl font-bold text-algong-blue">{{ problemCounts.words }}</p>
                </div>
                <div class="text-center">
                  <div class="text-3xl mb-2">📝</div>
                  <p class="text-sm text-gray-600">문장</p>
                  <p class="text-xl font-bold text-algong-green">{{ problemCounts.sentences }}</p>
                </div>
                <div class="text-center">
                  <div class="text-3xl mb-2">💬</div>
                  <p class="text-sm text-gray-600">대화</p>
                  <p class="text-xl font-bold text-algong-orange">{{ problemCounts.conversations }}</p>
                </div>
              </div>
            </div>

            <!-- 진행률 -->
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="text-sm font-semibold text-gray-800 mb-4">진행률</h3>
              <div class="space-y-3">
                <div v-for="item in progressData" :key="item.type" class="flex items-center justify-between">
                  <span class="text-sm text-gray-700">{{ item.type }}</span>
                  <span class="text-sm font-semibold text-algong-blue">{{ item.current }}/{{ item.total }}</span>
                </div>
              </div>
            </div>

            <!-- 학습 상세 -->
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="text-sm font-semibold text-gray-800 mb-4">학습 상세</h3>
              <div class="space-y-4">
                <div v-for="detail in learningDetails" :key="detail.type" class="border-b border-gray-100 pb-4 last:border-0">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-sm font-medium text-gray-900">{{ detail.type }}</span>
                    <div class="flex items-center gap-2">
                      <div class="relative w-12 h-12">
                        <svg class="w-12 h-12 transform -rotate-90">
                          <circle cx="24" cy="24" r="18" fill="none" stroke="#e5e7eb" stroke-width="4" />
                          <circle cx="24" cy="24" r="18" fill="none" stroke="#3D90EF" stroke-width="4"
                            :stroke-dasharray="`${detail.progress * 1.13} 113`" />
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center text-xs font-bold">
                          {{ detail.progress }}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(item, idx) in detail.items"
                      :key="idx"
                      :class="['text-xs px-2 py-1 rounded', getStatusColor(item.status)]"
                    >
                      {{ item.name }} ({{ item.status }})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- AI 발음평가 탭 -->
          <div v-if="activeTab === 'pronunciation'" class="text-center py-12 text-gray-500">
            AI 발음평가 데이터 준비 중...
          </div>

          <!-- AI 대화 탭 -->
          <div v-if="activeTab === 'ai-chat'" class="text-center py-12 text-gray-500">
            AI 대화 데이터 준비 중...
          </div>

          <!-- 교사미션 탭 -->
          <div v-if="activeTab === 'teacher-mission'" class="text-center py-12 text-gray-500">
            교사미션 데이터 준비 중...
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
