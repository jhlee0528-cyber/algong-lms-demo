import axios from 'axios'
import { instance, instanceAuth } from './url'

const getMathStudents = async (data) => {
  return await instanceAuth.post('/math/lms/unit/students', data, {
    credentials: true
  })
}

const getStageResult = async (data) => {
  return await instanceAuth.post('/math/lms/result/stage', data, {
    credentials: true
  })
}

const getBossResult = async (data) => {
  return await instanceAuth.post('/math/lms/result/boss', data, {
    credentials: true
  })
}

const getUpgradeResult = async (data) => {
  return await instanceAuth.post('/math/lms/result/upgrade', data, {
    credentials: true
  })
}

const getStudentMathLessonList = async (id) => {
  return await instanceAuth.get(`/math/lms/student/lesson/list/${id}`, {
    credentials: true
  })
}

const getOpenUnitList = async () => {
  return await instanceAuth.get(`/math/lms/open/units`, {
    credentials: true
  })
}

const editOpenUnitList = async (data) => {
  return await instanceAuth.post(`/math/lms/open/units/edit`, data, {
    credentials: true
  })
}

export {
  getMathStudents,
  getStageResult,
  getBossResult,
  getUpgradeResult,
  getStudentMathLessonList,
  getOpenUnitList,
  editOpenUnitList
}
