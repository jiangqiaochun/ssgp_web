import axios from '@/libs/api.request'
export const login = ({userId, password}) => {
  let loginInfo = new FormData()
  loginInfo.set('userId', userId)
  loginInfo.set('password', password)
  return axios.request({
    url: '/auth/login',
    data: loginInfo,
    method: 'post'
  })
}
