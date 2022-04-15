import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/components/layout';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home'),
        meta: { title: '首页' },
      },
      {
        // 归档
        path: '/archives',
        name: 'archives',
        component: () => import('@/views/archives'),
        meta: {
          title: '归档',
        },
      },
      {
        // 文章
        path: '/articles/:articleId',
        name: 'articles',
        component: () => import('@/views/article'),
      },

      {
        // 关于
        path: '/about',
        name: 'about',
        component: () => import('@/views/about'),
        meta: { title: '关于我' },
      },
      {
        // 留言
        path: '/message',
        name: 'message',
        component: () => import('@/views/message'),
        meta: { title: '留言' },
      },
      {
        path: '/categories',
        component: () => import('@/views/category/'),
        meta: {
          title: '分类',
        },
      },
      {
        path: '/categories/:categoryId',
        component: () => import('@/views/category/components/ArticleList.vue')
      },
      {
        // 标签
        path: '/tags',
        name: 'tags',
        component: () => import('@/views/tags'),
        meta: { title: '标签' },
      },
      {
        path: '/tags/:tagId',
        component: () => import('@/views/category/components/ArticleList.vue')
      },
      {
        path: '/link',
        component: () => import('@/views/link'),
        meta: { title: '友链' },
      },
      {
        path: '/zytqyb',
        component: () => import('@/components/OauthLogin.vue'),
      },
      {
        path: '/oauth/login/weibo',
        component: () => import('@/components/OauthLogin.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
