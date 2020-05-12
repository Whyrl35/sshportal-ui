<template>
  <div class="flexible-content">
    <!--NavBar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling >
      <mdb-navbar-brand href="/" :to="{ name: 'home'}">
        sshportal-ui
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
        </mdb-navbar-nav>
        <mdb-navbar-nav right>
          <span v-if="isLoggedIn">
            <mdb-dropdown tag="li" class="nav-item">
              <mdb-dropdown-toggle tag="a" navLink color="unique-color-dark" slot="toggle" waves-fixed><mdb-icon far icon="user" /> Hello {{ this.userName }}</mdb-dropdown-toggle>
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
    <div class="sidebar-fixed position-fixed stylish-color">
      <div class="logo"><a><img src="./assets/ssh-logo2.jpg" class="img-fluid p-1" alt="sshportal"></a></div>
      <div class="sidemenu pt-3">
        <mdb-list-group class="stylish-color" flush>
          <router-link to="/" @click.native="activeItem = 1">
            <mdb-list-group-item :action="true" icon="home"
              :class="activeItem === 1 && 'small text-uppercase active' || 'text-uppercase small'">
              Home
            </mdb-list-group-item>
          </router-link>
          <mdb-list-group-item class="disabled pt-4 font-weight-bold small text-uppercase">Users</mdb-list-group-item>
          <router-link to="/users" @click.native="activeItem = 4">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 4 && 'small text-uppercase active' || 'text-uppercase small'"
              icon="user">Users</mdb-list-group-item>
          </router-link>
          <router-link to="/groups" @click.native="activeItem = 5">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 5 && 'small text-uppercase active' || 'text-uppercase small'"
              icon="users">Groups</mdb-list-group-item>
          </router-link>
          <router-link to="/roles" @click.native="activeItem = 6">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 6 && 'small text-uppercase active' || 'text-uppercase small'"
              icon="user-tag">Roles</mdb-list-group-item>
          </router-link>
          <mdb-list-group-item class="disabled pt-4 font-weight-bold small text-uppercase">Keys</mdb-list-group-item>
          <router-link to="/keys" @click.native="activeItem = 7">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 7 && 'small text-uppercase active' || 'text-uppercase small'"
              icon="key">Keys</mdb-list-group-item>
          </router-link>
          <router-link to="/userkeys" @click.native="activeItem = 8">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 8 && 'small text-uppercase active' || 'text-uppercase small'"
              icon="user-lock">User Keys</mdb-list-group-item>
          </router-link>
          <mdb-list-group-item class="disabled pt-4 font-weight-bold small text-uppercase">Hosts</mdb-list-group-item>
          <router-link to="/hosts" @click.native="activeItem = 9">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 9 && 'small text-uppercase active' || 'text-uppercase small'"
              icon="server">Hosts</mdb-list-group-item>
          </router-link>
          <router-link to="/hostgroups" @click.native="activeItem = 10">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 10 && 'small text-uppercase active' || 'text-uppercase small'"
              icon="layer-group">Host Groups</mdb-list-group-item>
          </router-link>
          <mdb-list-group-item class="disabled pt-4 font-weight-bold small text-uppercase">Security</mdb-list-group-item>
          <router-link to="/acls" @click.native="activeItem = 11">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 11 && 'small text-uppercase active' || 'text-uppercase small'"
              icon="shield-alt">Acls</mdb-list-group-item>
          </router-link>
          <mdb-list-group-item class="disabled pt-4 font-weight-bold small text-uppercase">Logs</mdb-list-group-item>
          <router-link to="/sessions" @click.native="activeItem = 12">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 12 && 'small text-uppercase active' || 'text-uppercase small'"
              icon="ethernet">Sessions</mdb-list-group-item>
          </router-link>
          <router-link to="/events" @click.native="activeItem = 13">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 13 && 'small text-uppercase active' || 'text-uppercase small'"
              icon="list-alt">Events</mdb-list-group-item>
          </router-link>
          <mdb-list-group-item class="disabled pt-4 font-weight-bold small text-uppercase">Settings</mdb-list-group-item>
          <router-link to="/settings" @click.native="activeItem = 14">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 14 && 'small text-uppercase active' || 'text-uppercase small'"
              icon="cog">Settings</mdb-list-group-item>
          </router-link>
        </mdb-list-group>
      </div>
    </div>
    <!-- /Sidebar  -->
    <main>
      <div id="app" class="mt-5 p-5">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
<style lang="scss">
  // Import custom SASS variable overrides, or alternatively
  // define your variable overrides here instead
  //@import 'assets/custom-vars.scss';
  $body-bg: #ededee;

  // Import Bootstrap and BootstrapVue source SCSS files
  @import '~bootstrap/scss/bootstrap.scss';
  @import '~bootstrap-vue/src/index.scss';
  @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

  // General style overrides and custom classes
  .navbar-light .navbar-brand {
    margin-left: 15px;
    color: #2196f3 !important;
    font-weight: bolder;
  }

  table.table a {
    color: #2196f3 !important;
    font-weight: bolder;
  }

  .logo {
    height: 72px;
    background-color: #2e2e2e !important;
    padding-left: 18px;
    margin-left: 0;
    width: 100%
  }

  .logo img {
    height: 48px;
    margin-left: 24px;
    margin-top: 10px;
  }

  main {
    background-color: #ededee;
  }

  .md-v-line {
    border-left: 0px !important;
  }

  .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
    background-color: #3F729B;
    color: #fff;
  }
</style>
<style scoped>

.flexible-content {
  transition: padding-left 0.3s;
  padding-left: 220px;
}

.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 220px;
}

.sidebar-fixed {
  left: 0;
  top: 0;
  height: 100vh;
  width: 220px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 1050;
  padding: 0; /*1.5rem;*/
  padding-top: 0;
  line-height: 1;
}

.sidebar-fixed .list-group-item {
  display: block !important;
  transition: background-color 0.3s;
  background-color: #4B515D;
  color: #fff;
  border: 0px;
  border-image-width: 0;
}

.sidebar-fixed .list-group .active {
  border-radius: 0px;
  background-color: #3F729B;
}
.sidebar-fixed .list-group :hover {
  border-radius: 0px;
  background-color: #3F729B;
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
      console.log(this.$store.getters.isLoggedIn)
      return this.$store.getters.isLoggedIn;
    },
    userName() {
      console.log(this.$store.getters.userName)
      return this.$store.state.user;
    }
  }

}
</script>