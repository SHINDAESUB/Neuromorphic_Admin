import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueKonva from 'vue-konva'
import apolloProvider from './plugins/apollo'

Vue.use(VueKonva)

axios.defaults.baseURL = '/api'  //모든 요청에 '/api' 붙도록 기본 설정           
axios.defaults.headers.common.Accept = 'application/json'//JSON 형식으로만 받는다 

axios.interceptors.response.use(  //Error 전파하기 위해 인터셉터 응답을 추가한다. 

  response => response,                                                        

  (error) => {                                                                 

    return Promise.reject(error)                                               

  }                                                                            
)        
//Vue.prototype.$http = axios //vue 컴포넌트에서 this.$http 요청할 수 있게 된다.

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
