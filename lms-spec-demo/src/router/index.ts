import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue'),
    },
    {
      path: '/english-library',
      name: 'english-library',
      component: () => import('../views/EnglishLibraryPage.vue'),
    },
    // 추후 추가될 라우트들
    // {
    //   path: '/learning-settings',
    //   name: 'learning-settings',
    //   component: () => import('../views/LearningSettingsPage.vue'),
    // },
    // {
    //   path: '/class-view',
    //   name: 'class-view',
    //   component: () => import('../views/ClassViewPage.vue'),
    // },
  ],
})

export default router
