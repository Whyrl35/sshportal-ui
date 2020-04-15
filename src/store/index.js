import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    refresh: localStorage.getItem('refresh') || '',
    user : localStorage.getItem('user') || ''
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, refresh, user){
      state.status = 'success'
      state.token = token
      state.refresh = refresh
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
      state.refresh = ''
      state.token = ''
      state.user = ''
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.token = ''
    },
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: process.env.VUE_APP_API_URL + "/v1/login", data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.access_token
          const refresh = resp.data.refresh_token
          const user = resp.data.user
          localStorage.setItem('token', token)
          localStorage.setItem('refresh', refresh)
          axios.defaults.headers.common['Authorization'] = "Bearer " + token
          commit('auth_success', token, refresh, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          localStorage.removeItem('refresh')
          this.state.token = ''
          this.state.refresh = ''
          reject(err)
        })
      })
    },
    refresh_token({commit}){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.defaults.headers.common['Authorization'] = "Bearer " + this.state.refresh
        axios({url: process.env.VUE_APP_API_URL + "/v1/token", method: 'POST' })
        .then(resp => {
          const token = resp.data.access_token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = "Bearer " + token
          commit('auth_success', token, this.state.refresh, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          localStorage.removeItem('refresh')
          this.state.token = ''
          this.state.refresh = ''
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})