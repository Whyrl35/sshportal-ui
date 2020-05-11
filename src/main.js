import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import store from './store'
import router from './router'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
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

//Check for 401 response and redirect if needed
Vue.prototype.$http.interceptors.response.use(undefined, function (err) {
  return new Promise(function () {
    if (err.response.status === 401) {
      /* eslint-disable no-console */
      console.log("401: Token is now invalid, try to refresh it");
      store.dispatch('refresh_token')
      //router.push({ name: 'login'});
    }
    throw err;
  });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
