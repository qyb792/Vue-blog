<template>
  <div>
    <!-- banner -->
    <SmallBanner :title="`${title} - ${name}`" :articleCover="cover" />

    <div class="article-list-wrapper animate__animated animate__backInUp">
      <div class="article-list">
        <div
          class="article-list-item"
          v-for="item of articleList"
          :key="item.id"
        >
          <el-card class="card" :body-style="{ padding: '0px' }">
            <div class="article-item-cover">
              <router-link :to="'/article/' + item.id" style="height: 100%">
                <img :src="item.articleCover" class="image" />
              </router-link>
            </div>
            <div class="article-item-info">
              <!-- 文章标题 -->
              <div>
                <router-link :to="'/articles/' + item.id">
                  {{ item.articleTitle }}
                </router-link>
              </div>
              <div style="" class="article-info">
                <span>
                  <!-- 发表时间 -->
                  <i class="iconfont iconshijian" />
                  {{ item.createTime | date }}
                </span>
                <!-- 文章分类 -->
                <span>
                  <router-link
                    :to="'/categories/' + item.categoryId"
                    class="float-right"
                  >
                    <i class="el-icon-collection-tag" />{{ item.categoryName }}
                  </router-link>
                </span>
              </div>
            </div>

            <!-- 分割线 -->
            <span class="link" />
            <!-- 文章标签 -->
            <div class="tag-wrapper">
              <router-link
                :to="'/tags/' + tag.id"
                class="tag-btn"
                v-for="tag of item.tagDTOList"
                :key="tag.id"
              >
                {{ tag.tagName }}
              </router-link>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request';
export default {
  data() {
    return {
      current: 1,
      size: 10,
      articleList: [],
      name: '',
      title: '',
    };
  },
  created() {
    const path = this.$route.path;
    if (path.indexOf('/categories') !== -1) {
      this.title = '分类';
    } else {
      this.title = '标签';
    }
    this.infiniteHandler();
  },
  computed: {
    cover() {
      let cover = '';
      this.$store.state.blogInfo.pageList.forEach((item) => {
        if (item.pageLabel === 'articleList') {
          cover = item.pageCover;
        }
      });
      return 'background: url(' + cover + ') center center / cover no-repeat';
    },
  },
  methods: {
    infiniteHandler() {
      request
        .get('/articles/condition', {
          params: {
            categoryId: this.$route.params.categoryId,
            tagId: this.$route.params.tagId,
            current: this.current,
          },
        })
        .then(({ data }) => {
          if (data.name) {
            this.name = data.name;
            document.title = this.title + ' - ' + this.name;
          }
          if (data.articlePreviewDTOList.length) {
            this.current++;
            this.articleList.push(...data.articlePreviewDTOList);
            this.articleList.push(...data.articlePreviewDTOList);
            this.articleList.push(...data.articlePreviewDTOList);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  display: block;
  flex: 1 1 0px;
  max-width: 100%;
  height: 0px;
  max-height: 0px;
  border: solid;
  border-width: thin 0 0 0;
  transition: inherit;
  border-color: #ccc;
}

.tag-wrapper {
  padding: 10px 15px 10px 18px;
}

.tag-btn {
  display: inline-block;
  font-size: 0.725rem;
  line-height: 22px;
  height: 22px;
  border-radius: 10px;
  padding: 0 12px !important;
  background: linear-gradient(to right, #bf4643 0%, #6c9d8f 100%);
  opacity: 0.6;
  margin-right: 0.5rem;
  color: #fff;
}

.article-info {
  display: flex;
  justify-content: space-between;
}

.article-item-info a {
  color: #4c4948;
  text-decoration: none;

  &:hover {
    color: #1976d2;
  }
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.article-item-info {
  line-height: 1.7;
  padding: 15px 15px 12px 18px;
  font-size: 15px;
}

.el-row {
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin-right: -12px;
  margin-left: -12px;
}

.el-card {
  background: #fff;
  color: #4c4948;
  border-radius: 8px;
  box-shadow: 0 4px 8px 6px rgb(7 17 27 / 6%);
  transition: all 0.3s;
  margin: 10px;
}

.el-card__body {
  padding: 0 !important;
  &:hover {
    transition: all 0.3s;
    box-shadow: 0 4px 12px 12px rgb(7 17 27 / 15%);
  }
}

.card {
  .article-item-cover {
    height: 220px;
    overflow: hidden;
  }
  &:hover {
    transition: all 0.5s;
    box-shadow: 0 4px 12px 12px rgb(7 17 27 / 15%);

    .image {
      transition: all 0.5s;
      transform: scale(1.1);
    }
  }
}
</style>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
  height: 100%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>

// 自适应

<style lang="less" scoped>
@media screen and (min-width: 1140px) {
  .article-list-wrapper {
    max-width: 1170px;
    margin: 50px auto 1rem auto;

    .article-list {
      display: flex;
      flex-wrap: wrap;
      margin: -12px;
      .article-list-item {
        flex: 0 0 33.3333333333%;
        max-width: 33.3333333333%;
      }
    }
  }
}
</style>
