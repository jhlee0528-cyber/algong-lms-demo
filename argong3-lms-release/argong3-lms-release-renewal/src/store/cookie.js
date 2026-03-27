const date = new Date()
date.setTime(date.getTime() + 24 * 30 * 60 * 60 * 1000)

const min = new Date()

min.setTime(date.getTime() + 5 * 60 * 1000)
const expiresMin = '; expires=' + min.toGMTString() + ';'

// document.cookie = "Name=Value(값);Expires=날짜;Domain=도멘인;Path=경로;Secure";

// 로그인 쿠키 저장
const nonSaveCookie = (name, value) => {
  document.cookie = `${name}=${value}; path=/;`
}
const saveCookie = (name, value) => {
  document.cookie = `${name}=${value}; max-age=${360000 * 24 * 30}; path=/;`
}
// const getSaveCookie = () => {
//   // name = name + '='
//   const cookieData =

//   console.log(typeof(cookieData) )
//   console.log(cookieData)
//   // return document.cookie.replace(/(?:(?:^|.*;\s*)name\s*=\s*([^;]*).*$)|^.*$/, '$1')
// }

function getSaveCookie(cName) {
  cName = cName + '='
  const cookieData = document.cookie
  let start = cookieData.indexOf(cName)
  let cValue = ''
  if (start !== -1) {
    start += cName.length
    let end = cookieData.indexOf(';', start)
    if (end === -1) end = cookieData.length
    cValue = cookieData.substring(start, end)
  }
  return unescape(cValue)
}

// 로그인 쿠키 가져오기
const getAuthCookie = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
}

const getAutoLoginCookie = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)auto\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
}
const getUserLevelCookie = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)level\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
}

const findPwCookie = (value) => {
  document.cookie = `findPw=${value}` + expiresMin + 'path=/;'
}

const getFindPwCookie = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)findPw\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
}
// 쿠키 삭제
const deleteCookie = (name) => {
  const date = new Date()
  document.cookie = name + '=' + '; expires=' + date.toUTCString() + '; path=/'
}

export {
  nonSaveCookie,
  saveCookie,
  getSaveCookie,
  getAuthCookie,
  getAutoLoginCookie,
  getUserLevelCookie,
  findPwCookie,
  getFindPwCookie,
  deleteCookie
}
