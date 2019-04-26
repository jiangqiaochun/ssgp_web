import axios from '@/libs/api.request'

export const postCreateProject = ({projectName, projectType, projectNature}) => {
  let req = new FormData()
  req.set('projectName', projectName)
  req.set('projectType', projectType)
  req.set('projectNature', projectNature)
  return axios.request({
    url: '/projects/' + localStorage.getItem('userId'),
    data: req,
    method: 'post'
  })
}

export const getProjectList = () => {
  return axios.request({
    url: '/projects/' + localStorage.getItem('userId'),
    method: 'get'
  })
}

export const deletById = (id) => {
  return axios.request({
    url: '/projects/' + id,
    method: 'delete'
  })
}

export const getTeacherInfo = () => {
  return axios.request({
    url: '/teachers/' + localStorage.getItem('userId'),
    method: 'get'
  })
}

export const changePhone = (newPhone) => {
  return axios.request({
    url: '/teachers/' + localStorage.getItem('userId') + '?newPhone=' + newPhone,
    method: 'post'
  })
}
