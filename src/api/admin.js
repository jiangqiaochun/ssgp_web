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

export const getStatistics = () => {
  return axios.request({
    url: '/users/statistics/',
    method: 'get'
  })
}

export const examineProject = (projectId) => {
  return axios.request({
    url: '/projects/' + projectId,
    method: 'put'
  })
}

export const postTime = ({startTime, endTime}) => {
  let req = new FormData()
  req.set('startTime', startTime)
  req.set('endTime', endTime)
  return axios.request({
    url: '/users/openTime/5cd119d1dc1c731c7047b583',
    data: req,
    method: 'put'
  })
}

export const getOpenTime = (id) => {
  return axios.request({
    url: '/users/openTime/' + id,
    method: 'get'
  })
}

export const deletAllStudent = () => {
  return axios.request({
    url: '/students/',
    method: 'delete'
  })
}

export const deletAllTeacher = () => {
  return axios.request({
    url: '/teachers/',
    method: 'delete'
  })
}

export const deleteStudentById = (id) => {
  return axios.request({
    url: '/students/' + id,
    method: 'delete'
  })
}

export const deleteTeacherById = (id) => {
  return axios.request({
    url: '/teachers/' + id,
    method: 'delete'
  })
}
