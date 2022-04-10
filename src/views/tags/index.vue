<template>
  <div>
    <!-- banner -->
    <banner
      :banner-title="'标签'"
      :banner-img="'https://cdn.jsdelivr.net/gh/zytqyb/Image-hosting@master/hexo_blog_img/ne78w4%20.6isgm3q70640.jpg'"
    />
    <!-- 分类内容 -->
    <main id="content-inner" class="layout_page">
      <div id="tags">
        <div class="tag-cloud-title">标签 - 4</div>
        <div class="tag-cloud">
          <router-link
            v-for="item of tagList"
            :key="item.tagId"
            :style="{ 'font-size': Math.floor(Math.random() * 10) + 18 + 'px' }"
            :to="'/tag/' + item.tagId"
          >
            {{ item.tagName }}
          </router-link>
        </div>
        <hr>
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
      count: 0
    };
  },
  created() {
    this.getTaglsit();
  },
  methods: {
    async getTaglsit() {
      const result = await getTaglsit();
      this.tagList = result.data;
      this.count = result.count;
      // console.log(result)
    }
  }
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

