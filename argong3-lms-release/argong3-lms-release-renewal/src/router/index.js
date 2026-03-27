import { createRouter, createWebHistory } from 'vue-router'
import Seperate from '../views/common/SeperateView.vue'
import Login from '../views/common/LoginView.vue'
import Dashboard from '../views/common/DashboardView.vue'

// 설정
import Setting from '../views/settings/SettingsMainView.vue'

// 학습현황
import StatusMain from '../views/learning_status/LearningStatusMainView.vue'
import StatusDetail from '../views/learning_status/LearningStatusDetailView.vue'
import Activity from '../views/learning_status/detail/ActivityView.vue'
import AIPron from '../views/learning_status/detail/AIPronEvaluationView.vue'
import AISpeech from '../views/learning_status/detail/AISpeechView.vue'
import TeacherMission from '../views/learning_status/detail/TeacherMissionView.vue'

// 수업설정
import Conversation from '../views/class_settings/ConversationSettingView.vue'

// 수업보기
//import ClassView from '../views/view_class/ViewClassView.vue'
import store from '../store/index'

import LibraryHome from '../components/e-library/LibraryHome.vue'

import whaleLoginComponent from '../views/common/whaleLoginComponent.vue'
import coolSchoolLoginComponent from '../views/common/coolSchoolLoginComponent.vue'

import BookReader from '../components/e-library/readerComponent.vue'

import learningMainView from '../views/subjectRoute/learningMainView.vue'
import learningDetailView from '../views/subjectRoute/learningDetailView.vue'
import classSetttingView from '../views/subjectRoute/classSetttingView.vue'
import classView from '../views/subjectRoute/classView.vue'

import LearningStatusDetailView from '../views/learning_status/LearningStatusDetailView.vue'
import LearningStatusDetailView2 from '../views/_mathPage/LearningStatusDetailView.vue'
import ChathessLoginComponent from '../views/common/chathessLoginComponent.vue'
import SmartreeHome from '../views/smartree/smartreeHome.vue'
import LessonContents from '../components/smartree/lessonContents.vue'
import ReviewContents from '../components/smartree/reviewContents.vue'
import SmartreeViewer from '../components/smartree/smartreeViewer.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Seperate
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // 대시보드
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      auth: true
    }
  },
  // 설정
  {
    path: '/setting',
    name: 'setting',
    component: Setting,
    meta: {
      auth: true
    }
  },
  // 학습현황
  {
    path: '/learning/status',
    name: 'status',
    component: learningMainView,
    meta: {
      auth: true
    }
  },
  {
    path: '/learning/:userId/:lesson',
    name: 'status-detail',
    component: LearningStatusDetailView,
    meta: {
      auth: true
    }
  },
  {
    path: '/math/learning/:userId/:semester/:lesson',
    name: 'status-detail-math',
    component: LearningStatusDetailView2,
    meta: {
      auth: true
    }
  },
  {
    path: '/learning/:userId/:lesson/activity',
    name: 'student-account',
    component: Activity,
    meta: {
      auth: true
    }
  },
  {
    path: '/learning/:userId/:lesson/ai-pron',
    name: 'ai-pron',
    component: AIPron,
    meta: {
      auth: true
    }
  },
  {
    path: '/learning/:userId/:lesson/ai-speech',
    name: 'ai-speech',
    component: AISpeech,
    meta: {
      auth: true
    }
  },
  {
    path: '/learning/:userId/:lesson/teacher-mission',
    name: 'teacher-mission',
    component: TeacherMission,
    meta: {
      auth: true
    }
  },
  // 수업설정
  {
    path: '/class/setting',
    name: 'conversation',
    component: classSetttingView,
    meta: {
      auth: true
    },
    children: [
      {
        path: '',
        name: 'default-setting',
        redirect: { name: 'list' }
      },
      {
        path: 'list',
        name: 'list',
        component: Conversation
      },
      {
        path: 'lesson',
        name: 'lesson',
        component: Conversation
      },
      {
        path: 'gpt',
        name: 'gpt',
        component: Conversation
      },
      {
        path: 'student/:id',
        name: 'student-detail',
        component: Conversation
      }
    ]
  },
  // 수업보기
  {
    path: '/view-class/main',
    name: 'view-main',
    component: classView,
    meta: {
      auth: true
    }
  },
  {
    path: '/e-library',
    name: 'e-library',
    component: LibraryHome,
    meta: {
      auth: true
    }
  },
  {
    path: '/smartree',
    name: 'smartree-home',
    component: SmartreeHome,
    meta: {
      auth: true
    },
    children: [
      {
        path: '',
        name: 'default-setting',
        redirect: { name: 'contents/1' }
      },
      {
        path: 'contents/:unit',
        name: 'contents',
        component: LessonContents
      },
      {
        path: 'review/:unit',
        name: 'review',
        component: ReviewContents
      }
    ]
  },
  {
    path: '/smartree-viewer',
    name: 'smartree-viewer',
    component: SmartreeViewer
  },
  {
    path: '/e-book-reader',
    name: 'e-book-reader',
    component: BookReader,
    meta: {
      auth: true
    }
  },
  {
    // path: '/account-setting',
    // name: 'accountSetting',
    // component: teacherSetting
    // meta: {
    //   auth: true
    // }
  },
  {
    path: '/whale/:code',
    name: 'whalelogin',
    component: whaleLoginComponent
  },
  {
    path: '/coolschool/:key',
    name: 'coolSchoolLogin',
    component: coolSchoolLoginComponent
  },
  {
    path: '/chathess',
    name: 'chathessLogin',
    component: ChathessLoginComponent
  },
  {
    path: '/classsetting/mission/edit/:id',
    name: 'MissionEdit',
    component: () => import('@/views/classsetting/MissionEdit.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/agreement/:info',
    name: 'Agreement',
    component: () => import('@/views/common/agree2.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from) {
    if (
      to.params.userId &&
      to.params.lesson &&
      from.params.userId &&
      from.params.lesson
    ) {
      return
    }
    return { top: 0 }
  },
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.logCheck) {
    next('/login')
    return
  }
  store.state.previousRoute = to
  next()
})

export default router
