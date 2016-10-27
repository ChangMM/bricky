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

  Vue.prototype.$parseUrl = function (url) {
    let a = document.createElement('a')
    a.href = url
    return {
      source: url,
      protocol: a.protocol.replace(':', ''),
      host: a.hostname,
      port: a.port,
      query: a.search,
      params: (function () {
        let ret = {}
        let seg = a.search.replace(/^\?/, '').split('&')
        let len = seg.length
        let s = []
        for (let i = 0; i < len; i++) {
          if (!seg[i]) { continue }
          s = seg[i].split('=')
          ret[s[0]] = s[1]
        }
        return ret
      })(),
      file: (a.pathname.match(/\/([^\/?#]+)$/i) || ['', ''])[1],
      hash: a.hash.replace('#', ''),
      path: a.pathname.replace(/^([^\/])/, '/$1'),
      relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || ['', ''])[1],
      segments: a.pathname.replace(/^\//, '').split('/')
    }
  }
}
