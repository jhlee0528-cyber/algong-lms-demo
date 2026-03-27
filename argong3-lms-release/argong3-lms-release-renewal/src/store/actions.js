import {
  login,
  lessonInfo,
  lessonaverageprogress,
  lessonStudentInfo,
  userInfo,
  lessonStudentDetailInfo,
  lessonSectionAverage,
  lessonChatbot,
  studenttotalinfo,
  todayclass,
  chapteraverage,
  sectionclassaverage,
  sendfeedback,
  openlessoninfo,
  openmission,
  openlesson,
  passwordinit,
  passwordchange,
  test,
  lessondetailinfo,
  restday,
  lastdaylist,
  lastdaysave,
  missionlist,
  free_chat,
  modify_nickname,
  sendmessage,
  agreement,
  checkauth,
  studentmanagelog,
  classsettinglog,
  classmanagelog,
  asklog,
  studentmorelog,
  lmslogoutlog,
  guidelog,
  classlist,
  changeclass,
  getexistmission,
  maintenance,
  studenttotalinfobylesson,
  prounResult,
  prounDetail,
  lmsStudentPercentAll
} from '../api/api-list'

import {
  saveCookie,
  nonSaveCookie,
  deleteCookie,
  getSaveCookie
} from '../store/cookie'

import router from '../router/index'

import store from './index'

import { login_ko } from '../assets/translate/ko'
import { login_vt } from '../assets/translate/vt'
import { getLanguage2 } from '../api/api-list-2'

const LOGIN = async ({ commit }, loginData) => {
  store.state.loading = true
  const logind = { os: 'pc', id: loginData.id, password: loginData.password }
  const res = await login(logind)

  const langlist = {
    ko: login_ko,
    vt: login_vt
  }

  const lang = store.state.lang

  const targetlanglist = langlist[lang]

  const data = res.data.data

  store.state.loading = false

  if (data.isAgree === false) {
    const res2 = await getLanguage2(data.token)
    const language = res2.data.data
    if (language === 0) {
      window.dispatchEvent(
        new CustomEvent('goagree', {
          detail: {
            token: data.token
          }
        })
      )
      return
    }
  }

  if (data == false) {
    let errorEvent = new CustomEvent('error', {
      detail: {
        status: true,
        text: [`${targetlanglist['로그인 요청에 실패하였습니다.']}`]
      }
    })

    window.dispatchEvent(errorEvent)
    return
  } else if (data == -1) {
    let errorEvent = new CustomEvent('error', {
      detail: {
        status: true,
        text: [`${targetlanglist['아이디와 비밀번호를 정확히 입력해주세요.']}`]
      }
    })

    window.dispatchEvent(errorEvent)
    return
  } else if (data == -2) {
    let errorEvent = new CustomEvent('error', {
      detail: {
        status: true,
        text: [`${targetlanglist['아이디와 비밀번호를 정확히 입력해주세요.']}`]
      }
    })

    window.dispatchEvent(errorEvent)
    return
  } else if (data == -3) {
    let errorEvent = new CustomEvent('error', {
      detail: {
        status: true,
        text: [`${targetlanglist['계약이 만료된 계정입니다.']}`]
      }
    })

    window.dispatchEvent(errorEvent)
    return
  } else if (data == -4) {
    let errorEvent = new CustomEvent('error', {
      detail: {
        status: true,
        text: [`${targetlanglist['서버 점검중입니다.']}`]
      }
    })

    window.dispatchEvent(errorEvent)
    return
  } else if (data == -5) {
    let errorEvent = new CustomEvent('error', {
      detail: {
        status: true,
        text: [`${targetlanglist['교사 계정으로 로그인해주세요.']}`]
      }
    })

    window.dispatchEvent(errorEvent)
    return
  } else {
    sessionStorage.setItem('class_setting', 0)
    if (loginData.check) {
      store.state.token = data.token
      saveCookie('info', data.token)
    } else {
      store.state.token = data.token
      nonSaveCookie('info', data.token)
    }

    const res2 = await getLanguage2(data.token)
    const language = res2.data.data
    if (language === 0) {
      store.state.lang = 'ko'
    }

    if (language === 1) {
      store.state.lang = 'vt'
    }

    if (data.isAgree == true) {
      window.location.href = `${window.location.origin}/learning/status`
      // router.replace({ path: '/learning/status' })
    } else {
      if (language === 0) {
        //window.location.href = `${window.location.origin}/agree`
        router.replace({ path: '/agree' })
      } else {
        window.location.href = `${window.location.origin}/learning/status`
        //router.replace({ path: '/learning/status' })
      }
    }
  }
}

const USERINFO = async ({ commit }) => {
  const result = (await userInfo()).data.data
  if (result) {
    await commit('SET_PUBLISHER', result.publisher)
    return result
  }
}

const GET_CHAPTER_AVERAGE = async ({ commit }) => {
  const { data } = await chapteraverage()
  if (data) {
    await commit('SET_LINEDATA_AVERAGE', data.data)
    return data.data
  }
}

const GET_LESSON_SECTION_AVERAGE = async ({ commit }, num) => {
  const { data } = await lessonSectionAverage(num)
  if (data.data) {
    const result = [
      data.data.classWritingWordCorrectPercent || 0,
      data.data.classReadingCorrectPercent || 0,
      data.data.classListeningCorrectPercent || 0,
      data.data.classChatbotCorrectPercent || 0,
      data.data.classWritingSentenceCorrectPercent || 0
    ]
    await commit('SET_RADARDATA_AVERAGE', result)
  } else return []
}

const GET_STUDENT_TOTAL_INFO = async ({ commit }, userId) => {
  const { data } = await studenttotalinfo(userId)
  if (data.data) {
    const { totalLessonCorrectPercent, ...rest } = data.data
    return rest
  }
}

const GET_LESSON_STUDENT_DETAIL_INFO = async ({ commit }, payload) => {
  const { data } = await lessonStudentDetailInfo(payload.id, payload.lesson)
  if (data.data) {
    const chart = [
      data.data.writingWordCorrectPercent || 0,
      data.data.readingCorrectPercent || 0,
      data.data.listeningCorrectPercent || 0,
      data.data.speakingCorrectPercent || 0,
      data.data.writingSentenceCorrectPercent || 0
    ]

    await commit('SET_RADARDATA', chart)
    return data.data
  }
}

const SEND_MSG = async ({ commit }, { data, token }) => {
  await sendmessage(data, token)
  return
}

const CHECK_MSG = async ({ commit }, { data, token }) => {
  const info = await checkauth(data, token)
  if (info.data.data == true) {
    await agreement(token)
  }
  await commit('SET_CHECK_MSG', info.data)
  return info.data.data
}

const LMS_TOTAL_PERCENT_ALL = async ({ commit }, userId) => {
  const data = await lmsStudentPercentAll(userId)
  if (data) {
    await commit('SET_LINEDATA', data)
  } else return []
}

const PRON_DETAIL = async ({ commit }, payload) => {
  const data = await prounDetail(payload.userId, payload.num)

  if (data) {
    await commit('SET_PRON_RADARDATA', data)
  } else {
    await commit('SET_PRON_RADARDATA', [0, 0, 0, 0, 0])
  }
}

export {
  LOGIN,
  USERINFO,
  GET_CHAPTER_AVERAGE,
  GET_LESSON_SECTION_AVERAGE,
  GET_STUDENT_TOTAL_INFO,
  GET_LESSON_STUDENT_DETAIL_INFO,
  SEND_MSG,
  CHECK_MSG,
  LMS_TOTAL_PERCENT_ALL,
  // PRON_RESULT,
  PRON_DETAIL
}
