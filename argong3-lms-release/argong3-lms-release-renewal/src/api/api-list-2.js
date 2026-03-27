import axios from 'axios'
import { instance, instanceAuth } from './url'

const settingclasslist = async (data) => {
  const { grade, classNum } = data
  return await instanceAuth.get(`/lms/class-user/${grade}/${classNum}`, {
    credentials: true
  })
}

const schoolinfo = async () => {
  return await instanceAuth.get(`/lms/school`, {
    credentials: true
  })
}

const contractinfo = async () => {
  return await instanceAuth.get(`/lms/contract`, {
    credentials: true
  })
}

const classinfo = async () => {
  return await instanceAuth.get(`/lms/class-info`, {
    credentials: true
  })
}

const transferhistory = async () => {
  return await instanceAuth.get(`/lms/transfers/list`, {
    credentials: true
  })
}

const teacherinfo = async () => {
  try {
    return await instanceAuth.get(`/lms/accountinfo`, {
      credentials: true
    })
  } catch {
    return { data: { result: false } }
  }
}

const applytransfer = async (data) => {
  return await instanceAuth.post(`/lms/transfers/add`, data, {
    credentials: true
  })
}

const firemission = async (data) => {
  return await instanceAuth.post('/lms/open/teacher-mission', data, {
    credentials: true
  })
}

const openfirenewmission = async () => {
  return await instanceAuth.post('/lms/open/teacher-mission', {
    credentials: true
  })
}

const editemail = async (data) => {
  return await instanceAuth.post('/lms/edit/email', data, { credentials: true })
}

const teachermissionprogress = async (data) => {
  return await instanceAuth.post(`/mission/current/progress`, data, {
    credentials: true
  })
}

const deleteteachermission = async () => {
  return await instanceAuth.delete('lms/delete/teacher-mission')
}

const getmissionstatus = async () => {
  return await instanceAuth.get('/lms/student/mission/progresses/all', {
    credentials: true
  })
}

const getstudentslist = async () => {
  return await instanceAuth.get('/lms/student-list', {
    credentials: true
  })
}

const getgptlessonchatbotrecord = async (id, lesson) => {
  return await instanceAuth.get(`/lms/user/book/lesson/${id}/${lesson}`, {
    credentials: true
  })
}

const getstudentreadingbooks = async (id) => {
  return await instanceAuth.get(`/library/books/reading/${id}`, {
    credentials: true
  })
}

const getstudentfinishbooks = async (id) => {
  return await instanceAuth.get(`/library/books/finish/${id}`, {
    credentials: true
  })
}

const getLessonBook = async (data) => {
  return await instanceAuth.post(`/library/books/lesson`, data, {
    credentials: true
  })
}

const getAuth = async (data) => {
  return await instanceAuth.get(`/users/auth/coolschool/token/${data}`, {
    credentials: true
  })
}

const getChathessAuth = async (data) => {
  return await instanceAuth.get(`users/auth/chathess/lms/token/${data}`, {
    credentials: true
  })
}

const getSSORestrict = async (data) => {
  return await instanceAuth.get(`/lms/get/ssorestrict/${data}`, {
    credentials: true
  })
}

const getLanguage = async () => {
  return await instanceAuth.get(`/users/language`, { credentials: true })
}

const getLanguage2 = async (n) => {
  return await axios.get(`${process.env.VUE_APP_CONNECT}/users/language`, {
    credentials: true,
    headers: {
      Authorization: n
    }
  })
}

const getClassAllReadInfo = async () => {
  return await instanceAuth.get('/library/class/all/readinfo', {
    credentials: true
  })
}

const getStudentAllReadInfo = async (id) => {
  return await instanceAuth.get(`/library/student/all/readinfo/${id}`, {
    credentials: true
  })
}

const getClassMonthAllUsage = async () => {
  return await instanceAuth.get('/library/class/month/usage/all', {
    credentials: true
  })
}

const getClassMonthAverageUsage = async () => {
  return await instanceAuth.get('/library/class/month/usage/average', {
    credentials: true
  })
}

const getStudentMonthUsage = async (id) => {
  return await instanceAuth.get(`/library/user/month/usage/${id}`, {
    credentials: true
  })
}

const getClassLibraryLessonProgress = async () => {
  return await instanceAuth.get('/library/class/lesson/progress', {
    credentials: true
  })
}

const getClassQuizAverage = async () => {
  return await instanceAuth.get('/library/class/quiz/average', {
    credentials: true
  })
}

const getClassPopularBooks = async () => {
  return await instanceAuth.get('/library/book/best/all/lms', {
    credentials: true
  })
}

const getClassWeeklyPopularBooks = async () => {
  return await instanceAuth.get('/library/book/best/weekly/lms', {
    credentials: true
  })
}

const getStudentLevelProgress = async (id) => {
  return await instanceAuth.get(`/library/student/level/progress/lms/${id}`, {
    credentials: true
  })
}

const getLibraryStudentList = async () => {
  return await instanceAuth.get('/library/student/list', { credentials: true })
}

const getStudentLibraryLessonProgress = async (id) => {
  return await instanceAuth.get(`/library/student/lesson/progress/${id}`, {
    credentials: true
  })
}

const getStudentRacingResult = async (id) => {
  return await instanceAuth.get(`/library/student/quiz/average/${id}`, {
    credentials: true
  })
}

const getStudentRecentBooks = async (id) => {
  return await instanceAuth.get(`/library/student/recent/books/${id}`, {
    credentials: true
  })
}

const getReadHistoryPageLength = async (id) => {
  return await instanceAuth.get(`/library/read/history/page/length/${id}`, {
    credentials: true
  })
}

const getReadHistory = async (id, page) => {
  return await instanceAuth.get(`/library/read/history/${id}/${page}`, {
    credentials: true
  })
}

const getBookPopupSummary = async (id, bookCode) => {
  return await instanceAuth.get(
    `/library/study/detail/summary/${id}/${bookCode}`,
    {
      credentials: true
    }
  )
}

const getBookPopupDetail = async (id, bookCode, activity) => {
  return await instanceAuth.get(
    `/library/study/detail/${id}/${bookCode}/${activity}`,
    {
      credentials: true
    }
  )
}

const getBookPopupRepeatDetail = async (id, bookCode) => {
  return await instanceAuth.get(
    `/library/study/repeat/detail/${id}/${bookCode}`,
    {
      credentials: true
    }
  )
}

const getWeeklyRanking = async () => {
  return await instanceAuth.get(`/library/get/ranking/weekly/lms`, {
    credentials: true
  })
}

const getSessionFeedback = async (session) => {
  return await instanceAuth.get(`/talk/get/feedback/${session}`, {
    credentials: true
  })
}

const getGPTindexes = async () => {
  return await instanceAuth.get(`/talk/gpt/chat/index`, {
    credentials: true
  })
}

const getCurrentSubject = async () => {
  return await instanceAuth.get('/lms/current/subject', { credentials: true })
}

const changeCurrentSubject = async (data) => {
  return await instanceAuth.post('/lms/change/current/subject', data, {
    credentials: true
  })
}

const getCurrentSubject2 = async (n) => {
  return await axios.get(`${process.env.VUE_APP_CONNECT}/lms/current/subject`, {
    credentials: true,
    headers: {
      Authorization: n
    }
  })
}

const characterProfile = async (data) => {
  return await instanceAuth.post('/lms/character/profile', data, {
    credentials: true
  })
}

const mathLessonList = async () => {
  return await instanceAuth.get('/math/lesson/list', {
    credentials: true
  })
}

const lessonGraphSummary = async (id) => {
  return await instanceAuth.get(`/lms/summary/lesson/graph/${id}`, {
    credentials: true
  })
}

const lessonSectionSummary = async (id) => {
  return await instanceAuth.get(`/lms/summary/section/${id}`, {
    credentials: true
  })
}

const lessonTimeSummary = async (id) => {
  return await instanceAuth.get(`/lms/summary/lesson/time/${id}`, {
    credentials: true
  })
}

const lessonSpeakSummary = async (id) => {
  return await instanceAuth.get(`/lms/summary/lesson/speak/${id}`, {
    credentials: true
  })
}

const lessonGPTfeedbackSummary = async (id) => {
  return await instanceAuth.get(`/lms/summary/lesson/feedback/${id}`, {
    credentials: true
  })
}

// 미션 상세 정보 조회
export const getMissionDetail = async (missionId) => {
  try {
    const response = await axios.get(`/api/missions/${missionId}`)
    return response
  } catch (error) {
    console.error('미션 상세 정보 조회 실패:', error)
    throw error
  }
}

// 수학 단원 차시 조회
export const getMathUnitDetail = async () => {
  try {
    return await instanceAuth.get(`/math/lms/unit/detail`, {
      credentials: true
    })
  } catch (error) {
    console.error('수학 단원 차시 조회 실패:', error)
    throw error
  }
}

export const getMathGradeUnitDetail = async (data) => {
  try {
    return await instanceAuth.post(`/math/lms/grade/unit/detail`, data, {
      credentials: true
    })
  } catch (error) {
    console.error('수학 단원 차시 조회 실패:', error)
    throw error
  }
}

// 미션 수정
export const updateMission = async (missionData) => {
  try {
    const response = await axios.put(
      `/api/missions/${missionData.id}`,
      missionData
    )
    return response
  } catch (error) {
    console.error('미션 수정 실패:', error)
    throw error
  }
}

// 반학생 리스트 조회
export const getStudentList = async () => {
  try {
    return await instanceAuth.get('/mission/lms/students', {
      credentials: true
    })
  } catch (error) {
    console.error('반학생 리스트 조회 실패:', error)
    throw error
  }
}

const getPriorityMission = async () => {
  return await instanceAuth.get(`/mission/lms/viewclass/check`, {
    credentials: true
  })
}

// 미션 목록 조회
export const getTeacherMissions = async () => {
  try {
    return await instanceAuth.get('/mission/lms/list/teacher', {
      credentials: true
    })
  } catch (error) {
    console.error('미션 목록 조회 실패:', error)
    throw error
  }
}

// 미션 상세 조회
export const getMissionDetail2 = async (missionData) => {
  try {
    return await instanceAuth.post('/mission/lms/detail/teacher', missionData, {
      credentials: true
    })
  } catch (error) {
    console.error('미션 상세 조회 실패:', error)
    throw error
  }
}

// 개별 미션 조회
export const getStudentMissionList = async (id) => {
  try {
    return await instanceAuth.get(`/mission/lms/list/student/${id}`, {
      credentials: true
    })
  } catch (error) {
    console.error('개별 미션 조회 실패:', error)
    throw error
  }
}

// 개별 미션 상세 조회
// request { uid, subject, id }
export const getStudentMissionDetail = async (missionData) => {
  try {
    return await instanceAuth.post('/mission/lms/detail/student', missionData, {
      credentials: true
    })
  } catch (error) {
    console.error('개별 미션 상세 조회 실패:', error)
    throw error
  }
}

// 영어 학습단원 상세 조회
export const getLessonDetail = async (lesson) => {
  try {
    return await instanceAuth.get(`/mission/lms/detail/lesson/${lesson}`, {
      credentials: true
    })
  } catch (error) {
    console.error('영어 학습단원 상세 조회 실패:', error)
    throw error
  }
}

// 영어 미션 생성
export const createEnglishMission = async (missionData) => {
  try {
    return await instanceAuth.post('/mission/lms/create/eng', missionData, {
      credentials: true
    })
  } catch (error) {
    console.error('영어 미션 생성 실패:', error)
    throw error
  }
}

// 수학 미션 생성
export const createMathMission = async (missionData) => {
  try {
    return await instanceAuth.post('/mission/lms/create/math', missionData, {
      credentials: true
    })
  } catch (error) {
    console.error('수학 미션 생성 실패:', error)
    throw error
  }
}

// 영어 미션 수정
export const updateEnglishMission = async (missionData) => {
  try {
    return await instanceAuth.post(`/mission/lms/edit/eng/`, missionData, {
      credentials: true
    })
  } catch (error) {
    console.error('영어 미션 수정 실패:', error)
    throw error
  }
}

// 수학 미션 수정
export const updateMathMission = async (missionData) => {
  try {
    return await instanceAuth.post(`/mission/lms/edit/math/`, missionData, {
      credentials: true
    })
  } catch (error) {
    console.error('수학 미션 수정 실패:', error)
    throw error
  }
}

// 영어 미션 삭제
export const deleteEnglishMission = async (uid) => {
  try {
    return await instanceAuth.post(`/mission/lms/delete/eng`, uid, {
      credentials: true
    })
  } catch (error) {
    console.error('영어 미션 삭제 실패:', error)
    throw error
  }
}

// 수학 미션 삭제
export const deleteMathMission = async (uid) => {
  try {
    return await instanceAuth.post(`/mission/lms/delete/math`, uid, {
      credentials: true
    })
  } catch (error) {
    console.error('수학 미션 삭제 실패:', error)
    throw error
  }
}

const getAiepSchool = async () => {
  return await instanceAuth.get('/lms/aiep/school', { credentials: true })
}

const getAiepStudents = async () => {
  return await instanceAuth.get('/lms/aiep/students', { credentials: true })
}

const updateAiepStudent = async (data) => {
  return await instanceAuth.put('/lms/aiep/student', data, { credentials: true })
}

const deleteAiepStudent = async (id) => {
  return await instanceAuth.delete(`/lms/aiep/student/${id}`, { credentials: true })
}

const createAiepStudent = async (data) => {
  return await instanceAuth.post('/lms/aiep/student', data, { credentials: true })
}

export const classEngSummary = async (data) => {
  return await instanceAuth.get(`/lms/class/studyinfo`, data, {
    credentials: true
  })
}

export const classMathSummary = async () => {
  return await instanceAuth.get(`/math/lms/class/study/info`, {
    credentials: true
  })
}

export const getExpireInfo = async (n) => {
  const res = await axios.get(
    `${process.env.VUE_APP_CONNECT}/lms/expire/popup/info`,
    {
      credentials: true,
      headers: {
        Authorization: n
      },
      timeout: 500
    }
  )

  return res
}

const getMissionCount = async (subject) =>
  await instanceAuth.get(`/mission/lms/count/mission?subject=${subject}`, { credentials: true })

const addAssignClass = async (data) =>
  await instanceAuth.post('/lms/aiep/class', data, { credentials: true })

const deleteAssignClass = async (data) =>
  await instanceAuth.delete('/lms/aiep/class', { data, credentials: true })

export {
  lessonGraphSummary,
  lessonSectionSummary,
  lessonTimeSummary,
  lessonGPTfeedbackSummary,
  lessonSpeakSummary,
  characterProfile,
  mathLessonList,
  getCurrentSubject,
  changeCurrentSubject,
  settingclasslist,
  schoolinfo,
  contractinfo,
  classinfo,
  transferhistory,
  teacherinfo,
  applytransfer,
  firemission,
  openfirenewmission,
  editemail,
  teachermissionprogress,
  deleteteachermission,
  getmissionstatus,
  getstudentslist,
  getgptlessonchatbotrecord,
  getstudentreadingbooks,
  getstudentfinishbooks,
  getLessonBook,
  getAuth,
  getSSORestrict,
  getLanguage,
  getClassAllReadInfo,
  getStudentAllReadInfo,
  getClassMonthAllUsage,
  getClassMonthAverageUsage,
  getStudentMonthUsage,
  getClassLibraryLessonProgress,
  getClassQuizAverage,
  getClassPopularBooks,
  getClassWeeklyPopularBooks,
  getStudentLevelProgress,
  getLibraryStudentList,
  getStudentLibraryLessonProgress,
  getStudentRacingResult,
  getStudentRecentBooks,
  getReadHistoryPageLength,
  getReadHistory,
  getBookPopupSummary,
  getBookPopupDetail,
  getBookPopupRepeatDetail,
  getWeeklyRanking,
  getLanguage2,
  getSessionFeedback,
  getGPTindexes,
  getCurrentSubject2,
  getChathessAuth,
  getPriorityMission,
  getAiepSchool,
  getAiepStudents,
  updateAiepStudent,
  deleteAiepStudent,
  createAiepStudent,
  getMissionCount,
  addAssignClass,
  deleteAssignClass
}
