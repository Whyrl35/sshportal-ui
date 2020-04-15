<template>
  <mdb-navbar color="unique-color-dark" dark class="" position="top" expand="large">
    <mdb-navbar-brand href="/" :to="{ name: 'home'}">
      <img src="~/../assets/ssh-logo.png" style="width: 32px; height: 32px" class="d-inline-block align-top mr-1" alt="sshportal">
      sshportal-ui
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <router-link :to="{ name: 'home' }"><mdb-nav-item tag="a">Home</mdb-nav-item></router-link>
        <router-link :to="{ name: 'home' }"><mdb-nav-item tag="a">Users</mdb-nav-item></router-link>
        <router-link :to="{ name: 'home' }"><mdb-nav-item tag="a">Keys</mdb-nav-item></router-link>
        <router-link :to="{ name: 'home' }"><mdb-nav-item tag="a">Hosts</mdb-nav-item></router-link>
        <router-link :to="{ name: 'home' }"><mdb-nav-item tag="a">Acls</mdb-nav-item></router-link>
        <router-link :to="{ name: 'home' }"><mdb-nav-item tag="a">Sessions</mdb-nav-item></router-link>
        <router-link :to="{ name: 'events' }"><mdb-nav-item tag="a">Events</mdb-nav-item></router-link>
        <router-link :to="{ name: 'home' }"><mdb-nav-item tag="a">Settings</mdb-nav-item></router-link>
      </mdb-navbar-nav>
      <mdb-navbar-nav right>
        <span v-if="isLoggedIn">
          <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink color="unique-color-dark" slot="toggle" waves-fixed><mdb-icon far icon="user" /></mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item @click.native="logout">Logout</mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
        </span>
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

