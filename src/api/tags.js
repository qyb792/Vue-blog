import request from '@/utils/request'

// 获取分类
export function getTaglsit() {
  // 返回一个axios对象 => promise
  return request({
    url: '/tag/tags'

  })
}

