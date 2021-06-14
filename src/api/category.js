import request from '@/utils/request'

// 获取分类
export function getCategoryList() {
  // 返回一个axios对象 => promise
  return request({
    url: '/category/listCategories'

  })
}

// 获取该分类的文章
export function getCategoryArticle(url, current) {
  // 返回一个axios对象 => promise
  return request({
    url: url,
    params: {
      current
    }
  })
}

