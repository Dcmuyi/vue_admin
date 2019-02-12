import axios from 'axios'

const MODEL = 'product/product'

export default {
  async query (params) {
    return axios.get(`/${MODEL}`, { params })
  },
  async get (id, params) {
    return axios.get(`/${MODEL}/${id}`, { params })
  },
  async create (data) {
    return axios.post(`/${MODEL}`, data)
  },
  async update (id, data) {
    return axios.put(`/${MODEL}/${id}`, data)
  },
  async remove (id) {
    return axios.delete(`/${MODEL}/${id}`)
  },
  async audit (data) {
    return axios.post(`/${MODEL}/audit`, data)
  },
  async getTags (params) {
    return axios.get('/product/product-tag', { params })
  },
  async getManufacturer (params) {
    return axios.get('/product/manufacture', { params })
  }
}
