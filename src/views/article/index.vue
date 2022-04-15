<template>
  <div>
    <!-- banner -->
    <!-- 封面图 -->
    <SmallBanner :article="article" :articleValue="articleValue" :commentCount="commentCount" :articleCover="articleCover" />
    <main class="layout">
      <div id="post">
        <article
          id="write"
          class="article-content markdown-body"
          v-html="article.articleContent"
          ref="article"
        />
      </div>
      <div id="aside-content">
        <!-- 博主信息 -->
        <div class="card-widget">
          <div class="card-content">
            <!-- 头像,姓名,签名区域 -->
            <div class="author-wrapper">
              <div class="v-avatar">
                <img
                  class="author-avatar"
                  :src="blogInfo.websiteConfig.websiteAvatar"
                  alt=""
                />
              </div>
              <div class="author-info-name">
                {{ blogInfo.websiteConfig.websiteAuthor }}
              </div>
              <div class="author-info-description">
                {{ blogInfo.websiteConfig.websiteIntro }}
              </div>
            </div>
            <div class="card-info-data">
              <div class="card-info-data-item is-center">
                <a href="javascript:;">
                  <div class="headline">文章</div>
                  <div class="length-num">
                    {{ blogInfo.articleCount }}
                  </div>
                </a>
              </div>
              <div class="card-info-data-item is-center">
                <a href="javascript:;">
                  <div class="headline">分类</div>
                  <div class="length-num">
                    {{ blogInfo.categoryCount }}
                  </div>
                </a>
              </div>
              <div class="card-info-data-item is-center">
                <a href="javascript:;">
                  <div class="headline">标签</div>
                  <div class="length-num">
                    {{ blogInfo.tagCount }}
                  </div>
                </a>
              </div>
            </div>

            <div class="bookmarkwai is-center" @click="popUp">
              <div id="bookmark-it" class="bookmark">
                <i class="el-icon-collection-tag" />
                <span style="padding-left: 10px">加入书签</span>
              </div>
            </div>
            <div class="card-info-social-icons is-center">
              <a
                v-if="isShowSocial('qq')"
                class="social-icon"
                :href="
                  'http://wpa.qq.com/msgrd?v=3&uin=' +
                  blogInfo.websiteConfig.qq +
                  '&site=qq&menu=yes'
                "
                target="_blank"
                ><i class="iconfont iconqq"
              /></a>
              <a
                v-if="isShowSocial('github')"
                class="social-icon"
                :href="blogInfo.websiteConfig.github"
                target="_blank"
                ><i class="iconfont icongithub"
              /></a>
              <a
                v-if="isShowSocial('gitee')"
                class="social-icon"
                target="_blank"
                :href="blogInfo.websiteConfig.gitee"
                ><i class="iconfont icongitee-fill-round"
              /></a>
            </div>
          </div>
        </div>

        <!-- 公告 -->
        <div class="card-widget">
          <div class="card-content">
            <div class="item-headline">
              <i class="el-icon-message-solid card-announcement-animation" />
              <span>公告</span>
            </div>
            <div style="font-size: 0.875rem">
              {{ blogInfo.websiteConfig.websiteNotice }}
            </div>
          </div>
        </div>

        <div class="sticky_layout">
          <!-- 文章目录 -->
          <div class="card-widget">
            <div class="card-content">
              <div class="item-headline">
                <i class="iconfont iconfenlei1" />
                <span>文章目录</span>
              </div>
              <div style="font-size: 0.875rem; margin-left: -25px">
                <div id="toc" />
              </div>
            </div>
          </div>

          <!-- 最新文章 -->
          <div class="card-widget">
            <div class="card-content">
              <div class="item-headline">
                <i class="iconfont icongengxinshijian" />
                <span>最新文章</span>
              </div>
              <div class="article-list">
                <div
                  class="article-item"
                  v-for="item of article.newestArticleList"
                  :key="item.id"
                >
                  <router-link
                    :to="'/articles/' + item.id"
                    class="content-cover"
                  >
                    <img :src="item.articleCover" />
                  </router-link>
                  <div class="content">
                    <div class="content-title">
                      <router-link :to="'/articles/' + item.id">
                        {{ item.articleTitle }}
                      </router-link>
                    </div>
                    <div class="content-time">{{ item.createTime | date }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 网站信息 -->
          <div class="card-widget card-webinfo">
            <div class="card-content">
              <div class="item-headline">
                <i class="el-icon-finished" style="font-size: 18px" />
                <span>网站资讯</span>
              </div>
              <div class="webinfo">
                <div class="webinfo-item">
                  <div class="webinfo-article-name">文章数目</div>
                  <div class="webinfo-article-count">
                    {{ blogInfo.articleCount }}
                  </div>
                </div>
                <div class="webinfo-item">
                  <div class="webinfo-article-name">已运行时间 :</div>
                  <div class="webinfo-article-count">{{ time }}</div>
                </div>
                <div class="webinfo-item">
                  <div class="webinfo-article-name">本站总字数 :</div>
                  <div class="webinfo-article-count">10.6k</div>
                </div>
                <div class="webinfo-item">
                  <div class="webinfo-article-name">本站总访问量 :</div>
                  <div class="webinfo-article-count">
                    {{ blogInfo.viewsCount }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
import tocbot from 'tocbot';
import SmallBanner from '@/components/layout/component/SmallBanner';
import { getIdArticle } from '@/api/article';

import request from '@/utils/request';
export default {
  components: {
    SmallBanner,
  },
  created() {
    this.getArticle();
    this.timer = setInterval(this.runTime, 1000);
  },
  // destroyed() {
  //   this.clipboard.destroy();
  //   tocbot.destroy();
  // },
  data: () => ({
    config: {
      sites: ['qzone', 'wechat', 'weibo', 'qq'],
    },
    time: '',
    imgList: [],
    article: {
      nextArticle: {
        id: 0,
        articleCover: '',
      },
      lastArticle: {
        id: 0,
        articleCover: '',
      },
      recommendArticleList: [],
      newestArticleList: [],
    },
    articleValue: {
      wordNum: '',
      readTime: '',
    },
    commentType: 1,
    articleHref: window.location.href,
    clipboard: null,
    commentCount: 0,
  }),
  methods: {
    popUp() {
      this.$message({
        message: '按 CTRL+ D 键将本页加入书签',
        center: true,
        type: 'success',
      });
    },
    runTime() {
      var timeold =
        new Date().getTime() -
        new Date(this.blogInfo.websiteConfig.websiteCreateTime).getTime();
      var msPerDay = 24 * 60 * 60 * 1000;
      var daysold = Math.floor(timeold / msPerDay);
      var str = '';
      var day = new Date();
      str += daysold + '天';
      str += day.getHours() + '时';
      str += day.getMinutes() + '分';
      // str += day.getSeconds() + '秒';
      this.time = str;
    },
    // 获取并且渲染文章
    getArticle() {
      const that = this;
      getIdArticle(this.$route.params.articleId).then(({ data }) => {
        document.title = data.articleTitle;
        //将markdown转换为Html
        this.markdownToHtml(data);
        this.$nextTick(() => {
          // 统计文章字数
          this.articleValue.wordNum = this.deleteHTMLTag(
            this.article.articleContent
          ).length;
          // 计算阅读时间
          this.articleValue.readTime = Math.round(this.articleValue.wordNum / 400) + '分钟';
          // 添加代码复制功能
          this.clipboard = new Clipboard('.copy-btn');
          this.clipboard.on('success', () => {
            this.$message({ type: 'success', message: '复制成功' });
          });
          // 添加文章生成目录功能
          let nodes = this.$refs.article.children;
          if (nodes.length) {
            for (let i = 0; i < nodes.length; i++) {
              let node = nodes[i];
              let reg = /^H[1-4]{1}$/;
              if (reg.exec(node.tagName)) {
                node.id = i;
              }
            }
          }
          tocbot.init({
            tocSelector: '#toc', //要把目录添加元素位置，支持选择器
            contentSelector: '.article-content', //获取html的元素
            headingSelector: 'h1, h2, h3', //要显示的id的目录
            hasInnerContainers: true,
            onClick: function (e) {
              e.preventDefault();
            },
          });
          // 添加图片预览功能
          const imgList = this.$refs.article.getElementsByTagName('img');
          for (var i = 0; i < imgList.length; i++) {
            this.imgList.push(imgList[i].src);
            imgList[i].addEventListener('click', function (e) {
              that.previewImg(e.target.currentSrc);
            });
          }
        });
      });
    },
    like() {
      // 判断登录
      if (!this.$store.state.userId) {
        this.$store.state.loginFlag = true;
        return false;
      }
      //发送请求
      request.post('/articles/' + this.article.id + '/like').then((data) => {
        if (data.flag) {
          //判断是否点赞
          if (
            this.$store.state.articleLikeSet.indexOf(this.article.id) !== -1
          ) {
            this.$set(this.article, 'likeCount', this.article.likeCount - 1);
          } else {
            this.$set(this.article, 'likeCount', this.article.likeCount + 1);
          }
          this.$store.commit('articleLike', this.article.id);
        }
      });
    },
    markdownToHtml(article) {
      const MarkdownIt = require('markdown-it');
      const hljs = require('highlight.js');
      const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        breaks: true,
        highlight: function (str, lang) {
          // 当前时间加随机数生成唯一的id标识
          var d = new Date().getTime();
          if (
            window.performance &&
            typeof window.performance.now === 'function'
          ) {
            d += performance.now();
          }
          const codeIndex = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (c) {
              var r = (d + Math.random() * 16) % 16 | 0;
              d = Math.floor(d / 16);
              return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
            }
          );
          // 复制功能主要使用的是 clipboard.js
          let html = `<button class="copy-btn iconfont iconfuzhi" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}"></button>`;
          const linesLength = str.split(/\n/).length - 1;
          // 生成行号
          let linesNum = '<span aria-hidden="true" class="line-numbers-rows">';
          for (let index = 0; index < linesLength; index++) {
            linesNum = linesNum + '<span></span>';
          }
          linesNum += '</span>';
          if (lang === null) {
            lang = 'java';
          }
          if (lang && hljs.getLanguage(lang)) {
            // highlight.js 高亮代码
            const preCode = hljs.highlight(lang, str, true).value;
            html = html + preCode;
            if (linesLength) {
              html += '<b class="name">' + lang + '</b>';
            }
            // 将代码包裹在 textarea 中，由于防止textarea渲染出现问题，这里将 "<" 用 "<" 代替，不影响复制功能
            return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
              /<\/textarea>/g,
              '</textarea>'
            )}</textarea>`;
          }
        },
      });
      // 将markdown替换为html标签
      article.articleContent = md.render(article.articleContent);
      this.article = article;
    },
    previewImg(img) {
      this.$imagePreview({
        images: this.imgList,
        index: this.imgList.indexOf(img),
      });
    },
    deleteHTMLTag(content) {
      return content
        .replace(/<\/?[^>]*>/g, '')
        .replace(/[|]*\n/, '')
        .replace(/&npsp;/gi, '');
    },
    getCommentCount(count) {
      this.commentCount = count;
    },
  },
  computed: {
    isShowSocial() {
      return function (social) {
        return this.blogInfo.websiteConfig.socialUrlList.indexOf(social) !== -1;
      };
    },
    blogInfo() {
      return this.$store.state.blogInfo;
    },
    articleCover() {
      return (
        'background: url(' +
        this.article.articleCover +
        ') center center / cover no-repeat'
      );
    },
    isLike() {
      var articleLikeSet = this.$store.state.articleLikeSet;
      return articleLikeSet.indexOf(this.article.id) !== -1
        ? 'like-btn-active'
        : 'like-btn';
    },
    isFull() {
      return function (id) {
        return id ? 'post full' : 'post';
      };
    },
  },
};
</script>

<style lang="less" scoped>
@keyframes header-effect {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-50px);
    -moz-transform: translateY(-50px);
    -o-transform: translateY(-50px);
    -ms-transform: translateY(-50px);
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -o-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}

.banner {
  .article-category a {
    color: #fff;

    &:hover {
      color: #fff;
    }
  }

  height: 25rem;
  position: relative;
  width: 100%;
  background-color: #49b1f5;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  animation: header-effect 1s;
  color: #fff;

  &:before {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
  }

  .article-info-container {
    position: absolute;
    bottom: 6.25rem;
    padding: 0 8%;
    width: 100%;
    text-align: center;

    .article-title {
      font-size: 40px;
      margin: 20px 0 8px;
    }

    .article-info {
      color: #eee;
      font-size: 95%;
    }
  }
}

@media screen and (max-width: 900px) {
  .layout_post {
    flex-wrap: wrap;
  }

  #post {
    width: 100% !important;
  }
}
</style>

<style lang="scss">
pre.hljs {
  padding: 12px 2px 12px 40px !important;
  border-radius: 5px !important;
  position: relative;
  font-size: 14px !important;
  line-height: 22px !important;
  overflow: hidden !important;
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

<style lang="less" scoped>
.layout {
  display: flex;
  box-flex: 1;
  flex: 1 auto;
  margin: 0 auto;
  padding: 40px 15px;
  max-width: 1200px;
  width: 100%;

  & > #post {
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    -ms-transition: all 0.3s;
    transition: all 0.3s;
    width: 74%;
    align-self: flex-start;
    -ms-flex-item-align: start;
    padding: 50px 40px;
  }

  & > #aside-content {
    width: 26%;
  }
}

@media screen and (min-width: 900px) {
  #aside-content {
    padding-left: 15px;
  }
}
</style>

<style lang="scss">
pre.hljs {
  padding: 12px 2px 12px 40px !important;
  border-radius: 5px !important;
  position: relative;
  font-size: 14px !important;
  line-height: 22px !important;
  overflow: hidden !important;
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

// 自适应
<style lang="less" scoped>
@media screen and (max-width: 900px) {
  .layout {
    flex-wrap: wrap;
  }

  #aside-content {
    margin-top: 20px;
    width: 100% !important;
    .card-widget {
      margin-left: 0 !important;
      .card-content {
        // .card-info-social-icons {
        // }

        .author-info-description {
          font-size: 0.875rem;
        }
      }
    }
  }
}

@media screen and (min-width: 900px) {
  #aside-content {
    .card-widget {
      margin-left: 0px !important;
      // .card-content {
      //   .card-info-social-icons {
      //   }
      // }
    }
  }
}

@media screen and (min-width: 992px) {
  #aside-content {
    .card-widget {
      margin-left: 0px !important;
      // .card-content {
      //   .card-info-social-icons {
      //   }
      // }
    }
  }
}

@media screen and (min-width: 1200px) {
  #aside-content {
    .card-widget {
      margin-left: 0px !important;

      .card-content {
        padding: 20px 24px;
        // .card-info-social-icons {
        // }
      }
    }
  }
}
</style>

// 右侧菜单栏
<style lang="less" scoped>
#aside-content {
  line-height: 2;
  color: #4c4948;
  .author-wrapper {
    text-align: center;
    .v-avatar {
      height: 110px;
      min-width: 110px;
      width: 110px;
      align-items: center;
      border-radius: 50%;
      display: inline-flex;
      justify-content: center;
      line-height: normal;
      position: relative;
      text-align: center;
      vertical-align: middle;
      overflow: hidden;

      .author-avatar {
        transition: all 0.5s;
        border-radius: inherit;
        display: inline-flex;
        height: inherit;
        width: inherit;

        &:hover {
          -webkit-transform: rotateZ(540deg);
          -moz-transform: rotateZ(540deg);
          -o-transform: rotateZ(540deg);
          -ms-transform: rotateZ(540deg);
          transform: rotateZ(540deg);
        }
      }
    }
  }

  .author-info-name {
    font-size: 1.375rem;
    margin-top: 0.625rem;
  }

  .card-info-data {
    padding: 14px 0;
    display: flex;

    .card-info-data-item {
      flex: 1;

      .headline {
        display: block;
        overflow: hidden;
        color: #4c4948;
        text-overflow: ellipsis;
        font-size: 0.875rem;
      }

      .length-num {
        color: #000;
        font-size: 1.25rem;
      }
    }
  }

  .card-widget {
    overflow: hidden;
    border-radius: 8px;
    background: #fff;
    -webkit-box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06);
    box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    -ms-transition: all 0.3s;
    transition: all 0.3s;
    margin-bottom: 20px;
    .card-content {
      .item-headline {
        font-size: 1rem;

        .card-announcement-animation {
          font-size: 18px;
          color: #f00 !important;
          -webkit-animation: announ_animation 0.8s linear infinite;
          -moz-animation: announ_animation 0.8s linear infinite;
          -o-animation: announ_animation 0.8s linear infinite;
          -ms-animation: announ_animation 0.8s linear infinite;
          animation: announ_animation 0.8s linear infinite;
        }
        & > span {
          margin-left: 10px;
        }
      }
      padding: 20px 24px;
      .card-info-social-icons {
        margin: 6px 0 -12px;

        & > a:hover {
          color: #4c4948;
        }

        .social-icon {
          margin: 0 10px;
          color: #4c4948;
          font-size: 1.5rem;

          & > i {
            -webkit-transition: all 0.3s;
            -moz-transition: all 0.3s;
            -o-transition: all 0.3s;
            -ms-transition: all 0.3s;
            transition: all 0.3s;
            display: inline-block;

            &:hover {
              -webkit-transform: rotateZ(540deg);
              -moz-transform: rotateZ(540deg);
              -o-transform: rotateZ(540deg);
              -ms-transform: rotateZ(540deg);
              transform: rotateZ(540deg);
            }
          }
        }
      }

      .bookmarkwai {
        .bookmark {
          text-align: center;
          z-index: 1;
          font-size: 14px;
          position: relative;
          display: block;
          background-color: #49b1f5;
          color: #fff !important;
          height: 32px;
          line-height: 32px;
          transition-duration: 1s;
          transition-property: color;
        }
      }
    }
  }
}
.card-webinfo {
  .webinfo {
    padding: 0.25rem;
    font-size: 0.875rem;

    .webinfo-item {
      display: flex;
      justify-content: space-between;
    }
  }
}

.sticky_layout {
  position: sticky;
  position: -webkit-sticky;
  top: px;
  -webkit-transition: top 0.3s;
  -moz-transition: top 0.3s;
  -o-transition: top 0.3s;
  -ms-transition: top 0.3s;
  transition: top 0.3s;
}

.article-list {
  img {
    width: 100%;
    height: 100%;
    transition: all 0.6s;
    object-fit: cover;

    &:hover {
      transform: scale(1.1);
    }
  }

  .content-title a {
    transition: all 0.2s;
    font-size: 100%;
    color: #4c4948;
    text-decoration: none;
    &:hover {
      color: #2ba1d1;
    }
  }
  .article-item {
    display: flex;
    align-items: center;
    padding: 6px 0;

    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      padding-bottom: 0;
    }
    &:not(:last-child) {
      border-bottom: 1px dashed #f5f5f5;
    }
  }

  .content {
    flex: 1;
    padding-left: 10px;
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
  }
  .content-cover {
    width: 58.8px;
    height: 58.8px;
    overflow: hidden;

    & > a {
      transition: all 0.2s;
      font-size: 95%;
      &:hover {
        color: #2ba1d1;
      }
    }
  }
}
.content-time {
  color: #858585;
  font-size: 85%;
  line-height: 2;
}
</style>
