import request from '@/utils/request'

// 登录
export function login(params) {
  // 返回一个axios对象 => promise
  return request({
    url: '/login',
    method: 'post',
    data: params
  })
}

