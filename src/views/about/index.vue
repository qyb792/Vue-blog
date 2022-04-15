<template>
  <div>
    <!-- banner -->
    <banner
      :banner-title="'关于我'"
      :banner-img="'https://cdn.jsdelivr.net/gh/zytqyb/Image-hosting@master/hexo_blog_img/bg3.5swlj7vt1gs0.jpg'"
    />
    <!-- 关于我内容 -->
    <main id="content-inner" class="layout_page">
      <div id="archive">
        <div class="about-content markdown-body" v-html="aboutContent" />
      </div>
      <!-- 右侧菜单 -->
      <aside-content />
    </main>
  </div>
</template>

<script>
import { getAboutContent } from '@/api/about'
export default {
  data: function() {
    return {
      aboutContent: ''
    }
  },
  created() {
    this.getAboutContent()
  },
  methods: {
    async getAboutContent() {
      const result = await getAboutContent()
      console.log(result)

      const MarkdownIt = require('markdown-it')
      const md = new MarkdownIt()
      this.aboutContent = md.render(result.data.content)
    }
  }
}
</script>

<style scoped>
.about-banner {
  background: url(https://www.static.talkxj.com/8xy.jpg) center center / cover
    no-repeat;
  background-color: #49b1f5;
}
.about-content {
  word-break: break-word;
  font-size: 1rem;
  line-height: 1.8;
}
</style>
