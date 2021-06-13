const getters = {
  avatar: state => state.blog.blogInfo.avatar,
  nickname: state => state.blog.blogInfo.nickname,
  intro: state => state.blog.blogInfo.intro,
  articleCount: state => state.blog.blogInfo.articleCount,
  categoryCount: state => state.blog.blogInfo.categoryCount,
  tagCount: state => state.blog.blogInfo.tagCount,
  newBlog: state => state.blog.newBlog,
  bannerTitle: state => state.blog.bannerTitle,
  bannerImg: state => state.blog.bannerImg,
  loginAvatar: state => state.blog.avatar,
  userId: state => state.blog.userId,
  loginNickname: state => state.blog.nickname
}
export default getters
