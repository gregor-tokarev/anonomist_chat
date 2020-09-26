import Vue from 'vue'
import VueRouter from 'vue-router'
import Choose from '../pages/Choose'
import Chat from '../pages/Chat'
import Wait from '../pages/Wait'

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

export default router
