import request from '@/utils/request'

// 获取首页文章列表
export function getArchives(current) {
  // 返回一个axios对象 => promise
  return request({
    url: '/articles/archives',
    params: {
      current
    }
  })
}
