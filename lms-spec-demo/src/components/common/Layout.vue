<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 기관명 (localStorage 저장) - 토글 제거, 편집 가능하게 변경
const academyName = ref<string>('알공공부방')
const isEditingName = ref(false)
const nameInputRef = ref<HTMLInputElement | null>(null)

// 모달 상태
const showSettings = ref(false)
const showHelp = ref(false)

// 탭 메뉴 정의
const tabs = [
  { id: 'learning-status', label: '학습현황', path: '/', icon: '📊' },
  { id: 'e-library', label: 'e-library', path: '/english-library', icon: '📚' },
  // 주석 처리된 탭들
  // { id: 'learning-settings', label: '학습설정', path: '/learning-settings', icon: '⚙️' },
  // { id: 'class-view', label: '수업보기', path: '/class-view', icon: '👁️' },
]

// 현재 활성 탭 확인
const isActiveTab = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

// localStorage에서 기관명 불러오기
onMounted(() => {
  const saved = localStorage.getItem('academyName')
  if (saved) {
    academyName.value = saved
  }
})

// 기관명 편집 시작
const startEditingName = async () => {
  isEditingName.value = true
  await nextTick()
  if (nameInputRef.value) {
    nameInputRef.value.focus()
    nameInputRef.value.select()
  }
}

// 기관명 저장
const saveAcademyName = () => {
  const trimmed = academyName.value.trim()
  if (trimmed) {
    academyName.value = trimmed
    localStorage.setItem('academyName', trimmed)
  } else {
    // 빈 값이면 기본값으로 복원
    academyName.value = '알공공부방'
    localStorage.setItem('academyName', '알공공부방')
  }
  isEditingName.value = false
}

// Enter 키 또는 외부 클릭 시 저장
const handleNameKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    saveAcademyName()
  } else if (e.key === 'Escape') {
    // ESC 키로 취소
    const saved = localStorage.getItem('academyName')
    academyName.value = saved || '알공공부방'
    isEditingName.value = false
  }
}

// 로그아웃
const handleLogout = () => {
  if (confirm('로그아웃 하시겠습니까?')) {
    localStorage.removeItem('auth_token')
    router.push('/login')
  }
}
</script>

<template>
  <div class="min-h-screen bg-algong-bg">
    <!-- 헤더 -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div class="px-4 md:px-6">
        <!-- 상단: 로고 + 기관명 + 아이콘들 -->
        <div class="h-16 flex items-center justify-between">
          <!-- 좌측: 로고 + 원장님 LMS -->
          <div class="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="알공스마트리"
              class="h-10 w-auto"
              @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
            />
            <div class="hidden md:flex flex-col">
              <h1 class="text-lg font-bold text-gray-800 leading-tight">
                알공스마트리
              </h1>
              <span class="text-xs text-gray-500">원장님 LMS</span>
            </div>
          </div>

          <!-- 우측: 기관명 (편집 가능) + 아이콘들 -->
          <div class="flex items-center gap-4">
            <!-- 기관명 (편집 가능) -->
            <div class="hidden md:flex items-center gap-2">
              <template v-if="!isEditingName">
                <span class="text-sm font-medium text-gray-700">
                  {{ academyName }}
                </span>
                <button
                  @click="startEditingName"
                  class="p-1 text-gray-400 hover:text-algong-blue transition-colors"
                  title="기관명 편집"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </template>
              <template v-else>
                <input
                  ref="nameInputRef"
                  v-model="academyName"
                  @blur="saveAcademyName"
                  @keydown="handleNameKeydown"
                  type="text"
                  class="px-2 py-1 text-sm font-medium text-gray-700 border-2 border-algong-blue rounded focus:outline-none"
                  maxlength="20"
                />
              </template>
            </div>

            <!-- 설정 아이콘 -->
            <button
              @click="showSettings = true"
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="설정"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            <!-- 도움말 아이콘 -->
            <button
              @click="showHelp = true"
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="도움말"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            <!-- 로그아웃 아이콘 -->
            <button
              @click="handleLogout"
              class="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="로그아웃"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- 하단: 탭 메뉴 -->
        <div class="flex items-center border-t border-gray-100">
          <nav class="flex gap-1">
            <router-link
              v-for="tab in tabs"
              :key="tab.id"
              :to="tab.path"
              :class="[
                'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2',
                isActiveTab(tab.path)
                  ? 'text-algong-blue border-algong-blue'
                  : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
              ]"
            >
              <span class="text-base">{{ tab.icon }}</span>
              <span>{{ tab.label }}</span>
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- 메인 콘텐츠 -->
    <main class="p-3 md:p-6 pb-20 md:pb-6">
      <slot />
    </main>

    <!-- 설정 모달 (TODO: 추후 구현) -->
    <!-- <SettingsModal v-if="showSettings" @close="showSettings = false" /> -->

    <!-- 도움말 모달 (TODO: 추후 구현) -->
    <!-- <HelpModal v-if="showHelp" @close="showHelp = false" /> -->
  </div>
</template>

<style scoped>
/* 탭 호버 효과 */
nav a {
  position: relative;
}

nav a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: currentColor;
  transform: scaleX(0);
  transition: transform 0.2s ease-in-out;
}

nav a:hover::after {
  transform: scaleX(1);
}
</style>
