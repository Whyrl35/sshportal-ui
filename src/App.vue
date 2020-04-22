<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import store from './store'
import router from './router'
export default {
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.response.status === 401) {
          /* eslint-disable no-console */
          console.log("401: Token is now invalid");
          store.dispatch('refresh_token')
          //.then(() => {
            router.push({ name: 'home'});
          //})
        }
        if (err.response.status === 422) {
          /* eslint-disable no-console */
          console.log("422: Token and RefreshToken are now invalid");
          store.dispatch('logout')
          //.then(() => {
            router.push({ name: 'login'});
          //})
        }
        throw err;
      });
    });
  }
}
</script>