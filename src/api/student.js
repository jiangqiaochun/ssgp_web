import axios from '@/libs/api.request'
/**
 * 获取学生信息
 * @param userId
 */
export const getStudentInfo = (userId) => {
  return axios.request({
    url: '/students/' + userId,
    method: 'get'
  })
}

export const getSelectionData = (searchCondition) => {
  return axios.request({
    url: '/projects?searchCondition=' + searchCondition,
    method: 'get'
  })
}

export const selectProject = ({studentId, projectId}) => {
  let req = new FormData()
  req.set('studentId', studentId)
  req.set('projectId', projectId)
  return axios.request({
    url: '/selections/',
    data: req,
    method: 'post'
  })
}

export const getMySelection = () => {
  return axios.request({
    url: '/selections/' + localStorage.getItem('userId'),
    method: 'get'
  })
}

export const getTeacher = () => {
  return axios.request({
    url: '/teachers/',
    method: 'get'
  })
}

export const getProject = (teacherId) => {
  return axios.request({
    url: '/projects/' + teacherId,
    method: 'get'
  })
}
