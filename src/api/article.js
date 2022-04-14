import request from '@/utils/request';

// 获取归档文章列表
export function getArticles(articleId) {
  // 返回一个axios对象 => promise
  return request({
    url: `/articles/${articleId}`,
  });
}

export function getIdArticle(articleId) {
  // 返回一个axios对象 => promise
  return request({
    url: `/articles/${articleId}`,
  });
}
