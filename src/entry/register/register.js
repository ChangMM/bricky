/*
 * 处理注册的逻辑
 */
 /* eslint-disable no-new */
require('../../scss/register.scss')
import Vue from 'vue'
import VueResource from 'vue-resource'
import Register from './Register.vue'
let WarnPlugin = require('../../components/Warn/Warn.js')
Vue.use(WarnPlugin)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
new Vue({
  el: '#register-wrap',
  components: { Register }
})
