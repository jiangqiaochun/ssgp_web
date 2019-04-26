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

export const getStudentList = () => {
  return axios.request({
    url: '/students/',
    method: 'get'
  })
}

export const getTeacherList = () => {
  return axios.request({
    url: '/teachers/',
    method: 'get'
  })
}

export const getTeacherSelection = (id) => {
  let req = new FormData()
  req.set('teacherId', id)
  return axios.request({
    url: '/projects/' + id,
    method: 'get'
  })
}

export const getAllSelections = () => {
  return axios.request({
    url: '/selections/',
    method: 'get'
  })
}
