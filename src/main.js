import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import store from './store'
import router from './router'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import * as mdbvue from 'mdbvue'
import Gravatar from 'vue-gravatar';

//
//-- Load all Material Design Bootstrap component
for (const component in mdbvue) {
  Vue.component(component, mdbvue[component])
}
Vue.component('v-gravatar', Gravatar)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

//
//-- Load a axios as this.$http and set the token for the API
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + token
}

//
//-- Check for 401 response and redirect if needed
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

//
//-- Mixin, reusable methods
Vue.mixin({
  methods: {
    timeBetween: function(start, end, short_format) {
      var duration = new Date(end - start);
      var h = duration.getHours() - 1;
      var m = duration.getMinutes();
      var s = duration.getSeconds();
      if (short_format) {
        return h > 0 ? h + "h" : m > 0 ? m + "m" : s > 0 ? s + "s" : "";
      }
        return h > 0 ? h + " hours" : m > 0 ? m + " minutes" : s > 0 ? s + " secondes" : "";
    },
    timeSince: function(date, short_format) {
      var seconds = Math.floor((new Date() - date) / 1000);
      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return !short_format ? interval + " years ago" : interval + "y ago"
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return !short_format ? interval + " months ago" : interval + "mth ago"
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return !short_format ? interval + " days ago" : interval + "d ago"
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return !short_format ? interval + " hours ago" : interval + "h ago"
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return !short_format ? interval + " minutes ago" : interval + "min ago"
      }
      return !short_format ? interval + " secondes ago" : interval + "s ago"
    },
    chunkStr: function (bigstr, size = 80) {
      if (bigstr === undefined || bigstr === null) {
        return [];
      }
      var match_str = new RegExp(".{1," + size + "}", "g");
      return bigstr.match(match_str);
    },
    hostName: function () {
      return location.host;
    },
  }
})

//
//-- Global variables
Vue.prototype.$globalThemeColor = 'stylish-color text-white'
Vue.prototype.$globalThemeColorDark = 'stylish-color-dark'
Vue.prototype.$globalBadgeColor = 'unique-color'

//
//-- Create the view instance
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
