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
      component: () => import('@/views/home'),
      meta: { title: '首页' }
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('@/views/archive'),
      meta: { title: '归档页面' }
    }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
