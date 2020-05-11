<template>
  <div class="flexible-content">
    <!--NavBar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling >
      <mdb-navbar-brand href="/" :to="{ name: 'home'}">
        sshportal-ui
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink color="unique-color-dark" slot="toggle" waves-fixed>Users</mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item ><mdb-icon icon="user" style="width:24px"/><router-link :to="{ name: 'home' }">Users</router-link></mdb-dropdown-item>
              <mdb-dropdown-item ><mdb-icon icon="users" style="width: 24px"/><router-link :to="{ name: 'home' }">Groups</router-link></mdb-dropdown-item>
              <mdb-dropdown-item ><mdb-icon icon="user-tag" style="width: 24px"/><router-link :to="{ name: 'home' }">Roles</router-link></mdb-dropdown-item>
              <mdb-dropdown-item ><mdb-icon icon="key" style="width: 24px"/><router-link :to="{ name: 'home' }">Keys</router-link></mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
          <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink color="unique-color-dark" slot="toggle" waves-fixed>Keys</mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item ><mdb-icon icon="key"  style="width:24px"/><router-link :to="{ name: 'home' }">Keys</router-link></mdb-dropdown-item>
              <mdb-dropdown-item ><mdb-icon icon="user-lock"  style="width:24px" /><router-link :to="{ name: 'home' }">User keys</router-link></mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
          <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink color="unique-color-dark" slot="toggle" waves-fixed>Hosts</mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item ><mdb-icon icon="server"  style="width:24px"/><router-link :to="{ name: 'hosts' }">Hosts</router-link></mdb-dropdown-item>
              <mdb-dropdown-item ><mdb-icon icon="layer-group"  style="width:24px" /><router-link :to="{ name: 'home' }">Groups</router-link></mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
          <router-link :to="{ name: 'acls' }"><mdb-nav-item tag="a">Acls</mdb-nav-item></router-link>
          <router-link :to="{ name: 'sessions' }"><mdb-nav-item tag="a">Sessions</mdb-nav-item></router-link>
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
    <!--./NavBar-->
    <!-- Sidebar -->
    <div class="sidebar-fixed position-fixed unique-color-dark">
      <a class="logo-wrapper"><img src="./assets/ssh-logo2.jpg" class="img-fluid" alt="sshportal"></a>
      <mdb-list-group class="list-group-flush unique-color-dark" flush>
        <router-link to="/" @click.native="activeItem = 1">
          <mdb-list-group-item
            :action="true"
            :class="activeItem === 1 && 'active unique-color'"
            icon="chart-pie">Home</mdb-list-group-item>
        </router-link>
        <router-link to="/profile" @click.native="activeItem = 2">
          <mdb-list-group-item
            :action="true"
            :class="activeItem === 2 && 'active unique-color'"
            icon="user">Profile</mdb-list-group-item>
        </router-link>
      </mdb-list-group>
    </div>
    <!-- /Sidebar  -->
    <main>
      <div id="app" class="mt-5 p-5">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
.navbar-light .navbar-brand {
  margin-left: 15px;
  color: #2196f3 !important;
  font-weight: bolder;
}
</style>

<style scoped>
body {
  background-color: #ededee;
}

main {
  background-color: #ededee;
}

.flexible-content {
  transition: padding-left 0.3s;
  padding-left: 270px;
}

.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 270px;
}

.sidebar-fixed {
  left: 0;
  top: 0;
  height: 100vh;
  width: 270px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 1050;
  padding: 1.5rem;
  padding-top: 0;
}

.sidebar-fixed .logo-wrapper img {
  width: 100%;
  padding: 2.5rem;
}

.sidebar-fixed .list-group-item {
  display: block !important;
  transition: background-color 0.3s;
}

.sidebar-fixed .list-group .active {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}

@media (max-width: 1199.98px) {
  .sidebar-fixed {
    display: none;
  }
  .flexible-content {
    padding-left: 0;
  }
  .flexible-navbar {
    padding-left: 10px;
  }
}
</style>

<script>
import store from './store'
import router from './router'
export default {
  data() {
    return {
      activeItem: 1
    };
  },
  beforeMount() {
    this.activeItem = this.$route.matched[0].props.default.page;
  },
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