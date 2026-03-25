<script setup lang="ts">
import { ref, computed } from 'vue'
import { Line, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

// 학생 데이터 타입
interface Student {
  id: number
  name: string
  booksRead: number
  averageScore: number
  status: 'green' | 'orange' | 'red'
}

// 도서 데이터 타입
interface Book {
  id: number
  title: string
  author: string
  level: number
  coverColor: string
  quizScore?: number
  readCount: number
}

// 학생 목록 (신호등 상태 포함)
const students = ref<Student[]>([
  { id: 1, name: '학민혁', booksRead: 12, averageScore: 92, status: 'green' },
  { id: 2, name: '왕재군', booksRead: 10, averageScore: 88, status: 'green' },
  { id: 3, name: '김지수', booksRead: 7, averageScore: 75, status: 'orange' },
  { id: 4, name: '이서연', booksRead: 15, averageScore: 95, status: 'green' },
  { id: 5, name: '박현우', booksRead: 4, averageScore: 65, status: 'red' },
  { id: 6, name: '최소영', booksRead: 11, averageScore: 89, status: 'green' },
  { id: 7, name: '정도현', booksRead: 6, averageScore: 70, status: 'orange' },
  { id: 8, name: '강수진', booksRead: 13, averageScore: 93, status: 'green' },
  { id: 9, name: '윤지훈', booksRead: 3, averageScore: 60, status: 'red' },
  { id: 10, name: '한나은', booksRead: 9, averageScore: 87, status: 'green' },
])

// 좌측 사이드바 뷰 모드
type ViewMode = 'class' | 'book'
const viewMode = ref<ViewMode>('class')

// 선택된 학생
const selectedStudent = ref<Student | null>(null)

// Top 3 인기 도서 기간 필터
type PeriodFilter = 'weekly' | 'total'
const periodFilter = ref<PeriodFilter>('weekly')

// 인기 도서 Top 3 (주간/전체)
const weeklyTopBooks: Book[] = [
  { id: 1, title: 'The Cat in the Hat', author: 'Dr. Seuss', level: 3, coverColor: 'from-red-400 to-pink-500', readCount: 18 },
  { id: 2, title: 'Green Eggs and Ham', author: 'Dr. Seuss', level: 2, coverColor: 'from-green-400 to-emerald-500', readCount: 15 },
  { id: 3, title: 'Where the Wild Things Are', author: 'Maurice Sendak', level: 4, coverColor: 'from-blue-400 to-indigo-500', readCount: 12 },
]

const totalTopBooks: Book[] = [
  { id: 1, title: 'Charlotte\'s Web', author: 'E.B. White', level: 6, coverColor: 'from-gray-400 to-slate-500', readCount: 45 },
  { id: 2, title: 'The Giving Tree', author: 'Shel Silverstein', level: 5, coverColor: 'from-green-500 to-teal-500', readCount: 38 },
  { id: 3, title: 'The Cat in the Hat', author: 'Dr. Seuss', level: 3, coverColor: 'from-red-400 to-pink-500', readCount: 32 },
]

const topBooks = computed(() =>
  periodFilter.value === 'weekly' ? weeklyTopBooks : totalTopBooks
)

// 전체 독서 활동 통계
const readingStats = {
  averageBooksPerStudent: 9.0,
  totalBooks: 90,
  totalSentences: 1250,
}

// 월별 독서량 그래프 데이터
const monthlyReadingData = computed(() => ({
  labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
  datasets: [
    {
      label: '독서 권수',
      data: [45, 62, 78, 85, 90, 90],
      borderColor: '#3D90EF',
      backgroundColor: 'rgba(61, 144, 239, 0.1)',
      tension: 0.4,
      fill: true,
    }
  ]
}))

const monthlyReadingOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: '월별 독서량 추이',
      font: {
        size: 14,
        weight: 'bold' as const
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 20
      }
    }
  }
}

// 독서 퀴즈 결과 파이차트
const quizResultData = computed(() => ({
  labels: ['100점', '90-99점', '80-89점', '70-79점', '70점 미만'],
  datasets: [
    {
      data: [25, 35, 20, 15, 5],
      backgroundColor: [
        '#0FD197',
        '#3D90EF',
        '#F78D0F',
        '#F23A3A',
        '#9CA3AF',
      ],
    }
  ]
}))

const quizResultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 10,
        font: {
          size: 11
        }
      }
    },
    title: {
      display: true,
      text: '독서 퀴즈 결과 분포',
      font: {
        size: 14,
        weight: 'bold' as const
      }
    }
  }
}

// 주간 독서 랭킹
const weeklyRanking = computed(() =>
  [...students.value]
    .sort((a, b) => b.booksRead - a.booksRead)
    .slice(0, 5)
)

// 레벨별 독서 현황 (더미 데이터)
const levelReadingStats = Array.from({ length: 12 }, (_, i) => ({
  level: i + 1,
  count: Math.floor(Math.random() * 15) + 5
}))

// 신호등 색상
const getStatusColor = (status: string) => {
  switch (status) {
    case 'green': return 'bg-algong-green'
    case 'orange': return 'bg-algong-orange'
    case 'red': return 'bg-algong-red'
    default: return 'bg-gray-400'
  }
}

// 학생 선택
const selectStudent = (student: Student) => {
  selectedStudent.value = student
}

// 학생 번호 포맷 (01, 02, ...)
const formatStudentNumber = (index: number) => {
  return String(index + 1).padStart(2, '0')
}
</script>

<template>
  <div class="w-full space-y-6">
    <!-- 페이지 헤더 -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">e-library</h1>
        <p class="text-sm text-gray-500 mt-1">우리반 학생들의 영어 독서 활동을 확인하세요</p>
      </div>
    </div>

    <!-- 메인 레이아웃: 왼쪽 사이드바 + 오른쪽 대시보드 -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- 왼쪽 사이드바 -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow overflow-hidden sticky top-20">
          <!-- 뷰 모드 토글 버튼 -->
          <div class="flex border-b border-gray-200">
            <button
              @click="viewMode = 'class'"
              :class="[
                'flex-1 py-3 px-4 text-sm font-medium transition-colors',
                viewMode === 'class'
                  ? 'bg-algong-blue text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              ]"
            >
              우리반 독서정보
            </button>
            <button
              @click="viewMode = 'book'"
              :class="[
                'flex-1 py-3 px-4 text-sm font-medium transition-colors',
                viewMode === 'book'
                  ? 'bg-algong-blue text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              ]"
            >
              도서별 상세정보
            </button>
          </div>

          <!-- 우리반 독서정보: 학생 목록 -->
          <div v-if="viewMode === 'class'" class="p-4">
            <h2 class="text-sm font-semibold text-gray-800 mb-3">학생 목록</h2>
            <div class="space-y-2 max-h-[600px] overflow-y-auto">
              <button
                v-for="(student, index) in students"
                :key="student.id"
                @click="selectStudent(student)"
                :class="[
                  'w-full flex items-center justify-between p-3 rounded-lg transition-all text-left',
                  selectedStudent?.id === student.id
                    ? 'bg-blue-50 border-2 border-algong-blue'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                ]"
              >
                <div class="flex items-center gap-3">
                  <span class="text-xs font-medium text-gray-500 w-6">{{ formatStudentNumber(index) }}</span>
                  <div :class="['w-3 h-3 rounded-full', getStatusColor(student.status)]"></div>
                  <span class="text-sm font-medium text-gray-900">{{ student.name }}</span>
                </div>
                <span class="text-xs text-gray-500">{{ student.booksRead }}권</span>
              </button>
            </div>
          </div>

          <!-- 도서별 상세정보 (플레이스홀더) -->
          <div v-else class="p-4">
            <h2 class="text-sm font-semibold text-gray-800 mb-3">도서 목록</h2>
            <div class="space-y-2 max-h-[600px] overflow-y-auto">
              <div class="text-center py-8 text-gray-500 text-sm">
                도서별 상세 정보 준비 중입니다
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 오른쪽 대시보드 -->
      <div class="lg:col-span-3 space-y-6">
        <!-- Top 3 인기 도서 (주간/전체 토글) -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span class="text-2xl">🏆</span>
              Top 3 인기 도서
            </h2>
            <!-- 주간/전체 토글 -->
            <div class="flex gap-2">
              <button
                @click="periodFilter = 'weekly'"
                :class="[
                  'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                  periodFilter === 'weekly'
                    ? 'bg-algong-blue text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                주간
              </button>
              <button
                @click="periodFilter = 'total'"
                :class="[
                  'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                  periodFilter === 'total'
                    ? 'bg-algong-blue text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                전체
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              v-for="(book, index) in topBooks"
              :key="`${periodFilter}-${book.id}`"
              class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100"
            >
              <div class="flex items-start justify-between mb-3">
                <span class="text-3xl font-bold text-algong-blue">{{ index + 1 }}</span>
                <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Lv.{{ book.level }}
                </span>
              </div>
              <h3 class="font-semibold text-sm text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem]">{{ book.title }}</h3>
              <p class="text-xs text-gray-500 mb-3">{{ book.author }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1 text-xs text-gray-600">
                  <span>👥</span>
                  <span>{{ book.readCount }}명</span>
                </div>
                <span class="text-xs text-gray-500">
                  {{ periodFilter === 'weekly' ? '이번 주' : '전체' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 전체 독서 활동 통계 -->
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-white rounded-lg p-5 text-center shadow">
            <p class="text-xs text-gray-600 mb-2">개별 평균</p>
            <p class="text-3xl font-bold text-algong-blue">{{ readingStats.averageBooksPerStudent }}권</p>
          </div>
          <div class="bg-white rounded-lg p-5 text-center shadow">
            <p class="text-xs text-gray-600 mb-2">누적 독서</p>
            <p class="text-3xl font-bold text-algong-green">{{ readingStats.totalBooks }}권</p>
          </div>
          <div class="bg-white rounded-lg p-5 text-center shadow">
            <p class="text-xs text-gray-600 mb-2">총 발화 문장</p>
            <p class="text-3xl font-bold text-algong-orange">{{ readingStats.totalSentences }}</p>
          </div>
        </div>

        <!-- 차트 섹션 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 월별 독서량 그래프 -->
          <div class="bg-white rounded-lg shadow p-4">
            <div class="h-64">
              <Line :data="monthlyReadingData" :options="monthlyReadingOptions" />
            </div>
          </div>

          <!-- 독서 퀴즈 결과 -->
          <div class="bg-white rounded-lg shadow p-4">
            <div class="h-64">
              <Doughnut :data="quizResultData" :options="quizResultOptions" />
            </div>
          </div>
        </div>

        <!-- 주간 독서 랭킹 테이블 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="p-4 border-b border-gray-200">
            <h3 class="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <span class="text-xl">📊</span>
              주간 독서 랭킹 Top 5
            </h3>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">순위</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">이름</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">독서 권수</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">평균 점수</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">상태</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(student, index) in weeklyRanking" :key="student.id" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm font-bold text-gray-900">
                    <span v-if="index === 0" class="text-yellow-500">🥇</span>
                    <span v-else-if="index === 1" class="text-gray-400">🥈</span>
                    <span v-else-if="index === 2" class="text-orange-600">🥉</span>
                    <span v-else>{{ index + 1 }}</span>
                  </td>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ student.name }}</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-900">{{ student.booksRead }}권</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-900">{{ student.averageScore }}점</td>
                  <td class="px-4 py-3 text-center">
                    <div class="flex items-center justify-center">
                      <div :class="['w-3 h-3 rounded-full', getStatusColor(student.status)]"></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 레벨별 독서 현황 -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">레벨별 독서 현황</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div
              v-for="stat in levelReadingStats"
              :key="stat.level"
              class="text-center p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
            >
              <p class="text-sm font-medium text-gray-700 mb-2">Level {{ stat.level }}</p>
              <p class="text-2xl font-bold text-algong-blue">{{ stat.count }}</p>
              <p class="text-xs text-gray-500 mt-1">권 읽음</p>
            </div>
          </div>
        </div>

        <!-- 선택된 학생의 독서 현황 -->
        <div v-if="selectedStudent" class="bg-white rounded-lg shadow p-6 border-2 border-algong-blue">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-xl">👤</span>
            {{ selectedStudent.name }} 학생의 독서 현황
          </h3>
          <div class="grid grid-cols-3 gap-4 mb-4">
            <div class="text-center p-4 bg-blue-50 rounded-lg">
              <p class="text-sm text-gray-600 mb-1">읽은 책</p>
              <p class="text-2xl font-bold text-algong-blue">{{ selectedStudent.booksRead }}권</p>
            </div>
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <p class="text-sm text-gray-600 mb-1">평균 점수</p>
              <p class="text-2xl font-bold text-algong-green">{{ selectedStudent.averageScore }}점</p>
            </div>
            <div class="text-center p-4 bg-orange-50 rounded-lg">
              <p class="text-sm text-gray-600 mb-1">학습 상태</p>
              <div class="flex items-center justify-center gap-2">
                <div :class="['w-4 h-4 rounded-full', getStatusColor(selectedStudent.status)]"></div>
                <span class="text-sm font-medium text-gray-700">
                  {{ selectedStudent.status === 'green' ? '정상' : selectedStudent.status === 'orange' ? '주의' : '관리필요' }}
                </span>
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-500 text-center">
            최근 7일간의 데이터입니다
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 스크롤바 스타일링 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
