<template>
  <mdb-navbar color="mdb-color" dark class="" expand="large">
    <mdb-navbar-brand href="/" :to="{ name: 'home'}">
      <img src="~/../assets/ssh-logo.png" style="width: 32px; height: 32px" class="d-inline-block align-top mr-1" alt="sshportal">
      sshportal-ui
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <router-link :to="{ name: 'home' }"><mdb-nav-item tag="a" active>Home</mdb-nav-item></router-link>
      </mdb-navbar-nav>
      <mdb-navbar-nav right>
        <span v-if="isLoggedIn"><mdb-nav-item @click.native="logout" active class="ml-5">Logout</mdb-nav-item></span>
        <span v-else><mdb-nav-item :to="{ name: 'login'}" active class="ml-5">Login</mdb-nav-item></span>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>
<script>
//import store from '../store'
export default {
  data() {
    return {
      search: "",
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push({ name: 'login'})
      })
    }
  },
  computed: {
    isLoggedIn() {
       return this.$store.getters.isLoggedIn;
    }
  }
}
</script>

