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
