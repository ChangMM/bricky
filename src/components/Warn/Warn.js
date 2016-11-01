function install (Vue) {
  let AlertConstructor = Vue.extend(require('./Warn.vue'))
  let alertInstance = null

  Vue.prototype.$warn = function (message, callback) {
    if (alertInstance) return
    alertInstance = new AlertConstructor({
      el: document.createElement('div'),
      data () {
        return {
          msg: message
        }
      }
    })
    alertInstance.$appendTo(document.body)
    if (callback) {
      setTimeout(function () {
        callback && callback()
      }, 1500)
    }
  }

  Vue.transition('warnIn', {
    afterEnter: function () {
      setTimeout(() => {
        alertInstance.$remove()
      }, 1500)
    },
    afterLeave: function () {
      alertInstance = null
    }
  })
}

let MyPlugin = {
  install: install
}

module.exports = MyPlugin
