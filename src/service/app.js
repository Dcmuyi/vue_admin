import axios from 'axios'

function genCacheRequest (url) {
  let response = null
  return params => (
    !response
      ? (response = axios.get(url, { params }))
      : response
  )
}

export default {
  async login (data) {
    return axios.post('/auth/login', data)
  },
  async logout (data) {
    return axios.post('/auth/logout', data)
  },
  async getUserInfo (userId) {
    return axios.get(`/user/user/${userId}`)
  },
  getArea: genCacheRequest('/area/area/all')
}
