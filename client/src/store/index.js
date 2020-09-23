import Vue from 'vue'
import Vuex from 'vuex'
import connection from '../assets/js/socket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: {},
    messages: []
  },
  mutations: {
    SET_USERS_INFO(state, value) {
      Vue.set(state, 'users', value)
    },
    ADD_MESSAGE(state, message) {
      console.log('message')
      state.messages.push(message)
    },
    CLEAR_MESSAGES(state) {
      state.messages = []
    }
  },
  actions: {
    setUsersInfo({ commit }) {
      connection.on('usersInfo', info => {
        commit('SET_USERS_INFO', info)
      })
    },
    startAddingMessages({ commit }) {
      connection.on('messageFormServer', message => {
        commit('ADD_MESSAGE', message)
      })
    },
    clearMessages({ commit }) {
      commit('CLEAR_MESSAGES')
    }
  },
  getters: {
    messages(state) {
      return state.messages
    }
  }
})
