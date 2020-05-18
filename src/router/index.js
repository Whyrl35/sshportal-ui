import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Events from '../views/Events.vue'
import Sessions from '../views/Sessions.vue'
import Acls from '../views/Acls.vue'
import Hosts from '../views/Hosts.vue'
import HostGroups from '../views/HostGroups.vue'

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
