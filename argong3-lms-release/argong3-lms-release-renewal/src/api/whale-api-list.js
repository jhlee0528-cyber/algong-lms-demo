import { instanceAuth } from './url'

const codesignup = async (data) => {
  return await instanceAuth
    .post('users/code/signup', data, { credentials: true })
    .catch((err) => {})
}

export { codesignup }
