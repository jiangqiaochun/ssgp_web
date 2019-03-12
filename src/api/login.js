import axios from '@/libs/api.request'
export const login = ({studentId, password}) => {
  let loginInfo = new FormData()
  loginInfo.set('studentId', studentId)
  loginInfo.set('password', password)
  return axios.request({
    url: '/auth/login',
    data: loginInfo,
    method: 'post'
  })
}
