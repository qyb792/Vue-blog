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
        component: () => import('@/views/home/Home.vue'),
        meta: { title: '首页' },
      },
      {
        // 归档
        path: '/archives',
        name: 'archives',
        component: () => import('@/views/archives/Archives.vue'),
        meta: {
          title: '归档',
        },
      },
      {
        // 文章
        path: '/articles/:articleId',
        name: 'articles',
        component: () => import('@/views/article/Article.vue'),
      },
      {
        path: '/albums',
        component: () => import('@/views/album/Album.vue'),
        meta: {
          title: '相册',
        },
      },
      {
        path: '/albums/:albumId',
        component: () => import('@/views/album/Photo.vue'),
      },

      {
        path: '/talks',
        component: () => import('@/views/talk/Talk.vue'),
        meta: {
          title: '说说',
        },
      },
      {
        path: '/talks/:talkId',
        component: () => import('@/views/talk/TalkInfo.vue'),
        meta: {
          title: '说说',
        },
      },

      {
        // 关于
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/About.vue'),
        meta: { title: '关于我' },
      },
      {
        // 留言
        path: '/message',
        name: 'message',
        component: () => import('@/views/message/Message.vue'),
        meta: { title: '留言' },
      },
      {
        path: '/categories',
        component: () => import('@/views/category/Category.vue'),
        meta: {
          title: '分类',
        },
      },
      {
        path: '/categories/:categoryId',
        component: () => import('@/views/category/components/ArticleList.vue'),
      },
      {
        // 标签
        path: '/tags',
        name: 'tags',
        component: () => import('@/views/tags/Tags.vue'),
        meta: { title: '标签' },
      },
      {
        path: '/tags/:tagId',
        component: () => import('@/views/category/components/ArticleList.vue'),
      },
      {
        path: '/links',
        component: () => import('@/views/link/Link.vue'),
        meta: { title: '友链' },
      },

      {
        path: '/user',
        component: () => import('@/views/user/User.vue'),
        meta: {
          title: '个人中心',
        },
      },

      {
        path: '/oauth/login/qq',
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
