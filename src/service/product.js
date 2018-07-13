import axios from 'axios'

const MODEL = 'product/product'

function genCacheRequest (url) {
  let response = null
  return params => (
    !response
      ? (response = axios.get(url, { params }))
      : response
  )
}

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
  async updatePrice (productId, sales) {
    return axios.post('/product-sale-system/update-price', { productId, ...sales })
  },
  getCategories: genCacheRequest(`/${MODEL}-category`),
  getTags: genCacheRequest(`/${MODEL}-tag`),
  getDiseases: genCacheRequest(`/${MODEL}/disease-list`)
}
