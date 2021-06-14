import request from '@/utils/request'

// 获取友情链接列表
export function getLinkList() {
  // 返回一个axios对象 => promise
  return request({
    url: '/friendLink/listLinks'

  })
}

