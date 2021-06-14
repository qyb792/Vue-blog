import { getBlogInfo, getArticleList } from '@/api/home'
const state = {
  blogInfo: {},
  newBlog: [],

  userId: null,
  avatar: null,
  nickname: null
}

// 修改状态
const mutations = {
  login(state, user) {
    state.userId = user.userId
    state.avatar = user.avatar
    state.nickname = user.nickname
  },
  logout(state) {
    state.userId = null
    state.avatar = null
    state.nickname = null
  },
  setBlogInfo(state, result) {
    // 更新一个对象
    state.blogInfo = result // 这样是响应式
    // state.userInfo = { ...result } // 这样也是响应式 属于浅拷贝
    // state.userInfo['username'] = result // 这样才不是响应式
  },
  // 最新文章
  setNewBlog(state, result) {
    state.newBlog = result
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

  login(context, user) {
    context.commit('login', user)
  },
  logout(context) {
    context.commit('logout')
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
