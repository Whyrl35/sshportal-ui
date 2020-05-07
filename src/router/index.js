import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Events from '../views/Events.vue'
import Sessions from '../views/Sessions.vue'
import Acls from '../views/Acls.vue'
import Hosts from '../views/Hosts.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/events',
    name: 'events',
    component: Events,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/sessions',
    name: 'sessions',
    component: Sessions,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/acls',
    name: 'acls',
    component: Acls,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/hosts',
    name: 'hosts',
    component: Hosts,
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
