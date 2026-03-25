<script setup lang="ts">
import StudentsTable from '../components/students/StudentsTable.vue'
</script>

<template>
  <div class="w-full space-y-6">
    <!-- 페이지 헤더 -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">학습현황</h1>
        <p class="text-sm text-gray-500 mt-1">학생들의 실시간 학습 진행 상황을 확인하세요</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500">마지막 업데이트:</span>
        <span class="text-sm font-medium text-gray-700">{{ new Date().toLocaleString('ko-KR') }}</span>
      </div>
    </div>

    <!-- 학습현황 테이블 -->
    <StudentsTable />
  </div>
</template>
