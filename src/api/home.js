import request from '@/utils/request'

// 获取首页文章列表
export function getArticleList(current) {
  // 返回一个axios对象 => promise
  return request({
    url: '/article/articles',
    params: {
      current
    }
  })
}

// 获取博客信息
export function getBlogInfo() {
  // 返回一个axios对象 => promise
  return request({
    url: '/blogInfo/getBlogInfo'
  })
}
