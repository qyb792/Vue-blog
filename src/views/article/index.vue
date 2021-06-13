<template>
  <div>
    <!-- banner -->
    <banner
      :banner-img="img"
      :article="article"
      :article-info="articleInfo"
    >
      <!-- 文章信息 -->
      <template v-slot:articleTitle>
        <articleTitle :article-info="articleInfo" />
      </template>

    </banner>
    <main id="content-inner" class="layout_post">
      <article id="post">
        <article
          ref="article"
          class="article-content markdown-body"
          v-html="article.articleContent"
        />

        <!-- 文章页面作者信息 -->
        <div class="post-copyright">
          <div class="post-copyright__author">
            <span class="post-copyright-meta">文章作者</span>
            <span
              class="post-copyright-info"
            ><a href="javascript:;">{{ article.articleTitle }}</a></span>
          </div>
          <div class="post-copyright__type">
            <span class="post-copyright-meta">文章链接: </span>
            <span
              class="post-copyright-info"
            ><a
              :href="articleHref"
              target="_blank"
            >{{ articleHref }}
            </a></span>
          </div>
          <div class="post-copyright__notice">
            <span class="post-copyright-meta">版权声明: </span>
            <span
              class="post-copyright-info"
            >本博客所有文章除特别声明外，均采用
              <a
                target="__blank"
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              >CC BY-NC-SA 4.0</a>许可协议.转载请注明来自<a
                target="__blank"
                :href="articleHref"
              >邱同学のblog</a>!</span>
          </div>
        </div>
        <!-- <div class="tag_share">
          <div class="post-meta__tag-list">
            <a class="post-meta__tags" href="javascript:;">学习</a>
            <a class="post-meta__tags" href="javascript:;">blog</a>
            <a class="post-meta__tags" href="javascript:;">javaweb</a>
          </div>
        </div> -->
        <!-- 赞赏按钮 -->

        <div class="post-reward">
          <a
            class="reward-button"
            href="javasctipt:;"
            onclick="alert('暂未开放')"
          >
            <i class="fa fa-qrcode" />
            打赏
          </a>
        </div>
      </article>

      <!-- 右侧菜单 -->
      <aside-content />
    </main>
  </div>
</template>

<script>
import articleTitle from '@/components/articleTitle'
import Clipboard from 'clipboard'
import { getArticles } from '@/api/article'
export default {
  components: {
    articleTitle
  },
  data: () => ({
    articleId: 0,
    img: '',
    config: {
      sites: ['qzone', 'wechat', 'weibo', 'qq']
    },
    imgList: [],
    article: {},
    commentList: [],
    count: 0,
    wordNum: '', // 字数统计
    readTime: '', // 阅读时长
    articleHref: window.location.href
  }),
  computed: {
    articleInfo() {
      return { article: this.article, wordNum: this.wordNum, readTime: this.readTime }
    }
  },

  created() {
    this.getArticles()
  },
  methods: {
    async getArticles() {
      const that = this
      this.articleId = this.$route.path.split('/article/')[1]
      const result = await getArticles(this.articleId)

      this.img = result.data.articleCover
      this.article = result.data
      // console.log(result.data)
      this.markdownToHtml(result.data)

      this.$nextTick(() => {
        // 统计文章字数
        this.wordNum = this.deleteHTMLTag(this.article.articleContent).length
        // 计算阅读时间
        this.readTime = Math.round(this.wordNum / 400) + 1 + '分钟'
        // 添加代码复制功能
        this.clipboard = new Clipboard('.copy-btn')
        this.clipboard.on('success', () => {
          this.$message.success('复制成功')
        })
        // 添加图片预览功能
        const imgList = this.$refs.article.getElementsByTagName('img')
        for (var i = 0; i < imgList.length; i++) {
          this.imgList.push(imgList[i].src)
          imgList[i].style.cssText = 'cursor:zoom-in;'
          imgList[i].addEventListener('click', function(e) {
            that.previewImg(e.toElement.src)
          })
        }
      })
    },
    markdownToHtml(article) {
      const MarkdownIt = require('markdown-it')
      const hljs = require('highlight.js')
      const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function(str, lang) {
          // 当前时间加随机数生成唯一的id标识
          const codeIndex = parseInt(Date.now())
          // 复制功能主要使用的是 clipboard.js
          let html = `<button class="copy-btn iconfont iconfuzhi" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}"></button>`
          const linesLength = str.split(/\n/).length - 1
          // 生成行号
          let linesNum = '<span aria-hidden="true" class="line-numbers-rows">'
          for (let index = 0; index < linesLength; index++) {
            linesNum = linesNum + '<span></span>'
          }
          linesNum += '</span>'
          if (lang && hljs.getLanguage(lang)) {
            // highlight.js 高亮代码
            const preCode = hljs.highlight(lang, str, true).value
            html = html + preCode
            if (linesLength) {
              html += '<b class="name">' + lang + '</b>'
            }
            // 将代码包裹在 textarea 中，由于防止textarea渲染出现问题，这里将 "<" 用 "<" 代替，不影响复制功能
            return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
              /<\/textarea>/g,
              '</textarea>'
            )}</textarea>`
          }
        }
      })
      // 将markdown替换为html标签
      article.articleContent = md.render(article.articleContent)
      this.article = article
    },
    previewImg(img) {
      // this.$imagePreview({
      //   images: this.imgList,
      //   index: this.imgList.indexOf(img)
      // })
      this.$hevueImgPreview(img)
    },
    deleteHTMLTag(content) {
      return content
        .replace(/<\/?[^>]*>/g, '')
        .replace(/[|]*\n/, '')
        .replace(/&npsp;/gi, '')
    }
  }
}
</script>

<style lang="scss" scoped>
.layout_post {
  margin: 0 auto;
  padding: 40px 15px;
  max-width: 1200px;
  display: flex;
  align-items: flex-start;
}

.layout_post > #post:hover,
.layout_page > div:first-child:not(.recent-posts):hover {
  -webkit-box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
  box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
}

.layout_post > #post,
.layout_page > div:first-child:not(.recent-posts) {
  width: 75%;
  padding: 50px 40px;
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

/* 文章底部作者信息 */
.layout_post .post-copyright {
  position: relative;
  margin: 40px 0 10px;
  padding: 0.5rem 0.8rem;
  border: 1px solid #eee;
  -webkit-transition: box-shadow 0.3s ease-in-out;
  -moz-transition: box-shadow 0.3s ease-in-out;
  -o-transition: box-shadow 0.3s ease-in-out;
  -ms-transition: box-shadow 0.3s ease-in-out;
  transition: box-shadow 0.3s ease-in-out;
}
.layout_post .post-copyright:before {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background: #49b1f5;
  content: '';
}

.layout_post .post-copyright:after {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background: #fff;
  content: '';
}

.layout_post .post-copyright .post-copyright-meta {
  color: #49b1f5;
  font-weight: bold;
}

.layout_post .post-copyright .post-copyright-info {
  padding-left: 6px;
}

.layout_post .post-copyright .post-copyright-info a {
  text-decoration: underline;
  word-break: break-word;
}

.layout_post .tag_share .post-meta__tag-list {
  display: inline-block;
}

.layout_post .tag_share .post-meta__tags {
  display: inline-block;
  margin: 0.4rem 0.4rem 0.4rem 0;
  padding: 0 0.6rem;
  width: fit-content;
  border: 1px solid #49b1f5;
  border-radius: 0.6rem;
  color: #49b1f5;
  font-size: 12px;
  cursor: pointer;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.layout_post .tag_share .post-meta__tags:hover {
  background-color: #49b1f5;
  color: #fff;
}

/* 打赏按钮 */
.post-reward {
  margin: 75px auto 0;
  width: 100%;
  text-align: center;
}

.post-reward .reward-button {
  position: relative;
  z-index: 1;
  display: inline-block;
  width: 100px;
  background: #49b1f5;
  color: #fff;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
}

.post-reward .reward-button:before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: #ff7242;
  content: '';
  -webkit-transition-timing-function: ease-out;
  -moz-transition-timing-function: ease-out;
  -o-transition-timing-function: ease-out;
  -ms-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  -webkit-transition-duration: 0.5s;
  -moz-transition-duration: 0.5s;
  -o-transition-duration: 0.5s;
  -ms-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-transition-property: -webkit-transform;
  -moz-transition-property: -moz-transform;
  -o-transition-property: -o-transform;
  -ms-transition-property: -ms-transform;
  transition-property: transform;
  -webkit-transform: scaleX(0);
  -moz-transform: scaleX(0);
  -o-transform: scaleX(0);
  -ms-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transform-origin: 0 50%;
  -moz-transform-origin: 0 50%;
  -o-transform-origin: 0 50%;
  -ms-transform-origin: 0 50%;
  transform-origin: 0 50%;
}

.post-reward .reward-button:hover:before {
  -webkit-transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
  -moz-transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
  -o-transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
  -ms-transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
  transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
  -webkit-transform: scaleX(1);
  -moz-transform: scaleX(1);
  -o-transform: scaleX(1);
  -ms-transform: scaleX(1);
  transform: scaleX(1);
}
</style>

<style lang="scss">
.markdown-body blockquote {
  margin: 0 0 1rem;
  padding: 0.1rem 0.8rem;
  border-left: 0.2rem solid #49b1f5;
  background-color: rgba(73, 177, 245, 0.1);
  color: #6a737d;

  p {
    margin: 0 !important;
    padding: 0.5rem 0;
  }
}
pre.hljs {
  padding: 12px 2px 12px 40px !important;
  border-radius: 5px !important;
  position: relative;
  font-size: 14px !important;
  line-height: 22px !important;
  overflow: hidden !important;
  background: #f6f8fa;
  margin: 0 0 1.2rem;
  border-radius: 7px;
  -webkit-box-shadow: 0 5px 10px 0 rgb(144 164 174 / 40%);
  box-shadow: 0 5px 10px 0 rgb(144 164 174 / 40%);

  &:hover .copy-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  code {
    display: block !important;
    margin: 0 10px !important;
    overflow-x: auto !important;
    &::-webkit-scrollbar {
      z-index: 11;
      width: 6px;
    }
    &::-webkit-scrollbar:horizontal {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      width: 6px;
      background: #666;
    }
    &::-webkit-scrollbar-corner,
    &::-webkit-scrollbar-track {
      background: #1e1e1e;
    }
    &::-webkit-scrollbar-track-piece {
      background: #1e1e1e;
      width: 6px;
    }
  }
  .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 12px;
    bottom: 12px;
    left: 0;
    font-size: 100%;
    width: 40px;
    text-align: center;
    letter-spacing: -1px;
    border-right: 1px solid rgba(0, 0, 0, 0.66);
    user-select: none;
    counter-reset: linenumber;
    span {
      pointer-events: none;
      display: block;
      counter-increment: linenumber;
      &:before {
        content: counter(linenumber);
        color: #999;
        display: block;
        text-align: center;
      }
    }
  }
  b.name {
    position: absolute;
    top: 7px;
    right: 45px;
    z-index: 1;
    color: #999;
    pointer-events: none;
  }
  .copy-btn {
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 1;
    color: #ccc;
    background-color: #525252;
    border-radius: 6px;
    display: none;
    font-size: 14px;
    width: 32px;
    height: 24px;
    outline: none;
  }
}
</style>

<style scoped>
.highlight-tools {
    position: relative;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    overflow: hidden;
    min-height: 1.2rem;
    height: 2.15em;
    background: var(--hltools-bg);
    color: var(--hltools-color);
    font-size: var(--global-font-size);
}
</style>
