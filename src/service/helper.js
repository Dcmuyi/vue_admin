/**
 * 封装helper类
 */
export default {
  //  获取localStorage值
  getItem (key) {
    try {
      return localStorage.getItem(`${key}`)
    } catch (e) {
      return false
    }
  },
  //  设置localStorage值
  setItem (key, value) {
    try {
      localStorage.setItem(`${key}`, value)
      return !!localStorage.getItem(`${key}`)
    } catch (e) {
      return false
    }
  },
  //  移除localStorage值
  removeItem (key) {
    try {
      localStorage.removeItem(`${key}`)
      return true
    } catch (e) {
      return false
    }
  }
}
