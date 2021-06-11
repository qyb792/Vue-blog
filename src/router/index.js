import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [{
      path: '/',
      name: 'home',
      component: () => import('@/views/Home'),
      meta: { title: '首页' }
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
