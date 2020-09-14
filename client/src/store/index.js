import Vue from 'vue'
import Vuex from 'vuex'
import connection from '../assets/js/socket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: {}
  },
  mutations: {
    SET_USERS_INFO(state, value) {
      Vue.set(state, 'users', value)
    }
  },
  actions: {
    setUsersInfo(cxt, users) {
      connection.on('usersInfo', info => {
        cxt.commit('SET_USERS_INFO', info)
      })
    }
  },
  getters: {}
})
