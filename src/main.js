import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import router from './router'
import * as mdbvue from 'mdbvue'

//Load all Material Design Bootstrap component
for (const component in mdbvue) {
  Vue.component(component, mdbvue[component])
}
Vue.use(BootstrapVue)
Vue.config.productionTip = false

//Load a axios as this.$http and set the token for the API
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
