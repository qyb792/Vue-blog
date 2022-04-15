<template>
  <!-- 搜索框 -->
  <el-dialog
    title="本地搜索"
    :visible="searchFlag"
    width="600px"
    :fullscreen="isMobile"
    destroy-on-close
    :before-close="handleClose"
    top="9vh"
    
  >
    <div slot="title" class="dialog-title">本地搜索</div>

    <div class="search-input-wrapper">
      <input v-model="keywords" placeholder="输入文章标题或内容..." />
    </div>
    <div class="search-result-wrapper">
      <hr />
      <ul>
        <li class="search-reslut" v-for="item of articleList" :key="item.id">
          <!-- 文章标题 -->
          <a @click="goTo(item.id)" v-html="item.articleTitle" />
          <!-- 文章内容 -->
          <p
            class="search-reslut-content text-justify"
            v-html="item.articleContent"
          />
        </li>
      </ul>
      <!-- 搜索结果不存在提示 -->
      <div v-show="flag && articleList.length == 0" style="font-size: 0.875rem">
        找不到您查询的内容：{{ keywords }}
      </div>
    </div>
  </el-dialog>
</template>

<script>
import request from '@/utils/request';
export default {
  data: function () {
    return {
      keywords: '',
      articleList: [],
      flag: false,
    };
  },
  methods: {
    goTo(articleId) {
      this.$store.state.searchFlag = false;
      this.$router.push({ path: '/articles/' + articleId });
    },
    handleClose() {
      this.$store.state.searchFlag = false;
    },
  },
  computed: {
    searchFlag: {
      set(value) {
        this.$store.state.searchFlag = value;
      },
      get() {
        return this.$store.state.searchFlag;
      },
    },
    isMobile() {
      const clientWidth = document.documentElement.clientWidth;
      if (clientWidth > 960) {
        return false;
      }
      return true;
    },
  },
  watch: {
    keywords(value) {
      this.flag = value.trim() !== '' ? true : false;
      request('/articles/search', {
        params: { current: 1, keywords: value },
      }).then((data) => {
        this.articleList = data.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.search-wrapper {
  padding: 1.25rem;
  height: 100%;
  background: #fff !important;
}
.search-title {
  color: #49b1f5;
  font-size: 1.25rem;
  line-height: 1;
}
.search-input-wrapper {
  display: flex;
  padding: 5px;
  height: 35px;
  width: 100%;
  border: 2px solid #8e8cd8;
  border-radius: 2rem;

  & > i {
    width: 24px;
    height: 21px;
  }

  & > input {
    width: 100%;
    margin-left: 5px;
    outline: none;
    background-color: transparent;
    border-style: none;
  }
}

@media (min-width: 960px) {
  .search-result-wrapper {
    padding-right: 5px;
    height: 450px;
    overflow: auto;
  }
}
@media (max-width: 959px) {
  .search-result-wrapper {
    height: calc(100vh - 110px);
    overflow: auto;
  }
}
.search-reslut a {
  color: #555;
  font-weight: bold;
  border-bottom: 1px solid #999;
  text-decoration: none;
}
.search-reslut-content {
  color: #555;
  cursor: pointer;
  border-bottom: 1px dashed #ccc;
  padding: 5px 0;
  line-height: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.divider {
  margin: 20px 0;
  border: 2px dashed #d2ebfd;
}
</style>

<style lang="less" scoped>
.dialog-title {
  color: #49b1f5;
  font-size: 1.25rem;
  line-height: 1;
}

hr {
  position: relative;
  margin: 20px auto;
  width: calc(100% - 4px);
  border: 2px dashed #a4d8fa;
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}

hr:before {
  position: absolute;
  top: -10px;
  left: 5%;
  z-index: 1;
  color: #49b1f5;
  content: '\f0c4';
  font-style: normal;
  font-variant: normal;
  font-size: 20px;
  line-height: 1;
  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
  -ms-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  font-weight: normal;
  font-family: FontAwesome;
}

hr:hover:before {
  /* 计算元素宽度减少20设置给left */
  left: calc(95% - 20px);
}
</style>
