import { createStore } from 'vuex'
import * as actions from './actions.js'
import * as mutations from './mutations.js'
import { getSaveCookie } from './cookie.js'
import ko from 'dayjs/locale/ko.js'
import {
  getCurrentSubject2,
  getLanguage2,
  getExpireInfo
} from '../api/api-list-2.js'

async function getServerLang() {
  const token = getSaveCookie('info')
  const res = await getLanguage2(token)

  return res.data.data
}

async function getCurrentSubject() {
  try {
    const token = getSaveCookie('info')
    if (token) {
      const res = await getCurrentSubject2(token)
      return res.data.data
    } else {
      return 'eng'
    }
  } catch {
    return 'eng'
  }
}

async function getLang() {
  try {
    const token = getSaveCookie('info')
    if (token) {
      const res = await getLanguage2(token)
      const lang = res.data.data

      if (!res.data.result) {
        return 'ko'
      }

      if (lang === 0) {
        return 'ko'
      }

      if (lang === 1) {
        return 'vt'
      }

      return 'ko'
    } else {
      const lang = navigator.language || navigator.userLanguage
      if (lang.includes('vi')) {
        return 'vt'
      } else {
        return 'ko'
      }
    }
  } catch {
    return 'ko'
  }
}

async function getExpireData() {
  const token = getSaveCookie('info')

  if (token) {
    try {
      const res = await getExpireInfo(token)
      const type = res.data.data.type

      if (getSaveCookie(`expiretype${type}`)) {
        return {
          flag: false,
          type: 0,
          date: ''
        }
      } else {
        return res.data.data
      }
    } catch (error) {
      // 403 에러 등으로 getExpireInfo 실패 시 기본값 반환
      console.warn('getExpireInfo failed:', error.message)
      return {
        flag: false,
        type: 0,
        date: ''
      }
    }
  } else {
    return {
      flag: false,
      type: 0,
      date: ''
    }
  }
}

export default createStore({
  state: {
    // token: sessionStorage.getItem('token'),
    lang: await getLang(),
    token: getSaveCookie('info'),
    temp_token: getSaveCookie('info2'),
    premium: true,
    publisher: '',
    lineData: [],
    lineDataAverage: [],
    radarData: [],
    radarDataAverage: [],
    pronRadarData: [],
    detailInfo: [],
    settingpage: 1,
    isagree: false,
    iswrong: false,
    loading: false,
    bookDetailModal: false,
    selectedStudent: '',
    readerBookCode: '',
    isAgree: '',
    firstLogin: '',
    temp: '',
    studentBook: null,
    previousLesson: '',
    currentSubject: await getCurrentSubject(),
    expire: await getExpireData(),
    // 지점 관련
    currentBranch: '서울 금천구 1호점',
    branchData: {
      '서울 금천구 1호점': { total: 30, normal: 18, warning: 7, danger: 5, avgProgress: 72, participation: 85, participatingStudents: 25, totalStudents: 30, correctRate: 82, trend: 3.5, levels: [5,8,7,6,3,1] },
      '서울 강남구 2호점': { total: 45, normal: 36, warning: 7, danger: 2, avgProgress: 88, participation: 96, participatingStudents: 43, totalStudents: 45, correctRate: 92, trend: 6.8, levels: [2,4,7,12,11,9] },
      '서울 마포구 3호점': { total: 22, normal: 7, warning: 8, danger: 7, avgProgress: 52, participation: 68, participatingStudents: 15, totalStudents: 22, correctRate: 65, trend: -3.2, levels: [9,6,4,2,1,0] },
      '경기 수원시 5호점': { total: 38, normal: 22, warning: 12, danger: 4, avgProgress: 73, participation: 86, participatingStudents: 33, totalStudents: 38, correctRate: 79, trend: 4.1, levels: [4,7,9,10,6,2] },
      '부산 해운대구 9호점': { total: 35, normal: 25, warning: 8, danger: 2, avgProgress: 81, participation: 91, participatingStudents: 32, totalStudents: 35, correctRate: 86, trend: 5.3, levels: [3,5,8,10,7,2] }
    }
  },
  getters: {
    logCheck(state) {
      return state.token !== ''
    }
  },
  mutations,
  actions,
  modules: {}
})
