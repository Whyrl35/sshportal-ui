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
      state.refresh = ''
      state.token = ''
      state.user = ''
    },
    auth_success(state, token, refresh, user){
      state.status = 'success'
      console.log('auth-success: ' + user)
      state.user = user
      state.token = token
      state.refresh = refresh
    },
    auth_error(state){
      state.status = 'error'
      state.refresh = ''
      state.token = ''
      state.user = ''
    },
    logout(state){
      state.status = ''
      state.refresh = ''
      state.token = ''
      state.user = ''
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
          const username = resp.data.user
          localStorage.setItem('token', token)
          localStorage.setItem('refresh', refresh)
          localStorage.setItem('user', username)
          axios.defaults.headers.common['Authorization'] = "Bearer " + token
          commit('auth_success', token, refresh, username)
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
          localStorage.setItem('user', user)
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
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userName: state => state.user,
  }
})