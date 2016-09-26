// 添加一些常用的过滤函数
export default function (Vue) {
  if (Vue) {
    // 溢出省略的处理
    Vue.filter('ellipsis', function (value, maxLength) {
      if (value.length > maxLength) {
        return value.substr(0, maxLength - 2) + '...'
      } else {
        return value
      }
    })

    // 计算字符串的长度
    Vue.filter('len', function (value) {
      if (typeof value == 'string') {
        return value.length
      } else {
        return 0
      }
    })
  }
}
