import { instance, instanceAuth, socketinstance } from './url'
import axios from 'axios'

const maintenance = async () => {
  return await instance
    .get('server/maintenance', { credentials: true })
    .catch((err) => {})
}

const login = async (loginData) => {
  return await instance
    .post('lms/login', loginData, { credentials: true, timeout: 10000 })
    .catch((err) => {
      return false
    })
}
const userInfo = async () => {
  return await instanceAuth
    .get('/users', { credentials: true })
    .catch((err) => {
      return err.response
    })
} // 단원 정보 불러오기
const lessonInfo = async () => {
  return await instanceAuth
    .get('/lms/lesson-list', { credentials: true })
    .catch((err) => {
      return err.response
    })
}
const lessonaverageprogress = async () => {
  return await instanceAuth
    .get('/lms/class-lesson-progress', { credentials: true })
    .catch((err) => {
      return err.response
    })
}
const lessonStudentInfo = async (index) => {
  return await instanceAuth
    .get(`/lms/student-studylist/${index}`, { credentials: true })
    .catch((err) => {
      return err.response
    })
}
const lessonStudentDetailInfo = async (id, lesson) => {
  return await instanceAuth
    .get(`/lms/student-detail/${id}/${lesson}`, { credentials: true })
    .catch((err) => {
      return err.response
    })
}
const lessonSectionAverage = async (lesson) => {
  return await instanceAuth
    .get(`/lms/class-section-correct/${lesson}`, { credentials: true })
    .catch((err) => {
      return err.response
    })
}
const lessonChatbot = async (id, lesson) => {
  return await instanceAuth
    .get(`/lms/user/chatbot/${id}/${lesson}`, { credentials: true })
    .then((res) => {
      if (!res.data) {
        return []
      } else {
        return res
      }
    })
    .catch((err) => {
      return [
        {
          key: 'time',
          value: new Date()
        }
      ]
    })
}
const studenttotalinfo = async (id) => {
  return await instanceAuth
    .get(`/lms/student-detail/${id}/all`, { credentials: true })
    .catch((err) => {
      return err.response
    })
}
const studenttotalinfobylesson = async (info) => {
  return await instanceAuth
    .get(`/lms/student-detail/${info.id}/all/${info.lesson}`, {
      credentials: true
    })
    .catch((err) => {
      return err.response
    })
}
const todayclass = async () => {
  return await instanceAuth
    .get(`/lms/class-studylist`, { credentials: true })
    .catch((err) => {
      return []
    })
}
const chapteraverage = async () => {
  return await instanceAuth
    .get(`/lms/student-detail`, { credentials: true })
    .catch((err) => {
      return err.response
    })
}
const sectionclassaverage = async (lesson) => {
  return await instanceAuth
    .get(`/lms/class-section-correct/${lesson}`, { credentials: true })
    .catch((err) => {
      return err.response
    })
}
const sendfeedback = async (message) => {
  return await instanceAuth
    .post(`/lms/user/feedback`, message, { credentials: true })
    .catch((err) => {
      return err.response
    })
}
const getsendfeedback = async (id) => {
  return await instanceAuth
    .get(`/lms/user/feedback/${id}`, { credentials: true })
    .catch((err) => {
      return err.response
    })
}
const openlessoninfo = async () => {
  return await instanceAuth
    .get(`/lms/open-lesson-list`, { credentials: true })
    .catch((err) => {
      return err.response
    })
}
const openlesson = async (data) => {
  return await instanceAuth
    .post(`/lms/change/lesson-status`, data, { credentials: true })
    .catch((err) => {
      return err.response
    })
}
const openmission = async (data) => {
  return await instanceAuth
    .post(`/lms/open/mission`, data, { credentials: true })
    .catch((err) => {
      return err.response
    })
}
const deletemission = async () => {
  return await instanceAuth
    .delete(`/lms/delete/mission`, { credentials: true })
    .catch((err) => {
      return err.response
    })
}
const passwordinit = async (id) => {
  return await instanceAuth
    .put(`/lms/${id}/reset/password`, { credentials: true })
    .catch((err) => {
      return err.response
    })
}
const passwordchange = async (data) => {
  return await instanceAuth
    .post(`/users/password/lms`, data, { credentials: true })
    .catch((err) => {
      return err.response
    })
}
const test = async () => {
  return await socketinstance
    .get(`/user-list`, { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const lessondetailinfo = async (lesson) => {
  return await instanceAuth
    .get(`/lms/lesson-detail/${lesson}`, { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const restday = async () => {
  return await instanceAuth
    .get('/lms/class-period', { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const lastdaylist = async () => {
  return await instanceAuth
    .get('/lms/last-edit', { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const lastdaysave = async () => {
  return await instanceAuth
    .get('/lms/update/terminate-studyTime', { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const missionlist = async () => {
  return await instanceAuth
    .get('/tasks/missions', { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const free_chat = async (userId, date) => {
  return await instanceAuth
    .get(`/lms/user/gpt/${userId}/${date}`, { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const modify_nickname = async (data) => {
  return await instanceAuth
    .post('/lms/update/nickname', data, { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const sendmessage = async (data, token) => {
  // return await instanceAuth
  //   .post('/mail/auth/send', data, {
  //     headers: { Authorization: token },
  //     credentials: true
  //   })
  //   .catch((err) => {
  //     return err.response
  //   })

  return await axios
    .post(`${process.env.VUE_APP_CONNECT}/mail/auth/send`, data, {
      headers: { Authorization: token }
    })
    .catch((err) => {})
}

const checkauth = async (data, token) => {
  // return await instanceAuth
  //   .post('/mail/auth/check', data, {
  //     credentials: true,
  //     headers: { Authorization: token }
  //   })
  //   .catch((err) => {
  //     return err.response
  //   })

  return await axios
    .post(`${process.env.VUE_APP_CONNECT}/mail/auth/check`, data, {
      headers: { Authorization: token }
    })
    .catch((err) => {})
}

const agreement = async (data) => {
  // return await instanceAuth
  //   .post('/lms/agreement', {
  //     credentials: true,
  //     headers: {
  //       Authorization: data
  //     }
  //   })
  //   .catch((err) => {
  //     return err.response
  //   })

  return await axios
    .post(`${process.env.VUE_APP_CONNECT}/lms/agreement`, data, {
      headers: { Authorization: data }
    })
    .catch((err) => {})
}

const studentmanagelog = async (data) => {
  return await instanceAuth
    .post('/log/studentManage', data, { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const classsettinglog = async (data) => {
  return await instanceAuth
    .post('/log/classSet', data, { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const classmanagelog = async (data) => {
  return await instanceAuth
    .post('/log/classLook', data, { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const studentmorelog = async (data) => {
  return await instanceAuth
    .post('/log/studentManageMore', data, { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const guidelog = async () => {
  return await instanceAuth
    .post('/lms/guide', { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const asklog = async () => {
  return await instanceAuth
    .post('/log/help', { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const lmslogoutlog = async () => {
  return await instanceAuth
    .post('/log/lms/logout', { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const classlist = async () => {
  return await instanceAuth
    .get('/lms/classList', { credentials: true })
    .catch((err) => {
      return {
        data: {
          result: true,
          data: []
        }
      }
    })
}

const changeclass = async (data) => {
  return await instanceAuth
    .post('/lms/set-class', data, { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const getexistmission = async (data) => {
  return await instanceAuth
    .get('/lms/class-teacher-mission', { credentials: true })
    .catch((err) => {
      return err.response
    })
}

const customGPTsubject = async (data) => {
  return await instanceAuth
    .post('lms/custom/gpt/subject', data, { credentials: true })
    .catch((err) => {
      return false
    })
}

const setGPTsubject = async (data) => {
  return await instanceAuth
    .post('lms/set/gpt/subject', data, { credentials: true })
    .catch((err) => {
      return false
    })
}

const getcurrentmission = async () => {
  return await instanceAuth
    .get('lms/class-teacher-mission', { credentials: true })
    .catch((err) => {
      return false
    })
}

const getnewmission = async () => {
  return await instanceAuth
    .get('lms/teacher-mission/history', { credentials: true })
    .catch((err) => {
      return []
    })
}

const opennewmission = async (data) => {
  return await instanceAuth
    .post('lms/create/teacher-mission', data, { credentials: true })
    .catch((err) => {
      return false
    })
}

const gpthistory = async () => {
  return await instanceAuth
    .get('lms/get/gpt/subject', { credentials: true })
    .catch((err) => {
      return []
    })
}

const prounResult = async (userId, lesson) => {
  return await instanceAuth
    .get(`/lms/pronunciation/result/${userId}/${lesson}`, { credentials: true })
    .then((res) => {
      const { data } = res.data
      if (data === undefined || data === null) {
        return []
      } else {
        return data
      }
    })
    .catch((err) => {
      return []
    })
}

const prounDetail = async (userId, num) => {
  return await instanceAuth
    .get(`/lms/pronunciation/detail/${userId}/${num}`, { credentials: true })
    .then((res) => {
      const { data } = res.data

      if (data.fluency) {
        return [data.accuracy, data.fluency, data.prosody]
      } else {
        return [0, 0, 0]
      }
    })
    .catch((err) => {
      return [0, 0, 0]
    })
}

const lmsStudyDetail = async (userId, lesson) => {
  return await instanceAuth
    .get(`/lms/study/detail/${userId}/${lesson}`, { credentials: true })
    .then((res) => {
      const { data } = res.data
      return data
    })
    .catch((err) => {
      return []
    })
}

const lmsTeacherMissionHistory = async (userId, lesson) => {
  return await instanceAuth
    .get(`/lms/teacher-mission/history/${userId}/${lesson}`, {
      credentials: true
    })
    .then((res) => {
      const { data } = res.data
      return data
    })
    .catch((err) => {
      return []
    })
}

const lmsStudentPercentAll = async (userId) => {
  return await instanceAuth
    .get(`/lms/total-percent/${userId}/all`, { credentials: true })
    .then((res) => {
      const { data } = res.data
      return data
    })
    .catch((err) => {
      return []
    })
}

const lmsSpeaking = async (userId, lesson, content) => {
  return await instanceAuth
    .get(
      `/lms/speaking/${userId}/${lesson}/${content}?userId=${userId}&lesson=${lesson}&content=${content}`,
      { credentials: true }
    )
    .then((res) => {
      const { data } = res.data
      if (!data) {
        return ''
      } else {
        return data
      }
    })
    .catch((err) => {
      return ''
    })
}

const lmsUserBook = async (userId, type) => {
  return await instanceAuth

    .get(`/lms/user/book/${userId}/${type}`, { credentials: true })
    .then((res) => {
      const { data } = res.data
      if (!data) {
        return []
      } else {
        return data
      }
    })
    .catch((err) => {
      return []
    })
}

const popupVote = async (data) => {
  try {
    const response = await instanceAuth.post('/lms/vote', data, {
      credentials: true
    })
    return response
  } catch (err) {
    return err
  }
}

const popupVoteStatus = async () => {
  return await instanceAuth
    .get('/lms/vote/status', { credentials: true })
    .then((res) => {
      const { data } = res.data
      // console.log('popupVoteStatus', data)
      if (!data) {
        return []
      } else {
        return data
      }
    })
    .catch((err) => {
      return err
    })
}

export {
  maintenance,
  login,
  userInfo,
  lessonInfo,
  lessonaverageprogress,
  lessonStudentInfo,
  lessonStudentDetailInfo,
  lessonSectionAverage,
  lessonChatbot,
  studenttotalinfo,
  todayclass,
  chapteraverage,
  sectionclassaverage,
  sendfeedback,
  getsendfeedback,
  openlessoninfo,
  openlesson,
  openmission,
  deletemission,
  passwordinit,
  passwordchange,
  lessondetailinfo,
  test,
  restday,
  lastdaylist,
  lastdaysave,
  missionlist,
  free_chat,
  modify_nickname,
  sendmessage,
  checkauth,
  agreement,
  studentmanagelog,
  classsettinglog,
  classmanagelog,
  studentmorelog,
  guidelog,
  asklog,
  lmslogoutlog,
  classlist,
  changeclass,
  getexistmission,
  studenttotalinfobylesson,
  customGPTsubject,
  setGPTsubject,
  getnewmission,
  getcurrentmission,
  opennewmission,
  gpthistory,
  prounResult,
  prounDetail,
  lmsStudyDetail,
  lmsTeacherMissionHistory,
  lmsStudentPercentAll,
  lmsSpeaking,
  lmsUserBook,
  popupVote,
  popupVoteStatus
}
