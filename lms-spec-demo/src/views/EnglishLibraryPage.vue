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
  level: number
  coverColor: string
  quizScore?: number
  readCount: number
}

// 학생 목록 (신호등 상태 포함)
const students = ref<Student[]>([
  { id: 1, name: '김민수', booksRead: 12, averageScore: 92, status: 'green' },
  { id: 2, name: '이지은', booksRead: 10, averageScore: 88, status: 'green' },
  { id: 3, name: '박준호', booksRead: 7, averageScore: 75, status: 'orange' },
  { id: 4, name: '최서연', booksRead: 15, averageScore: 95, status: 'green' },
  { id: 5, name: '정현우', booksRead: 4, averageScore: 65, status: 'red' },
  { id: 6, name: '강소영', booksRead: 11, averageScore: 89, status: 'green' },
  { id: 7, name: '윤도현', booksRead: 6, averageScore: 70, status: 'orange' },
  { id: 8, name: '임수진', booksRead: 13, averageScore: 93, status: 'green' },
  { id: 9, name: '한지훈', booksRead: 3, averageScore: 60, status: 'red' },
  { id: 10, name: '오나은', booksRead: 9, averageScore: 87, status: 'green' },
])

// 선택된 학생
const selectedStudent = ref<Student | null>(null)

// 인기 도서 Top 3
const topBooks = [
  { title: 'The Cat in the Hat', author: 'Dr. Seuss', level: 3, readCount: 18 },
  { title: 'Green Eggs and Ham', author: 'Dr. Seuss', level: 2, readCount: 15 },
  { title: 'Where the Wild Things Are', author: 'Maurice Sendak', level: 4, readCount: 12 },
]

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

// 레벨별 도서 목록 (더미)
const booksByLevel = ref<Book[]>([
  { id: 1, title: 'The Cat in the Hat', level: 3, coverColor: 'from-red-400 to-pink-500', quizScore: 95, readCount: 18 },
  { id: 2, title: 'Green Eggs and Ham', level: 2, coverColor: 'from-green-400 to-emerald-500', quizScore: 88, readCount: 15 },
  { id: 3, title: 'Where the Wild Things Are', level: 4, coverColor: 'from-blue-400 to-indigo-500', quizScore: 92, readCount: 12 },
  { id: 4, title: 'The Very Hungry Caterpillar', level: 2, coverColor: 'from-yellow-400 to-orange-500', quizScore: 90, readCount: 14 },
  { id: 5, title: 'Brown Bear, Brown Bear', level: 1, coverColor: 'from-amber-400 to-red-500', quizScore: 85, readCount: 16 },
  { id: 6, title: 'Goodnight Moon', level: 1, coverColor: 'from-purple-400 to-pink-500', quizScore: 87, readCount: 13 },
  { id: 7, title: 'The Giving Tree', level: 5, coverColor: 'from-green-500 to-teal-500', quizScore: 93, readCount: 10 },
  { id: 8, title: 'Charlotte\'s Web', level: 6, coverColor: 'from-gray-400 to-slate-500', quizScore: 91, readCount: 8 },
])

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

    <!-- 메인 레이아웃: 왼쪽 학생 목록 + 오른쪽 대시보드 -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- 왼쪽: 학생 목록 -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow p-4 sticky top-20">
          <h2 class="text-sm font-semibold text-gray-800 mb-3">학생 목록</h2>
          <div class="space-y-2 max-h-[600px] overflow-y-auto">
            <button
              v-for="student in students"
              :key="student.id"
              @click="selectStudent(student)"
              :class="[
                'w-full flex items-center justify-between p-3 rounded-lg transition-all text-left',
                selectedStudent?.id === student.id
                  ? 'bg-blue-50 border-2 border-algong-blue'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              ]"
            >
              <div class="flex items-center gap-2">
                <div :class="['w-3 h-3 rounded-full', getStatusColor(student.status)]"></div>
                <span class="text-sm font-medium text-gray-900">{{ student.name }}</span>
              </div>
              <span class="text-xs text-gray-500">{{ student.booksRead }}권</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 오른쪽: 대시보드 -->
      <div class="lg:col-span-3 space-y-6">
        <!-- 우리반 독서 정보 대시보드 -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
          <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-2xl">📚</span>
            우리반 독서 정보
          </h2>

          <!-- 인기 도서 Top 3 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div
              v-for="(book, index) in topBooks"
              :key="index"
              class="bg-white rounded-lg p-4 shadow-sm"
            >
              <div class="flex items-start justify-between mb-2">
                <span class="text-2xl font-bold text-algong-blue">{{ index + 1 }}</span>
                <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Lv.{{ book.level }}
                </span>
              </div>
              <h3 class="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">{{ book.title }}</h3>
              <p class="text-xs text-gray-500 mb-2">{{ book.author }}</p>
              <div class="flex items-center gap-1 text-xs text-gray-600">
                <span>👥</span>
                <span>{{ book.readCount }}명 읽음</span>
              </div>
            </div>
          </div>

          <!-- 전체 독서 활동 -->
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-white rounded-lg p-4 text-center shadow-sm">
              <p class="text-xs text-gray-600 mb-1">개별 평균</p>
              <p class="text-2xl font-bold text-algong-blue">{{ readingStats.averageBooksPerStudent }}권</p>
            </div>
            <div class="bg-white rounded-lg p-4 text-center shadow-sm">
              <p class="text-xs text-gray-600 mb-1">누적 독서</p>
              <p class="text-2xl font-bold text-algong-green">{{ readingStats.totalBooks }}권</p>
            </div>
            <div class="bg-white rounded-lg p-4 text-center shadow-sm">
              <p class="text-xs text-gray-600 mb-1">총 발화 문장</p>
              <p class="text-2xl font-bold text-algong-orange">{{ readingStats.totalSentences }}</p>
            </div>
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
              <span class="text-xl">🏆</span>
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

        <!-- 레벨별 독서 현황 (교과서 연계 독서활동 대체) -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">레벨별 독서 현황</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div
              v-for="level in 12"
              :key="level"
              class="text-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <p class="text-sm font-medium text-gray-700 mb-2">Level {{ level }}</p>
              <p class="text-2xl font-bold text-algong-blue">{{ Math.floor(Math.random() * 10) + 5 }}</p>
              <p class="text-xs text-gray-500 mt-1">권 읽음</p>
            </div>
          </div>
        </div>

        <!-- 도서 탐색 섹션 -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800">도서 탐색</h3>
            <button class="text-sm text-algong-blue hover:underline">전체보기 →</button>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            <div
              v-for="book in booksByLevel"
              :key="book.id"
              class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <!-- 도서 표지 (더미) -->
              <div :class="['aspect-[3/4] bg-gradient-to-br flex items-center justify-center', book.coverColor]">
                <span class="text-white text-5xl">📖</span>
              </div>
              <!-- 도서 정보 -->
              <div class="p-3">
                <h4 class="font-medium text-sm text-gray-900 mb-1 line-clamp-2">{{ book.title }}</h4>
                <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>Level {{ book.level }}</span>
                  <span>👥 {{ book.readCount }}</span>
                </div>
                <div v-if="book.quizScore" class="flex items-center justify-between">
                  <span class="text-xs text-gray-600">퀴즈 평균</span>
                  <span class="text-sm font-semibold text-algong-green">{{ book.quizScore }}점</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 선택된 학생의 독서 현황 -->
        <div v-if="selectedStudent" class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
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
