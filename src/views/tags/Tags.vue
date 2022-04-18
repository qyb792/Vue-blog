<template>
  <div>
    <!-- banner -->
    <SmallBanner title="标签" :articleCover="cover" />
    <!-- 分类内容 -->
    <main id="content-inner" class="layout">
      <div id="post">
        <div class="tag-cloud-title">标签 - {{ count }}</div>
        <div class="tag-cloud">
          <router-link
            :style="{ 'font-size': Math.floor(Math.random() * 10) + 18 + 'px' }"
            v-for="item of tagList"
            :key="item.id"
            :to="'/tags/' + item.id"
          >
            {{ item.tagName }}
          </router-link>
        </div>
        <hr class="scissors-hr" />
      </div>
      <!-- 右侧菜单 -->
      <aside-content />
    </main>
  </div>
</template>

<script>
import { getTaglsit } from '@/api/tags';
export default {
  data() {
    return {
      tagList: [],
      count: 0,
    };
  },
  created() {
    getTaglsit().then(({ data }) => {
      this.tagList = data.recordList;
      this.count = data.count;
    });
  },
  computed: {
    cover() {
      let cover = '';
      this.$store.state.blogInfo.pageList.forEach((item) => {
        if (item.pageLabel === 'tag') {
          cover = item.pageCover;
        }
      });
      return 'background: url(' + cover + ') center center / cover no-repeat';
    },
  },
};
</script>

<style lang="scss" scoped>
.tag-cloud-title {
  line-height: 2;
  font-size: 36px;
  text-align: center;
}

.tag-cloud {
  text-align: center;

  a {
    color: #4c4948;
    text-decoration: none;

    display: inline-block;
    padding: 0 8px;
    line-height: 2;
    transition: all 0.3s;

    &:hover {
      color: #03a9f4 !important;
      transform: scale(1.1);
    }
  }
}
</style>
