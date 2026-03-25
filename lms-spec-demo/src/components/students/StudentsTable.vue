<script setup lang="ts">
import { ref, computed } from 'vue'
import StudentDetailDrawer from './StudentDetailDrawer.vue'
import { students as studentsData, getStatusColor, getStatusLabel, type Student, type TrafficLightStatus } from '@/data/students'

// 학생 데이터 (공유 데이터 import)
const students = ref<Student[]>([...studentsData])

// 필터 상태
type FilterStatus = 'all' | 'green' | 'orange' | 'red'
const filterStatus = ref<FilterStatus>('all')

// 정렬 상태
type SortColumn = 'id' | 'name' | 'progress' | 'accuracy' | 'learningTime' | 'readingBooks' | null
type SortOrder = 'asc' | 'desc' | null
const sortColumn = ref<SortColumn>(null)
const sortOrder = ref<SortOrder>(null)

// 정렬 토글 함수
const toggleSort = (column: SortColumn) => {
  if (sortColumn.value === column) {
    // 같은 컬럼 클릭: asc → desc → null
    if (sortOrder.value === 'asc') {
      sortOrder.value = 'desc'
    } else if (sortOrder.value === 'desc') {
      sortOrder.value = null
      sortColumn.value = null
    }
  } else {
    // 다른 컬럼 클릭: asc로 시작
    sortColumn.value = column
    sortOrder.value = 'asc'
  }
}

// 필터링 및 정렬된 학생 목록
const filteredStudents = computed(() => {
  // 1. 필터링
  let filtered = students.value
  if (filterStatus.value !== 'all') {
    filtered = filtered.filter(s => s.status === filterStatus.value)
  }

  // 2. 정렬
  if (sortColumn.value && sortOrder.value) {
    filtered = [...filtered].sort((a, b) => {
      const col = sortColumn.value!
      let aVal: number | string = a[col]
      let bVal: number | string = b[col]

      // 문자열 정렬 (이름)
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder.value === 'asc'
          ? aVal.localeCompare(bVal, 'ko')
          : bVal.localeCompare(aVal, 'ko')
      }

      // 숫자 정렬
      return sortOrder.value === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number)
    })
  }

  return filtered
})

// 통계
const stats = computed(() => ({
  total: students.value.length,
  green: students.value.filter(s => s.status === 'green').length,
  orange: students.value.filter(s => s.status === 'orange').length,
  red: students.value.filter(s => s.status === 'red').length,
}))

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
const sendToStudent = (student: Student) => {
  if (confirm(`${student.name} 학생에게 발송하시겠습니까?`)) {
    alert(`${student.name} 학생에게 발송되었습니다.`)
  }
}

// 학습 상세 패널
const isDrawerOpen = ref(false)
const selectedStudent = ref<Student | null>(null)

const openDrawer = (student: Student) => {
  selectedStudent.value = student
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
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
              <!-- 번호 (정렬 가능) -->
              <th
                @click="toggleSort('id')"
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                :class="{ 'text-algong-blue': sortColumn === 'id' }"
              >
                <div class="flex items-center gap-1">
                  <span>번호</span>
                  <span class="text-xs">
                    <span v-if="sortColumn === 'id' && sortOrder === 'asc'">▲</span>
                    <span v-else-if="sortColumn === 'id' && sortOrder === 'desc'">▼</span>
                    <span v-else class="text-gray-300">▲▼</span>
                  </span>
                </div>
              </th>
              <!-- 이름 (정렬 가능) -->
              <th
                @click="toggleSort('name')"
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                :class="{ 'text-algong-blue': sortColumn === 'name' }"
              >
                <div class="flex items-center gap-1">
                  <span>이름</span>
                  <span class="text-xs">
                    <span v-if="sortColumn === 'name' && sortOrder === 'asc'">▲</span>
                    <span v-else-if="sortColumn === 'name' && sortOrder === 'desc'">▼</span>
                    <span v-else class="text-gray-300">▲▼</span>
                  </span>
                </div>
              </th>
              <!-- 상태 (정렬 불가) -->
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              <!-- 학습진행률 (정렬 가능) -->
              <th
                @click="toggleSort('progress')"
                class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                :class="{ 'text-algong-blue': sortColumn === 'progress' }"
              >
                <div class="flex items-center justify-center gap-1">
                  <span>학습진행률</span>
                  <span class="text-xs">
                    <span v-if="sortColumn === 'progress' && sortOrder === 'asc'">▲</span>
                    <span v-else-if="sortColumn === 'progress' && sortOrder === 'desc'">▼</span>
                    <span v-else class="text-gray-300">▲▼</span>
                  </span>
                </div>
              </th>
              <!-- 정답률 (정렬 가능) -->
              <th
                @click="toggleSort('accuracy')"
                class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                :class="{ 'text-algong-blue': sortColumn === 'accuracy' }"
              >
                <div class="flex items-center justify-center gap-1">
                  <span>정답률</span>
                  <span class="text-xs">
                    <span v-if="sortColumn === 'accuracy' && sortOrder === 'asc'">▲</span>
                    <span v-else-if="sortColumn === 'accuracy' && sortOrder === 'desc'">▼</span>
                    <span v-else class="text-gray-300">▲▼</span>
                  </span>
                </div>
              </th>
              <!-- 학습시간 (정렬 가능) -->
              <th
                @click="toggleSort('learningTime')"
                class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                :class="{ 'text-algong-blue': sortColumn === 'learningTime' }"
              >
                <div class="flex items-center justify-center gap-1">
                  <span>학습시간</span>
                  <span class="text-xs">
                    <span v-if="sortColumn === 'learningTime' && sortOrder === 'asc'">▲</span>
                    <span v-else-if="sortColumn === 'learningTime' && sortOrder === 'desc'">▼</span>
                    <span v-else class="text-gray-300">▲▼</span>
                  </span>
                </div>
              </th>
              <!-- 독서량 (정렬 가능) - 순서 변경됨 -->
              <th
                @click="toggleSort('readingBooks')"
                class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                :class="{ 'text-algong-blue': sortColumn === 'readingBooks' }"
              >
                <div class="flex items-center justify-center gap-1">
                  <span>독서량</span>
                  <span class="text-xs">
                    <span v-if="sortColumn === 'readingBooks' && sortOrder === 'asc'">▲</span>
                    <span v-else-if="sortColumn === 'readingBooks' && sortOrder === 'desc'">▼</span>
                    <span v-else class="text-gray-300">▲▼</span>
                  </span>
                </div>
              </th>
              <!-- 학습상세 (정렬 불가) -->
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">학습상세</th>
              <!-- 발송 (정렬 불가) -->
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
              <td class="px-4 py-3 text-center text-sm text-gray-900">{{ student.readingBooks }}권</td>
              <td class="px-4 py-3 text-center">
                <button
                  @click="openDrawer(student)"
                  class="text-algong-blue hover:text-algong-button font-medium text-sm underline"
                >
                  More
                </button>
              </td>
              <td class="px-4 py-3 text-center">
                <button
                  @click="sendToStudent(student)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-algong-blue text-algong-blue hover:bg-algong-blue hover:text-white rounded-lg transition-colors text-sm font-medium"
                  title="발송"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>발송</span>
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
            class="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-algong-blue text-algong-blue hover:bg-algong-blue hover:text-white rounded-lg transition-colors text-sm font-medium"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>발송</span>
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
            <p class="text-xs text-gray-500">독서량</p>
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

    <!-- 학습 상세 패널 -->
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
