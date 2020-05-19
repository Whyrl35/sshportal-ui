import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    refresh: localStorage.getItem('refresh') || '',
    user: localStorage.getItem('user') || '',
    user_id: localStorage.getItem('user_id') || '',
    user_email: localStorage.getItem('user_email') || '',
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
      state.refresh = ''
      state.token = ''
      state.user = ''
      state.user_id = -1
      state.user_email = ''
    },
    auth_success(state, parameters){
      state.status = 'success'
      state.user = parameters.username
      state.token = parameters.token
      state.refresh = parameters.refresh
      state.user_id = parameters.user_id
      state.user_email = parameters.user_email
    },
    auth_error(state){
      state.status = 'error'
      state.refresh = ''
      state.token = ''
      state.user = ''
      state.user_id = -1
      state.user_email = ''
    },
    logout(state){
      state.status = ''
      state.refresh = ''
      state.token = ''
      state.user = ''
      state.user_id = -1
      state.user_email = ''
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
          const user_id = resp.data.id
          const user_email = resp.data.email
          localStorage.setItem('token', token)
          localStorage.setItem('refresh', refresh)
          localStorage.setItem('user', username)
          localStorage.setItem('user_id', user_id)
          localStorage.setItem('user_email', user_email)
          axios.defaults.headers.common['Authorization'] = "Bearer " + token
          commit('auth_success', { token, refresh, username, user_id, user_email}    )
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
        console.log("refreshing access token, with refresh token : " + this.state.refresh)
        axios.defaults.headers.common['Authorization'] = "Bearer " + this.state.refresh
        axios({url: process.env.VUE_APP_API_URL + "/v1/token", method: 'POST' })
        .then(resp => {
          const token = resp.data.access_token
          const user = resp.data.user
          const user_id = resp.data.id
          const user_email = resp.data.email
          const refresh = this.state.refresh
          localStorage.setItem('token', token)
          localStorage.setItem('user', user)
          axios.defaults.headers.common['Authorization'] = "Bearer " + token
          commit('auth_success', {token, refresh, user, user_id, user_email})
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
    userEmail: state => state.user_email,
  }
})