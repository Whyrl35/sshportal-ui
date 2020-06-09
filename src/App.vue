<template>
  <div class="flexible-content">
    <!--NavBar-->
    <mdb-navbar class="flexible-navbar white p-1" light position="top" scrolling >
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
        </mdb-navbar-nav>
        <mdb-navbar-nav right>
          <span v-if="isLoggedIn">
            <mdb-dropdown tag="li" class="nav-item">
              <mdb-dropdown-toggle tag="a" navLink color="unique-color-dark" slot="toggle" waves-fixed>
                <div class="d-inline-block pr-2">
                  <v-gravatar :email="userEmail" class="rounded-circle img-fluid" style="width: 40px" />
                </div>
                Hello {{ this.userName }}</mdb-dropdown-toggle>
              <mdb-dropdown-menu>
                <mdb-dropdown-item @click.native="logout">Logout</mdb-dropdown-item>
              </mdb-dropdown-menu>
            </mdb-dropdown>
          </span>
          <span v-else><mdb-nav-item :to="{ name: 'login'}" active class="">
            <div class="d-inline-block pt-2" style="height: 47px">
              Login
            </div>
            </mdb-nav-item>
          </span>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <!--./NavBar-->
    <!-- Sidebar -->
    <div class="sidebar-fixed position-fixed stylish-color">
      <div class="logo pt-4 pl-5"><a><span class="white-text"><b>SSHPORTAL-UI</b></span></a></div>
      <div class="sidemenu pt-3">
        <mdb-list-group class="stylish-color" flush>
          <router-link to="/" @click.native="activeItem = 1">
            <mdb-list-group-item :action="true"
              :class="activeItem === 1 && 'active'">
              <mdb-icon icon="home" class="w-25" size="lg"/><span class="text-uppercase small">Home</span>
            </mdb-list-group-item>
          </router-link>
          <mdb-list-group-item class="disabled pt-4 font-weight-bold small text-uppercase">Users</mdb-list-group-item>
          <router-link to="/users" @click.native="activeItem = 4">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 4 && 'active'">
              <mdb-icon icon="user" class="w-25" size="lg"/><span class="text-uppercase small">Users</span>
            </mdb-list-group-item>
          </router-link>
          <router-link to="/groups" @click.native="activeItem = 5">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 5 && 'active'">
              <mdb-icon icon="users" class="w-25" size=""/><span class="text-uppercase small">Groups</span>
            </mdb-list-group-item>
          </router-link>
          <router-link to="/roles" @click.native="activeItem = 6">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 6 && 'active'">
              <mdb-icon icon="user-tag" class="w-25" size=""/><span class="text-uppercase small">Roles</span>
            </mdb-list-group-item>
          </router-link>
          <mdb-list-group-item class="disabled pt-4 font-weight-bold small text-uppercase">Keys</mdb-list-group-item>
          <router-link to="/keys" @click.native="activeItem = 7">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 7 && 'active'">
              <mdb-icon icon="key" class="w-25" size="lg"/><span class="text-uppercase small">Egress</span>
            </mdb-list-group-item>
          </router-link>
          <router-link to="/userkeys" @click.native="activeItem = 8">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 8 && 'active'">
              <mdb-icon icon="user-lock" class="w-25" size=""/><span class="text-uppercase small">Ingress</span>
            </mdb-list-group-item>
          </router-link>
          <mdb-list-group-item class="disabled pt-4 font-weight-bold small text-uppercase">Hosts</mdb-list-group-item>
          <router-link to="/hosts" @click.native="activeItem = 9">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 9 && 'active'">
              <mdb-icon icon="server" class="w-25" size=""/><span class="text-uppercase small">Hosts</span>
            </mdb-list-group-item>
          </router-link>
          <router-link to="/hostgroups" @click.native="activeItem = 10">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 10 && 'active'">
              <mdb-icon icon="layer-group" class="w-25" size=""/><span class="text-uppercase small">Host Groups</span>
            </mdb-list-group-item>
          </router-link>
          <mdb-list-group-item class="disabled pt-4 font-weight-bold small text-uppercase">Security</mdb-list-group-item>
          <router-link to="/acls" @click.native="activeItem = 11">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 11 && 'active'">
              <mdb-icon icon="shield-alt" class="w-25" size=""/><span class="text-uppercase small">Acls</span>
            </mdb-list-group-item>
          </router-link>
          <mdb-list-group-item class="disabled pt-4 font-weight-bold small text-uppercase">Logs</mdb-list-group-item>
          <router-link to="/sessions" @click.native="activeItem = 12">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 12 && 'active'">
              <mdb-icon icon="ethernet" class="w-25" size=""/><span class="text-uppercase small">Sessions</span>
            </mdb-list-group-item>
          </router-link>
          <router-link to="/events" @click.native="activeItem = 13">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 13 && 'active'">
              <mdb-icon icon="list-alt" class="w-25" size=""/><span class="text-uppercase small">Events</span>
            </mdb-list-group-item>
          </router-link>
          <mdb-list-group-item class="disabled pt-4 font-weight-bold small text-uppercase">Settings</mdb-list-group-item>
          <router-link to="/settings" @click.native="activeItem = 14">
            <mdb-list-group-item
              :action="true"
              :class="activeItem === 14 && 'active'">
              <mdb-icon icon="cog" class="w-25" size=""/><span class="text-uppercase small">Settings</span>
            </mdb-list-group-item>
          </router-link>
        </mdb-list-group>
      </div>
    </div>
    <!-- /Sidebar  -->
    <main>
      <div id="app" class="mt-5 p-4">
        <router-view></router-view>
      </div>
    </main>
    <mdb-navbar class="footer-copyright" color="grey lighten-2" position="bottom">
       <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <span class="navbar-text light-blue-text strong pr-4"><strong>sshportal-ui v{{ packageVersion}}</strong></span>
          <mdb-nav-item href="https://github.com/Whyrl35/sshportal-ui/"><mdb-icon fab icon="github" size="sm"/>GitHub</mdb-nav-item>
          <mdb-nav-item href="https://github.com/Whyrl35/sshportal-ui/issues"><mdb-icon icon="bug" size="xs"/>Issues</mdb-nav-item>
          <mdb-nav-item href="https://buymeacoffee.com/whyrl"><mdb-icon icon="coffee" size="xs"/> Support</mdb-nav-item>
        </mdb-navbar-nav>
        <mdb-navbar-nav right>
          <span class="navbar-text"><small><mdb-icon icon="plug" size="sm"/> connect to <b>{{ this.hostName()}}</b></small></span>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
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
    height: 60px;
    margin-left: 24px;
    margin-top: 5px;
  }

  main {
    background-color: #ededee;
  }

  .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
    background-color: #3F729B;
    color: #fff;
  }
</style>
<style scoped>

.footer-copyright {
  margin-left: 220px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  height: 28px;
  border-top: 1px solid #c9c9c9;
}

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
  beforeUpdate() {
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
    },
    userName() {
      return this.$store.state.user;
    },
    packageVersion() {
      return this.$store.getters.appVersion;
    },
    userEmail() {
      return this.$store.getters.userEmail;
    }
  }

}
</script>