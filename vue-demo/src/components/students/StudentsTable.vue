<script setup lang="ts">
import { ref, computed } from 'vue'
import StudentDetailDrawer from './StudentDetailDrawer.vue'

// 신호등 상태 타입
type TrafficLightStatus = 'green' | 'orange' | 'red'

interface StudentProgress {
  id: number
  name: string
  progress: number // 학습진행률 (%)
  accuracy: number // 정답률 (%)
  learningTime: number // 학습시간 (분)
  readingBooks: number // 독서 권수
  status: TrafficLightStatus
}

// 더미 데이터 (20명)
const students = ref<StudentProgress[]>([
  { id: 1, name: '김민수', progress: 85, accuracy: 92, learningTime: 245, readingBooks: 5, status: 'green' },
  { id: 2, name: '이지은', progress: 72, accuracy: 88, learningTime: 210, readingBooks: 4, status: 'green' },
  { id: 3, name: '박준호', progress: 55, accuracy: 75, learningTime: 180, readingBooks: 3, status: 'orange' },
  { id: 4, name: '최서연', progress: 91, accuracy: 95, learningTime: 280, readingBooks: 7, status: 'green' },
  { id: 5, name: '정현우', progress: 38, accuracy: 65, learningTime: 120, readingBooks: 2, status: 'red' },
  { id: 6, name: '강소영', progress: 78, accuracy: 89, learningTime: 230, readingBooks: 5, status: 'green' },
  { id: 7, name: '윤도현', progress: 45, accuracy: 70, learningTime: 150, readingBooks: 2, status: 'orange' },
  { id: 8, name: '임수진', progress: 88, accuracy: 93, learningTime: 260, readingBooks: 6, status: 'green' },
  { id: 9, name: '한지훈', progress: 32, accuracy: 60, learningTime: 95, readingBooks: 1, status: 'red' },
  { id: 10, name: '오나은', progress: 76, accuracy: 87, learningTime: 220, readingBooks: 4, status: 'green' },
  { id: 11, name: '신동욱', progress: 62, accuracy: 78, learningTime: 190, readingBooks: 3, status: 'orange' },
  { id: 12, name: '배미래', progress: 81, accuracy: 90, learningTime: 240, readingBooks: 5, status: 'green' },
  { id: 13, name: '조성민', progress: 28, accuracy: 55, learningTime: 80, readingBooks: 1, status: 'red' },
  { id: 14, name: '홍예린', progress: 93, accuracy: 96, learningTime: 290, readingBooks: 8, status: 'green' },
  { id: 15, name: '송태현', progress: 58, accuracy: 76, learningTime: 175, readingBooks: 3, status: 'orange' },
  { id: 16, name: '유하늘', progress: 74, accuracy: 86, learningTime: 215, readingBooks: 4, status: 'green' },
  { id: 17, name: '문지원', progress: 35, accuracy: 62, learningTime: 110, readingBooks: 1, status: 'red' },
  { id: 18, name: '양준혁', progress: 82, accuracy: 91, learningTime: 250, readingBooks: 6, status: 'green' },
  { id: 19, name: '백서아', progress: 67, accuracy: 82, learningTime: 200, readingBooks: 3, status: 'orange' },
  { id: 20, name: '남도윤', progress: 89, accuracy: 94, learningTime: 270, readingBooks: 7, status: 'green' },
])

// 필터 상태
type FilterStatus = 'all' | 'green' | 'orange' | 'red'
const filterStatus = ref<FilterStatus>('all')

// 필터링된 학생 목록
const filteredStudents = computed(() => {
  if (filterStatus.value === 'all') return students.value
  return students.value.filter(s => s.status === filterStatus.value)
})

// 통계
const stats = computed(() => ({
  total: students.value.length,
  green: students.value.filter(s => s.status === 'green').length,
  orange: students.value.filter(s => s.status === 'orange').length,
  red: students.value.filter(s => s.status === 'red').length,
}))

// Drawer 상태
const selectedStudent = ref<StudentProgress | null>(null)
const isDrawerOpen = ref(false)

const openDrawer = (student: StudentProgress) => {
  selectedStudent.value = student
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
  setTimeout(() => {
    selectedStudent.value = null
  }, 300)
}

// 신호등 색상
const getStatusColor = (status: TrafficLightStatus) => {
  switch (status) {
    case 'green': return 'bg-algong-green'
    case 'orange': return 'bg-algong-orange'
    case 'red': return 'bg-algong-red'
  }
}

const getStatusLabel = (status: TrafficLightStatus) => {
  switch (status) {
    case 'green': return '정상'
    case 'orange': return '주의'
    case 'red': return '관리필요'
  }
}

// 전체 발송
const sendToAll = () => {
  const count = filteredStudents.value.length
  const statusText = filterStatus.value === 'all'
    ? '전체'
    : getStatusLabel(filterStatus.value as TrafficLightStatus)

  if (confirm(`${statusText} 학생 ${count}명에게 발송하시겠습니까?`)) {
    alert(`${count}명에게 발송되었습니다.`)
  }
}

// 개별 발송
const sendToStudent = (student: StudentProgress) => {
  if (confirm(`${student.name} 학생에게 발송하시겠습니까?`)) {
    alert(`${student.name} 학생에게 발송되었습니다.`)
  }
}
</script>

<template>
  <div class="w-full space-y-4">
    <!-- 상단 필터 및 통계 -->
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white rounded-lg shadow p-4">
      <!-- 신호등 필터 버튼 -->
      <div class="flex items-center gap-2 flex-wrap">
        <button
          @click="filterStatus = 'all'"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all',
            filterStatus === 'all'
              ? 'bg-algong-blue text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          전체 <span class="ml-1 font-bold">({{ stats.total }})</span>
        </button>
        <button
          @click="filterStatus = 'green'"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
            filterStatus === 'green'
              ? 'bg-algong-green text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          <span class="w-3 h-3 rounded-full bg-algong-green"></span>
          정상 <span class="ml-1 font-bold">({{ stats.green }})</span>
        </button>
        <button
          @click="filterStatus = 'orange'"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
            filterStatus === 'orange'
              ? 'bg-algong-orange text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          <span class="w-3 h-3 rounded-full bg-algong-orange"></span>
          주의 <span class="ml-1 font-bold">({{ stats.orange }})</span>
        </button>
        <button
          @click="filterStatus = 'red'"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
            filterStatus === 'red'
              ? 'bg-algong-red text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          <span class="w-3 h-3 rounded-full bg-algong-red"></span>
          관리필요 <span class="ml-1 font-bold">({{ stats.red }})</span>
        </button>
      </div>

      <!-- 전체 발송 버튼 -->
      <button
        @click="sendToAll"
        class="btn-primary flex items-center gap-2 whitespace-nowrap"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        전체 발송
      </button>
    </div>

    <!-- 테이블 (데스크톱) -->
    <div class="hidden md:block bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">학습진행률</th>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">정답률</th>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">학습시간</th>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">학습상세</th>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">독서</th>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">발송</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="student in filteredStudents" :key="student.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-4 py-3 text-sm text-gray-900">{{ student.id }}</td>
              <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ student.name }}</td>
              <td class="px-4 py-3 text-center">
                <div class="flex items-center justify-center">
                  <div
                    :class="[
                      'w-4 h-4 rounded-full',
                      getStatusColor(student.status)
                    ]"
                    :title="getStatusLabel(student.status)"
                  ></div>
                </div>
              </td>
              <td class="px-4 py-3 text-center">
                <div class="flex flex-col items-center gap-1">
                  <span class="text-sm font-medium text-gray-900">{{ student.progress }}%</span>
                  <div class="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      class="h-1.5 rounded-full"
                      :class="getStatusColor(student.status)"
                      :style="{ width: `${student.progress}%` }"
                    ></div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-center text-sm text-gray-900">{{ student.accuracy }}%</td>
              <td class="px-4 py-3 text-center text-sm text-gray-900">{{ student.learningTime }}분</td>
              <td class="px-4 py-3 text-center">
                <button
                  @click="openDrawer(student)"
                  class="text-algong-blue hover:text-algong-button font-medium text-sm underline"
                >
                  More
                </button>
              </td>
              <td class="px-4 py-3 text-center text-sm text-gray-900">{{ student.readingBooks }}권</td>
              <td class="px-4 py-3 text-center">
                <button
                  @click="sendToStudent(student)"
                  class="p-2 text-gray-600 hover:text-algong-blue hover:bg-blue-50 rounded-lg transition-colors"
                  title="발송"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 카드 형태 (모바일) -->
    <div class="md:hidden space-y-3">
      <div
        v-for="student in filteredStudents"
        :key="student.id"
        class="bg-white rounded-lg shadow p-4 space-y-3"
      >
        <!-- 이름 및 상태 -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div
              :class="[
                'w-4 h-4 rounded-full',
                getStatusColor(student.status)
              ]"
            ></div>
            <span class="font-semibold text-gray-900">{{ student.name }}</span>
          </div>
          <button
            @click="sendToStudent(student)"
            class="p-2 text-gray-600 hover:text-algong-blue hover:bg-blue-50 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
        </div>

        <!-- 진행률 -->
        <div>
          <div class="flex items-center justify-between text-sm mb-1">
            <span class="text-gray-600">학습진행률</span>
            <span class="font-medium text-gray-900">{{ student.progress }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="h-2 rounded-full"
              :class="getStatusColor(student.status)"
              :style="{ width: `${student.progress}%` }"
            ></div>
          </div>
        </div>

        <!-- 통계 그리드 -->
        <div class="grid grid-cols-3 gap-3 text-center">
          <div>
            <p class="text-xs text-gray-500">정답률</p>
            <p class="text-sm font-semibold text-gray-900">{{ student.accuracy }}%</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">학습시간</p>
            <p class="text-sm font-semibold text-gray-900">{{ student.learningTime }}분</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">독서</p>
            <p class="text-sm font-semibold text-gray-900">{{ student.readingBooks }}권</p>
          </div>
        </div>

        <!-- More 버튼 -->
        <button
          @click="openDrawer(student)"
          class="w-full py-2 text-algong-blue hover:bg-blue-50 rounded-lg font-medium text-sm transition-colors"
        >
          학습상세 보기
        </button>
      </div>
    </div>

    <!-- 상세 Drawer -->
    <StudentDetailDrawer
      v-if="selectedStudent"
      :student="selectedStudent"
      :is-open="isDrawerOpen"
      @close="closeDrawer"
    />
  </div>
</template>

<style scoped>
/* 프로그레스 바 애니메이션 */
.h-1\.5,
.h-2 {
  transition: width 0.3s ease-in-out;
}
</style>
