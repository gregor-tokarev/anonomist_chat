import Vue from 'vue'
import VueRouter from 'vue-router'
import Choose from '../pages/Choose'
import Chat from '../pages/Chat'
import Wait from '../pages/Wait'
import connection from '../assets/js/socket'

Vue.use(VueRouter)

const routes = [
  {
    path: '/choose',
    name: 'choose',
    component: Choose
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat
  },
  {
    path: '/load',
    name: 'load',
    component: Wait
  },
  {
    path: '*',
    redirect: { name: 'choose' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  connection.emit('changePage', to.name)
  next()
})

export default router
