import request from '@/utils/request'

// 获取关于我页面的数据
export function getAboutContent() {
  // 返回一个axios对象 => promise
  return request({
    url: '/getAbout'
  })
}
