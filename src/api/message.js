import request from '@/utils/request'

// 获取留言列表
export function getMessageList() {
  // 返回一个axios对象 => promise
  return request({
    url: '/message/getMessageList'
  })
}

export function addMessages(message) {
  // 返回一个axios对象 => promise
  return request({
    url: '/message/messages',
    method: 'post',
    data: message
  })
}

