// 添加一些全局工具函数
export default function (Vue) {
  Vue.prototype.$cookies = function () {
    let ret = {}
    if (document.cookie.length === 0) {
      return ret
    }
    let pairs = document.cookie.split(';')
    for (let i = 0; i < pairs.length; i++) {
      let kv = pairs[i].split('=')
      ret[kv[0].trim()] = kv[1]
    }
    return ret
  }
}
