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
import { students as studentsData, getStatusColor as getStatusColorHelper, type Student } from '@/data/students'

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

// 도서 데이터 타입
interface Book {
  id: number
  title: string
  author: string
  level: string // 'K', 'Starter', '1', '2', '3', '4', '5'
  coverColor: string
  readCount: number
}

// 학생 목록 (공유 데이터 import)
const students = ref<Student[]>([...studentsData])

// 좌측 사이드바 뷰 모드
type ViewMode = 'class' | 'book'
const viewMode = ref<ViewMode>('class')

// 선택된 학생
const selectedStudent = ref<Student | null>(null)

// Top 3 인기 도서 기간 필터
type PeriodFilter = 'weekly' | 'total'
const periodFilter = ref<PeriodFilter>('weekly')

// 인기 도서 Top 3 (주간/전체)
const weeklyTopBooks = [
  { id: 1, title: 'The Cat in the Hat', author: 'Dr. Seuss', level: '3', coverColor: 'from-red-400 to-pink-500', readCount: 18 },
  { id: 2, title: 'Green Eggs and Ham', author: 'Dr. Seuss', level: '2', coverColor: 'from-green-400 to-emerald-500', readCount: 15 },
  { id: 3, title: 'Where the Wild Things Are', author: 'Maurice Sendak', level: '4', coverColor: 'from-blue-400 to-indigo-500', readCount: 12 },
]

const totalTopBooks = [
  { id: 1, title: 'Charlotte\'s Web', author: 'E.B. White', level: '5', coverColor: 'from-gray-400 to-slate-500', readCount: 45 },
  { id: 2, title: 'The Giving Tree', author: 'Shel Silverstein', level: '4', coverColor: 'from-green-500 to-teal-500', readCount: 38 },
  { id: 3, title: 'The Cat in the Hat', author: 'Dr. Seuss', level: '3', coverColor: 'from-red-400 to-pink-500', readCount: 32 },
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
    .sort((a, b) => b.readingBooks - a.readingBooks)
    .slice(0, 5)
)

// 주간 독서 랭킹 기준 날짜 (동적 생성)
const getWeeklyRankingPeriod = () => {
  const today = new Date()
  const dayOfWeek = today.getDay() // 0(일) ~ 6(토)
  const monday = new Date(today)
  monday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const days = ['일', '월', '화', '수', '목', '금', '토']
    const dayName = days[date.getDay()]
    return `${month}/${day}(${dayName})`
  }

  return `${formatDate(monday)}~${formatDate(sunday)}`
}

// 레벨별 독서 현황 (가로 진행률 바 형태)
const levelReadingStats = [
  { level: 1, read: 12, total: 15 },
  { level: 2, read: 18, total: 20 },
  { level: 3, read: 14, total: 18 },
  { level: 4, read: 8, total: 16 },
  { level: 5, read: 5, total: 14 },
  { level: 6, read: 3, total: 12 },
  { level: 7, read: 7, total: 15 },
  { level: 8, read: 4, total: 13 },
  { level: 9, read: 2, total: 10 },
  { level: 10, read: 1, total: 8 },
  { level: 11, read: 0, total: 6 },
  { level: 12, read: 0, total: 5 },
]

// 전체 도서 더미 데이터 (40~50권)
const allBooks = ref<Book[]>([
  // Level K (5권)
  { id: 1, title: 'ABC Fun', author: 'Kids Press', level: 'K', coverColor: 'from-pink-300 to-pink-400', readCount: 25 },
  { id: 2, title: 'Colors Around Us', author: 'Learning Co.', level: 'K', coverColor: 'from-purple-300 to-purple-400', readCount: 23 },
  { id: 3, title: 'My First Words', author: 'Baby Books', level: 'K', coverColor: 'from-yellow-300 to-yellow-400', readCount: 20 },
  { id: 4, title: 'Numbers 1-10', author: 'Kids Press', level: 'K', coverColor: 'from-green-300 to-green-400', readCount: 18 },
  { id: 5, title: 'Shapes We See', author: 'Learning Co.', level: 'K', coverColor: 'from-blue-300 to-blue-400', readCount: 15 },

  // Starter (8권)
  { id: 6, title: 'Brown Bear, Brown Bear', author: 'Bill Martin Jr.', level: 'Starter', coverColor: 'from-amber-400 to-red-500', readCount: 30 },
  { id: 7, title: 'Goodnight Moon', author: 'Margaret Wise Brown', level: 'Starter', coverColor: 'from-indigo-400 to-purple-500', readCount: 28 },
  { id: 8, title: 'The Very Hungry Caterpillar', author: 'Eric Carle', level: 'Starter', coverColor: 'from-green-400 to-emerald-500', readCount: 26 },
  { id: 9, title: 'Chicka Chicka Boom Boom', author: 'Bill Martin Jr.', level: 'Starter', coverColor: 'from-red-400 to-orange-500', readCount: 24 },
  { id: 10, title: 'If You Give a Mouse a Cookie', author: 'Laura Numeroff', level: 'Starter', coverColor: 'from-yellow-400 to-amber-500', readCount: 22 },
  { id: 11, title: 'Where Is Baby\'s Belly Button?', author: 'Karen Katz', level: 'Starter', coverColor: 'from-pink-400 to-rose-500', readCount: 20 },
  { id: 12, title: 'Dear Zoo', author: 'Rod Campbell', level: 'Starter', coverColor: 'from-teal-400 to-cyan-500', readCount: 18 },
  { id: 13, title: 'Spot\'s First Walk', author: 'Eric Hill', level: 'Starter', coverColor: 'from-blue-400 to-indigo-500', readCount: 16 },

  // Level 1 (10권)
  { id: 14, title: 'Green Eggs and Ham', author: 'Dr. Seuss', level: '1', coverColor: 'from-green-400 to-emerald-500', readCount: 35 },
  { id: 15, title: 'The Cat in the Hat', author: 'Dr. Seuss', level: '1', coverColor: 'from-red-400 to-pink-500', readCount: 32 },
  { id: 16, title: 'Hop on Pop', author: 'Dr. Seuss', level: '1', coverColor: 'from-orange-400 to-red-500', readCount: 28 },
  { id: 17, title: 'One Fish Two Fish', author: 'Dr. Seuss', level: '1', coverColor: 'from-blue-400 to-cyan-500', readCount: 25 },
  { id: 18, title: 'Fox in Socks', author: 'Dr. Seuss', level: '1', coverColor: 'from-yellow-400 to-orange-500', readCount: 22 },
  { id: 19, title: 'Are You My Mother?', author: 'P.D. Eastman', level: '1', coverColor: 'from-pink-400 to-purple-500', readCount: 20 },
  { id: 20, title: 'Go, Dog. Go!', author: 'P.D. Eastman', level: '1', coverColor: 'from-teal-400 to-green-500', readCount: 18 },
  { id: 21, title: 'Put Me in the Zoo', author: 'Robert Lopshire', level: '1', coverColor: 'from-purple-400 to-indigo-500', readCount: 16 },
  { id: 22, title: 'The Foot Book', author: 'Dr. Seuss', level: '1', coverColor: 'from-lime-400 to-green-500', readCount: 14 },
  { id: 23, title: 'Mr. Brown Can Moo!', author: 'Dr. Seuss', level: '1', coverColor: 'from-amber-400 to-orange-500', readCount: 12 },

  // Level 2 (8권)
  { id: 24, title: 'Frog and Toad Are Friends', author: 'Arnold Lobel', level: '2', coverColor: 'from-green-500 to-emerald-600', readCount: 30 },
  { id: 25, title: 'Little Bear', author: 'Else Holmelund Minarik', level: '2', coverColor: 'from-amber-500 to-brown-600', readCount: 28 },
  { id: 26, title: 'Danny and the Dinosaur', author: 'Syd Hoff', level: '2', coverColor: 'from-blue-500 to-indigo-600', readCount: 25 },
  { id: 27, title: 'Amelia Bedelia', author: 'Peggy Parish', level: '2', coverColor: 'from-pink-500 to-rose-600', readCount: 22 },
  { id: 28, title: 'Henry and Mudge', author: 'Cynthia Rylant', level: '2', coverColor: 'from-orange-500 to-red-600', readCount: 20 },
  { id: 29, title: 'Nate the Great', author: 'Marjorie Weinman Sharmat', level: '2', coverColor: 'from-yellow-500 to-amber-600', readCount: 18 },
  { id: 30, title: 'The Berenstain Bears', author: 'Stan & Jan Berenstain', level: '2', coverColor: 'from-green-500 to-teal-600', readCount: 16 },
  { id: 31, title: 'Clifford the Big Red Dog', author: 'Norman Bridwell', level: '2', coverColor: 'from-red-500 to-pink-600', readCount: 14 },

  // Level 3 (6권)
  { id: 32, title: 'Magic Tree House #1', author: 'Mary Pope Osborne', level: '3', coverColor: 'from-green-600 to-emerald-700', readCount: 35 },
  { id: 33, title: 'Where the Wild Things Are', author: 'Maurice Sendak', level: '3', coverColor: 'from-blue-600 to-indigo-700', readCount: 32 },
  { id: 34, title: 'Stuart Little', author: 'E.B. White', level: '3', coverColor: 'from-gray-600 to-slate-700', readCount: 28 },
  { id: 35, title: 'The Lion, the Witch and the Wardrobe', author: 'C.S. Lewis', level: '3', coverColor: 'from-amber-600 to-orange-700', readCount: 25 },
  { id: 36, title: 'Junie B. Jones', author: 'Barbara Park', level: '3', coverColor: 'from-pink-600 to-rose-700', readCount: 22 },
  { id: 37, title: 'Diary of a Wimpy Kid', author: 'Jeff Kinney', level: '3', coverColor: 'from-cyan-600 to-blue-700', readCount: 20 },

  // Level 4 (5권)
  { id: 38, title: 'The Giving Tree', author: 'Shel Silverstein', level: '4', coverColor: 'from-green-700 to-emerald-800', readCount: 38 },
  { id: 39, title: 'Charlotte\'s Web', author: 'E.B. White', level: '4', coverColor: 'from-gray-700 to-slate-800', readCount: 35 },
  { id: 40, title: 'James and the Giant Peach', author: 'Roald Dahl', level: '4', coverColor: 'from-orange-700 to-red-800', readCount: 30 },
  { id: 41, title: 'Charlie and the Chocolate Factory', author: 'Roald Dahl', level: '4', coverColor: 'from-purple-700 to-indigo-800', readCount: 28 },
  { id: 42, title: 'The BFG', author: 'Roald Dahl', level: '4', coverColor: 'from-yellow-700 to-amber-800', readCount: 25 },

  // Level 5 (5권)
  { id: 43, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', level: '5', coverColor: 'from-red-800 to-rose-900', readCount: 45 },
  { id: 44, title: 'The Secret Garden', author: 'Frances Hodgson Burnett', level: '5', coverColor: 'from-green-800 to-emerald-900', readCount: 40 },
  { id: 45, title: 'Matilda', author: 'Roald Dahl', level: '5', coverColor: 'from-blue-800 to-indigo-900', readCount: 35 },
  { id: 46, title: 'Bridge to Terabithia', author: 'Katherine Paterson', level: '5', coverColor: 'from-teal-800 to-cyan-900', readCount: 32 },
  { id: 47, title: 'The Chronicles of Narnia', author: 'C.S. Lewis', level: '5', coverColor: 'from-amber-800 to-orange-900', readCount: 30 },
])

// 도서별 상세정보 - Level 필터
type LevelFilter = 'All' | 'K' | 'Starter' | '1' | '2' | '3' | '4' | '5'
const selectedLevel = ref<LevelFilter>('All')

// 도서 검색
const searchQuery = ref('')

// 페이지네이션
const currentPage = ref(1)
const itemsPerPage = 10 // 한 페이지에 10권 (2줄 × 5권)

// 필터링된 도서 목록
const filteredBooks = computed(() => {
  let books = allBooks.value

  // Level 필터
  if (selectedLevel.value !== 'All') {
    books = books.filter(book => book.level === selectedLevel.value)
  }

  // 검색 필터
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    books = books.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    )
  }

  return books
})

// 페이지네이션 적용된 도서 목록
const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredBooks.value.slice(start, end)
})

// 전체 페이지 수
const totalPages = computed(() =>
  Math.ceil(filteredBooks.value.length / itemsPerPage)
)

// 페이지 변경
const changePage = (page: number) => {
  currentPage.value = page
}

// 검색 실행
const handleSearch = () => {
  currentPage.value = 1 // 검색 시 첫 페이지로 이동
}

// Level 필터 변경
const changeLevel = (level: LevelFilter) => {
  selectedLevel.value = level
  currentPage.value = 1 // 필터 변경 시 첫 페이지로 이동
}

// 신호등 색상 (import한 함수 사용)
const getStatusColor = getStatusColorHelper

// 학생 선택
const selectStudent = (student: Student) => {
  selectedStudent.value = student
}

// 학생 번호 포맷
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
      <!-- 좌측 사이드바 -->
      <div class="lg:col-span-1 space-y-4">
        <!-- 도서 설정 섹션 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="p-4 border-b border-gray-200 bg-gray-50">
            <h3 class="text-sm font-semibold text-gray-700">도서 설정</h3>
          </div>
          <div class="p-2">
            <button
              @click="viewMode = 'class'"
              :class="[
                'w-full py-2.5 px-4 text-sm font-medium rounded-lg mb-2 transition-all text-left',
                viewMode === 'class'
                  ? 'bg-algong-blue text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              ]"
            >
              우리반 독서정보
            </button>
            <button
              @click="viewMode = 'book'"
              :class="[
                'w-full py-2.5 px-4 text-sm font-medium rounded-lg transition-all text-left',
                viewMode === 'book'
                  ? 'bg-algong-blue text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              ]"
            >
              도서별 상세정보
            </button>
          </div>
        </div>

        <!-- 학생 독서 현황 섹션 -->
        <div class="bg-white rounded-lg shadow overflow-hidden sticky top-20">
          <div class="p-4 border-b border-gray-200 bg-gray-50">
            <h3 class="text-sm font-semibold text-gray-700">학생 독서 현황</h3>
          </div>
          <div class="p-4">
            <div class="space-y-2 max-h-[500px] overflow-y-auto">
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
                <span class="text-xs text-gray-500">{{ student.readingBooks }}권</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 오른쪽 대시보드 -->
      <div class="lg:col-span-3">
        <!-- 우리반 독서정보 뷰 -->
        <div v-if="viewMode === 'class'" class="space-y-6">
          <!-- 제목 -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-1">우리반 독서 정보</h2>
            <p class="text-sm text-gray-500">전체 학생의 독서 활동 통계를 확인하세요</p>
          </div>

          <!-- Top 3 인기 도서 -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span class="text-2xl">🏆</span>
                인기 도서 Top 3
              </h3>
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
                <h4 class="font-semibold text-sm text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem]">{{ book.title }}</h4>
                <p class="text-xs text-gray-500 mb-3">{{ book.author }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-1 text-xs text-gray-600">
                    <span>👥</span>
                    <span>{{ book.readCount }}명</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 전체 독서 활동 카드 3개 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white rounded-lg shadow p-6 text-center">
              <p class="text-sm text-gray-600 mb-2">개별 평균</p>
              <p class="text-3xl font-bold text-algong-blue">{{ readingStats.averageBooksPerStudent }}권</p>
              <p class="text-xs text-gray-500 mt-1">학생 1인당</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6 text-center">
              <p class="text-sm text-gray-600 mb-2">반 누적</p>
              <p class="text-3xl font-bold text-algong-green">{{ readingStats.totalBooks }}권</p>
              <p class="text-xs text-gray-500 mt-1">전체 학생 합계</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6 text-center">
              <p class="text-sm text-gray-600 mb-2">총 발화 문장</p>
              <p class="text-3xl font-bold text-algong-orange">{{ readingStats.totalSentences }}</p>
              <p class="text-xs text-gray-500 mt-1">읽은 문장 수</p>
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
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <span class="text-xl">📊</span>
                  주간 독서 랭킹 Top 5
                </h3>
                <span class="text-xs text-gray-500">기준: {{ getWeeklyRankingPeriod() }}</span>
              </div>
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
                    <td class="px-4 py-3 text-sm text-center text-gray-900">{{ student.readingBooks }}권</td>
                    <td class="px-4 py-3 text-sm text-center text-gray-900">{{ student.accuracy }}점</td>
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

          <!-- 레벨별 독서 현황 (가로 진행률 바) -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">레벨별 독서 현황</h3>
            <div class="space-y-3">
              <div
                v-for="stat in levelReadingStats"
                :key="stat.level"
                class="flex items-center gap-4"
              >
                <div class="w-20 text-sm font-medium text-gray-700">
                  Level {{ stat.level }}
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-3">
                    <div class="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div
                        class="h-full bg-gradient-to-r from-algong-blue to-blue-400 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                        :style="{ width: `${(stat.read / stat.total) * 100}%` }"
                      >
                        <span v-if="stat.read > 0" class="text-xs font-medium text-white">
                          {{ stat.read }}권
                        </span>
                      </div>
                    </div>
                    <div class="w-16 text-sm text-gray-600 text-right">
                      {{ stat.read }}/{{ stat.total }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 선택된 학생의 독서 현황 -->
          <div v-if="selectedStudent" class="bg-white rounded-lg shadow p-6 border-2 border-algong-blue">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span class="text-xl">👤</span>
              {{ selectedStudent.name }} 학생의 독서 현황
            </h3>
            <div class="grid grid-cols-3 gap-4">
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <p class="text-sm text-gray-600 mb-1">읽은 책</p>
                <p class="text-2xl font-bold text-algong-blue">{{ selectedStudent.readingBooks }}권</p>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <p class="text-sm text-gray-600 mb-1">평균 점수</p>
                <p class="text-2xl font-bold text-algong-green">{{ selectedStudent.accuracy }}점</p>
              </div>
              <div class="text-center p-4 bg-orange-50 rounded-lg">
                <p class="text-sm text-gray-600 mb-1">학습 상태</p>
                <div class="flex items-center justify-center gap-2 mt-1">
                  <div :class="['w-4 h-4 rounded-full', getStatusColor(selectedStudent.status)]"></div>
                  <span class="text-sm font-medium text-gray-700">
                    {{ selectedStudent.status === 'green' ? '정상' : selectedStudent.status === 'orange' ? '주의' : '관리필요' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 도서별 상세정보 뷰 -->
        <div v-else class="space-y-6">
          <!-- 제목 -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold text-gray-800">도서 설정 > 도서 열람</h2>
          </div>

          <!-- 탭 (교과연계 도서는 주석 처리) -->
          <div class="bg-white rounded-lg shadow">
            <div class="border-b border-gray-200">
              <!-- <button class="px-6 py-3 text-sm font-medium text-gray-400 border-b-2 border-transparent">
                교과연계 도서
              </button> -->
              <button class="px-6 py-3 text-sm font-medium text-algong-blue border-b-2 border-algong-blue">
                전체 도서
              </button>
            </div>

            <!-- 전체 도서 탭 내용 -->
            <div class="p-6 space-y-6">
              <!-- Level 필터 + 검색 -->
              <div class="space-y-4">
                <!-- Level 필터 버튼 -->
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-sm font-medium text-gray-700 mr-2">Level:</span>
                  <button
                    v-for="level in ['All', 'K', 'Starter', '1', '2', '3', '4', '5']"
                    :key="level"
                    @click="changeLevel(level as LevelFilter)"
                    :class="[
                      'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                      selectedLevel === level
                        ? 'bg-algong-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    ]"
                  >
                    {{ level === 'All' ? 'All' : level === 'K' ? 'Level K' : level === 'Starter' ? 'Starter' : `Level ${level}` }}
                  </button>
                </div>

                <!-- 검색 입력창 -->
                <div class="flex gap-2">
                  <input
                    v-model="searchQuery"
                    @keyup.enter="handleSearch"
                    type="text"
                    placeholder="책 이름 검색..."
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-algong-blue focus:border-transparent"
                  />
                  <button
                    @click="handleSearch"
                    class="px-6 py-2 bg-algong-blue text-white rounded-lg hover:bg-algong-button transition-colors"
                  >
                    검색
                  </button>
                </div>
              </div>

              <!-- 책장 (shelf) 형태 -->
              <div class="space-y-8">
                <!-- 책 나열 (한 줄에 5권씩) -->
                <div
                  v-for="row in Math.ceil(paginatedBooks.length / 5)"
                  :key="row"
                  class="relative"
                >
                  <!-- 책들 -->
                  <div class="grid grid-cols-5 gap-4 pb-2">
                    <div
                      v-for="book in paginatedBooks.slice((row - 1) * 5, row * 5)"
                      :key="book.id"
                      class="flex flex-col items-center"
                    >
                      <!-- 책 표지 -->
                      <div
                        :class="[
                          'w-full aspect-[3/4] bg-gradient-to-br rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer flex items-center justify-center',
                          book.coverColor
                        ]"
                      >
                        <span class="text-white text-4xl">📚</span>
                      </div>
                      <!-- 책 정보 -->
                      <div class="mt-2 text-center w-full">
                        <h4 class="text-xs font-medium text-gray-900 line-clamp-2 mb-1">{{ book.title }}</h4>
                        <p class="text-xs text-gray-500">{{ book.author }}</p>
                        <div class="flex items-center justify-center gap-1 mt-1">
                          <span class="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">Lv.{{ book.level }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 파란색 선반 받침대 -->
                  <div class="h-3 bg-gradient-to-b from-algong-blue to-blue-600 rounded-sm shadow-md"></div>
                </div>

                <!-- 책이 없을 때 -->
                <div v-if="paginatedBooks.length === 0" class="text-center py-12">
                  <p class="text-gray-500">검색 결과가 없습니다.</p>
                </div>
              </div>

              <!-- 하단: 전체 권수 + 페이지네이션 -->
              <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                <div class="text-sm text-gray-600">
                  전체: 총 <span class="font-semibold text-algong-blue">{{ filteredBooks.length }}</span>권
                </div>

                <!-- 페이지네이션 -->
                <div v-if="totalPages > 1" class="flex items-center gap-1">
                  <button
                    v-for="page in totalPages"
                    :key="page"
                    @click="changePage(page)"
                    :class="[
                      'px-3 py-1 text-sm rounded transition-colors',
                      currentPage === page
                        ? 'bg-algong-blue text-white font-semibold'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    ]"
                  >
                    {{ page }}
                  </button>
                </div>
              </div>
            </div>
          </div>
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
