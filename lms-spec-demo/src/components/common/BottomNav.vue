<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

interface NavItem {
  path: string
  icon: string
  label: string
}

const navItems: NavItem[] = [
  { path: '/dashboard', icon: '🏠', label: '홈' },
  { path: '/english-library', icon: '📚', label: '도서관' },
  { path: '/grading/quick', icon: '📸', label: '채점' },
  { path: '/students', icon: '👥', label: '학생' },
  { path: '/reports/communication', icon: '📬', label: '소통' },
]

const isActive = (path: string) => {
  return route.path === path
}

const navigate = (path: string) => {
  router.push(path)
}
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 md:hidden">
    <div class="flex justify-around items-center h-16">
      <button
        v-for="item in navItems"
        :key="item.path"
        @click="navigate(item.path)"
        :class="[
          'flex flex-col items-center justify-center flex-1 h-full transition-colors',
          isActive(item.path) ? 'text-algong-blue' : 'text-gray-500'
        ]"
      >
        <span class="text-2xl mb-1">{{ item.icon }}</span>
        <span
          :class="[
            'text-xs font-medium',
            isActive(item.path) ? 'font-bold' : ''
          ]"
        >
          {{ item.label }}
        </span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
/* 모바일에서만 표시 */
@media (min-width: 768px) {
  nav {
    display: none;
  }
}

/* 터치 피드백 */
button:active {
  transform: scale(0.95);
}
</style>
