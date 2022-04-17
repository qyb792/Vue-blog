<template>
  <div class="post-item" :class="index % 2 === 0 ? '' : 'right'">
    <!-- 首页文章展示头图 -->
    <div class="item-img">
      <router-link :to="'/articles/' + article.id">
        <img class="img1" :src="article.articleCover" alt="文章头图" />
      </router-link>
    </div>

    <div class="recent-post-information">
      <router-link class="article-title" :to="'/articles/' + article.id">
        {{ article.articleTitle }}
      </router-link>

      <div class="article-information">
        <span class="article-meta" v-if="article.isTop == 1">
          <i class="iconfont iconzhiding sticky" />
          <a class="categories sticky" href="javascript:;">置顶</a>
          <span class="separator"> |</span>
        </span>

        <span
          class="article-date"
          :title="('发表于' + article.createTime) | date"
        >
          <i class="el-icon-date" />
          {{ article.createTime | date }}
        </span>
        <span class="article-meta">
          <span class="separator"> |</span>
          <i class="el-icon-receiving" />
          <a class="categories" href="javascript:;">{{
            article.categoryName
          }}</a>
        </span>
        <router-link
          v-for="tag of article.tagDTOList"
          class="article-meta"
          :to="'/tags/' + tag.id"
          :key="tag.id"
        >
          <span class="separator"> |</span>
          <i class="el-icon-price-tag" />
          <span class="categories">{{ tag.tagName }}</span>
        </router-link>
        <div class="content">
          {{ article.articleContent }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
    },
  },
};
</script>

<style lang="less" scoped>
.post-item {
  margin: 0 0 20px;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0;
  height: 280px;
  border-radius: 8px;
  background: #fff;
  -webkit-box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06);
  box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  -ms-transition: all 0.3s;
  transition: all 0.3s;

  .item-img {
    overflow: hidden;
    width: 45%;
    height: 280px;
    border-radius: 8px 0 0 8px;
  }

  &:hover {
    -webkit-box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
    box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
  }

  &:hover .img1 {
    transform: scale(1.1);
  }

  .item-img2 {
    overflow: hidden;
    width: 45%;
    height: 280px;
    border-radius: 0 8px 8px 0;
  }

  /* 文章时间等信息展示 */
  .recent-post-information {
    display: inline-block;
    overflow: hidden;
    padding: 0 40px;
    width: 55%;

    .content {
      overflow: hidden;
      margin-top: 6px;
      line-height: 2;
      color: #4c4948;
      line-height: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 14px;
    }

    .article-date {
      color: #858585;
      cursor: pointer;
      font-size: 13.3px;
    }

    & > i {
      margin-right: 4px;
    }

    .article-title {
      overflow: hidden;
      color: #4c4948;
      font-size: 1.72em;
      line-height: 1.4;
      -webkit-transition: all 0.2s ease-in-out;
      -moz-transition: all 0.2s ease-in-out;
      -o-transition: all 0.2s ease-in-out;
      -ms-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: #49b1f5 !important;
      }
    }
  }
}

.article-meta {
  font-size: 95%;
  color: #858585 !important;
}

.article-information {
  /* 文章标签外部容器 */
  .article-meta {
    color: #858585;
  }

  /* 分隔符 */
  .separator {
    margin-right: 6px;
  }

  .sticky {
    color: #ff7242 !important;
  }
}
.right {
  flex-direction: row-reverse !important;
  .item-img {
    border-radius: 0 8px 8px 0;
  }
}

.post-item {
  margin: 0 0 20px;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0;
  height: 280px;
  border-radius: 8px;
  background: #fff;
  -webkit-box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06);
  box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  -ms-transition: all 0.3s;
  transition: all 0.3s;
}

.post-item:hover {
  -webkit-box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
  box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
}

.item-img {
  overflow: hidden;
  width: 45%;
  height: 280px;
  border-radius: 8px 0 0 8px;
}

.img1 {
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  border: 0;
  -webkit-transition: all 0.6s;
  -moz-transition: all 0.6s;
  -o-transition: all 0.6s;
  -ms-transition: all 0.6s;
  transition: all 0.6s;
  object-fit: cover;
}

.img1:hover {
  transform: scale(1.1);
}

/* 文章时间等信息展示 */
.recent-post-information {
  display: inline-block;
  overflow: hidden;
  padding: 0 40px;
  width: 55%;
}

/* 文章发布时间 */
.recent-post-information .article-date {
  color: #858585;
  cursor: pointer;
  font-size: 13.3px;
}

.recent-post-information i {
  margin-right: 4px;
}

.article-meta .categories {
  color: #858585;
}

.article-meta .categories:hover {
  color: #49b1f5 !important;
  text-decoration: underline;
}

/* 分页 */
#pagination .pagination {
  text-align: center;
}

#pagination .page-number {
  display: inline-block;
  margin: 0 4px;
  min-width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
}

#pagination .pageJump {
  display: inline-block;
  padding-left: 0;
  margin: 0 0 0 60px;
  border-radius: 4px;
  vertical-align: top;
}

#pagination .pageJump input {
  font-size: 16px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #337ab7;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
  width: 40px;
}

#pagination .pageJump button {
  font-size: 16px;
  margin-left: -1px;
  width: 46px;
  height: 26px;
  line-height: 26px;
  color: #337ab7;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
}
</style>
