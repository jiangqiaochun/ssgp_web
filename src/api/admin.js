import axios from '@/libs/api.request'

/**
 * 获取用户信息
 * @param userId
 */
export const getUserInfo = (userId) => {
  return axios.request({
    url: '/users/' + userId,
    method: 'get'
  })
}

export const postChangePsw = ({userId, newPsw}) => {
  let request = new FormData()
  request.set('newPsw', newPsw)
  return axios.request({
    url: '/users/' + userId,
    data: request,
    method: 'put'
  })
}

export const upload = (e) => {
  return axios.request({
    url: '/users/students/upload',
    file: e.target,
    method: 'post'
  })
}
