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
      // 归档
      path: '/archive',
      name: 'archive',
      component: () => import('@/views/archive'),
      meta: { title: '归档页面' }
    },
    {
      // 文章
      path: '/article/*',
      name: 'article',
      component: () => import('@/views/article')
    },
    {
      // 关于
      path: '/about',
      name: 'about',
      component: () => import('@/views/about'),
      meta: { title: '关于我' }
    },
    {
      // 留言
      path: '/message',
      name: 'message',
      component: () => import('@/views/message'),
      meta: { title: '留言' }
    },
    {
      // 分类
      path: '/category',
      name: 'category',
      component: () => import('@/views/category'),
      meta: { title: '分类' }
    },
    {
      path: '/category/*',
      component: () => import('@/views/category/components/ArticleList')
    },
    {
      // 标签
      path: '/tags',
      name: 'tags',
      component: () => import('@/views/tags'),
      meta: { title: '标签' }
    },
    {
      path: '/tag/*',
      component: () => import('@/views/category/components/ArticleList')
    },
    {
      path: '/link',
      component: () => import('@/views/link'),
      meta: { title: '友链' }
    }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
