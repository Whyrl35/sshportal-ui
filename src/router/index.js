import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import UserGroups from '../views/UserGroups.vue'
import UserRoles from '../views/UserRoles.vue'

import Events from '../views/Events.vue'
import Sessions from '../views/Sessions.vue'
import Acls from '../views/Acls.vue'
import Hosts from '../views/Hosts.vue'
import HostGroups from '../views/HostGroups.vue'
import UserKeys from '../views/UserKeys.vue'
import Keys from '../views/Keys.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props: { page: 1},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    props: { page: 1 },
    component: Login
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    props: { page: 4},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/groups',
    name: 'groups',
    component: UserGroups,
    props: { page: 5},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/roles',
    name: 'roles',
    component: UserRoles,
    props: { page: 6},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/keys',
    name: 'keys',
    component: Keys,
    props: { page: 7},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/userkeys',
    name: 'userkeys',
    component: UserKeys,
    props: { page: 8},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/hosts',
    name: 'hosts',
    component: Hosts,
    props: { page: 9},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/hostgroups',
    name: 'hostgroups',
    component: HostGroups,
    props: { page: 10},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/acls',
    name: 'acls',
    component: Acls,
    props: { page: 11},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/sessions',
    name: 'sessions',
    component: Sessions,
    props: { page: 12 },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/events',
    name: 'events',
    component: Events,
    props: { page: 13 },
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
