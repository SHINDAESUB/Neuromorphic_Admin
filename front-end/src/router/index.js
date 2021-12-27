import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history', // history 는 외부 접근에 내부 url 사용할 수 없다.
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/views/Main.vue'),
    },
    {
      path: '/list',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
    },
  ]
})
