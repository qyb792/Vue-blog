import { getBlogInfo, getArticleList } from '@/api/home'
const state = {
  blogInfo: {},
  newBlog: [],
  bannerTitle: '邱同学のblog',
  bannerImg: 'https://cdn.jsdelivr.net/gh/zytqyb/Image-hosting@master/hexo_blog_img/bg.4ynvqn49q400.jpg'
}

// 修改状态
const mutations = {
  setBlogInfo(state, result) {
    // 更新一个对象
    state.blogInfo = result // 这样是响应式
    // state.userInfo = { ...result } // 这样也是响应式 属于浅拷贝
    // state.userInfo['username'] = result // 这样才不是响应式
  },
  // 最新文章
  setNewBlog(state, result) {
    state.newBlog = result
  },
  setBannerTitle(state, result) {
    state.bannerTitle = result
  },
  setBannerImg(state, result) {
    state.bannerImg = result
  }
}

// 执行异步
const actions = {
  // 获取用户资料的actions
  async getBlogInfo(context) {
    const result = await getBlogInfo()
    // console.log(result)
    // 获取用户的详情
    context.commit('setBlogInfo', result.data)
  },
  async getNewBlog(context) {
    const result = await getArticleList(1)
    const newBlog = result.data.slice(0, 4)
    // console.log(newBlog)
    context.commit('setNewBlog', newBlog)
  },
  // 传入当前页面的标题
  getBannerTitle(context, result) {
    context.commit('setBannerTitle', result)
  },
  // 传入当前页面的标题
  getBannerImg(context, result) {
    context.commit('setBannerImg', result)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
