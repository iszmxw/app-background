import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import {
  router
} from './router/index'
import axios from 'axios'
import store from './store/index'

Vue.config.productionTip = false

Vue.use(Vant)

axios.defaults.baseURL = 'http://192.168.80.152:8088'
axios.defaults.headers.post['Content-Type'] = "application/json"
axios.defaults.withCredentials = true
axios.defaults.headers.common['Authorization'] = store.state.token
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  if (store.state.token) {
    config.headers.common['Authorization'] = store.state.token.token
  }

  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(
  response => {

    return response;
  },
  error => {

    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$store.commit('del_token');
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            } //登录成功后跳入浏览的当前页面
          })
      }
    }
    return Promise.reject(error.response.data)
  })