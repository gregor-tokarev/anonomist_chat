import Vue from 'vue'
import Vuex from 'vuex'
import connection from '../assets/js/socket'
import setMessageToSs from '../assets/js/setMessageToSs'

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
      state.messages.push(message)
    },
    CLEAR_MESSAGES(state) {
      state.messages = []
    },
    SET_HISTORY(state, history) {
      state.messages = history
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
        setMessageToSs(message)
      })
    },
    clearMessages({ commit }) {
      commit('CLEAR_MESSAGES')
    },
    setHistory({ commit }, history) {
      commit('SET_HISTORY', history)
    }
  },
  getters: {
    messages(state) {
      return state.messages
    },
    usersInfo(state) {
      return state.users
    }
  }
})
