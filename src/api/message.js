import request from '@/utils/request';

// 获取留言列表
export function getMessageList() {
  // 返回一个axios对象 => promise
  return request({
    url: '/message',
  });
}

// export function addMessages(message) {
//   // 返回一个axios对象 => promise
//   return request({
//     url: '/messages',
//     method: 'post',
//     data: message,
//   });
// }
