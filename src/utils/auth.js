import Cookies from 'js-cookie'

const UserKey = 'blog-user' // 设置一个独一无二的key
const timeKey = 'blog-timetamp-key' // 设置一个独一无二的key
export function getUsername() {
  return Cookies.get(UserKey)
}

export function setUsername(user) {
  return Cookies.set(UserKey, user)
}

export function removeUsername() {
  return Cookies.remove(UserKey)
}

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}

// 读取时间戳
export function setTimeStamp() {
  Cookies.set(timeKey, Date.now())
}
