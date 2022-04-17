<template>
  <div>
    <!-- banner -->
    <!-- 封面图 -->
    <SmallBanner
      :article="article"
      :articleValue="articleValue"
      :commentCount="commentCount"
      :articleCover="articleCover"
    />
    <main id="content-inner" class="layout">
      <div id="post">
        <article
          id="write"
          class="article-content markdown-body"
          v-html="article.articleContent"
          ref="article"
        />

        <!-- 版权声明 -->
        <div class="aritcle-copyright">
          <div>
            <span>文章作者：</span>
            <router-link to="/">
              {{ blogInfo.websiteConfig.websiteAuthor }}
            </router-link>
          </div>
          <div>
            <span>文章链接：</span>
            <a :href="articleHref" target="_blank">{{ articleHref }} </a>
          </div>
          <div>
            <span>版权声明：</span>本博客所有文章除特别声明外，均采用
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
            >
              CC BY-NC-SA 4.0
            </a>
            许可协议。转载请注明文章出处。
          </div>
        </div>

        <!-- 转发 -->
        <div class="article-operation">
          <div class="tag-container">
            <router-link
              v-for="item of article.tagDTOList"
              :key="item.id"
              :to="'/tags/' + item.id"
            >
              {{ item.tagName }}
            </router-link>
          </div>
          <share style="margin-left: auto" :config="config" />
        </div>

        <!-- 点赞打赏等 -->
        <div class="article-reward">
          <!-- 点赞按钮 -->
          <a :class="isLike" @click="like">
            <i size="14" class="iconfont icondianzan" color="#fff"></i> 点赞
            <span v-show="article.likeCount > 0">{{ article.likeCount }}</span>
          </a>
          <a class="reward-btn" v-if="blogInfo.websiteConfig.isReward == 1">
            <!-- 打赏按钮 -->
            <i class="iconfont iconerweima" /> 打赏
            <!-- 二维码 -->
            <div class="animated fadeInDown reward-main">
              <ul class="reward-all">
                <li class="reward-item">
                  <img
                    class="reward-img"
                    :src="blogInfo.websiteConfig.weiXinQRCode"
                  />
                  <div class="reward-desc">微信</div>
                </li>
                <li class="reward-item">
                  <img
                    class="reward-img"
                    :src="blogInfo.websiteConfig.alipayQRCode"
                  />
                  <div class="reward-desc">支付宝</div>
                </li>
              </ul>
            </div>
          </a>
        </div>

        <!-- 上一篇 -->
        <div class="pagination-post">
          <div
            :class="isFull(article.lastArticle.id)"
            v-if="article.lastArticle.id"
          >
            <router-link :to="'/articles/' + article.lastArticle.id">
              <img class="post-cover" :src="article.lastArticle.articleCover" />
              <div class="post-info">
                <div class="label">上一篇</div>
                <div class="post-title">
                  {{ article.lastArticle.articleTitle }}
                </div>
              </div>
            </router-link>
          </div>
          <!-- 下一篇 -->
          <div
            :class="isFull(article.nextArticle.id)"
            v-if="article.nextArticle.id"
          >
            <router-link :to="'/articles/' + article.nextArticle.id">
              <img class="post-cover" :src="article.nextArticle.articleCover" />
              <div class="post-info" style="text-align: right">
                <div class="label">下一篇</div>
                <div class="post-title">
                  {{ article.nextArticle.articleTitle }}
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <!-- 分割线 -->
        <hr class="scissors-hr" style="margin: 40px 0" />

        <!-- 推荐文章 -->
        <div
          class="recommend-container"
          v-if="article.recommendArticleList.length"
        >
          <div class="recommend-title">
            <v-icon size="20" color="#4c4948">mdi-thumb-up</v-icon> 相关推荐
          </div>
          <div class="recommend-list">
            <div
              class="recommend-item"
              v-for="item of article.recommendArticleList"
              :key="item.id"
            >
              <router-link :to="'/articles/' + item.id">
                <img class="recommend-cover" :src="item.articleCover" />
                <div class="recommend-info">
                  <div class="recommend-date">
                    <i class="iconfont iconrili" />
                    {{ item.createTime | date }}
                  </div>
                  <div>{{ item.articleTitle }}</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <!-- 评论 -->
        <comment :type="commentType" @getCommentCount="getCommentCount" />
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
              <div class="item-headline" style="margin-bottom: 5px">
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
import Comment from '@/components/Comment';

import request from '@/utils/request';
export default {
  components: {
    SmallBanner,
    Comment,
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
          this.articleValue.readTime =
            Math.round(this.articleValue.wordNum / 400) + '分钟';
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
.layout {
  #post {
    .aritcle-copyright {
      position: relative;
      margin-top: 40px;
      margin-bottom: 10px;
      font-size: 0.875rem;
      line-height: 2;
      padding: 0.625rem 1rem;
      border: 1px solid #eee;

      span {
        color: #49b1f5;
        font-weight: bold;
      }

      a {
        text-decoration: underline !important;
        color: #99a9bf;

        &:hover {
          color: #49b1f5;
        }
      }

      &:before {
        position: absolute;
        top: 0.7rem;
        right: 0.7rem;
        width: 1rem;
        height: 1rem;
        border-radius: 1rem;
        background: #49b1f5;
        content: '';
      }

      &:after {
        position: absolute;
        top: 0.95rem;
        right: 0.95rem;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 0.5em;
        background: #fff;
        content: '';
      }
    }

    .article-operation {
      display: flex;
      align-items: center;
      .tag-container a {
        display: inline-block;
        margin: 0.5rem 0.5rem 0.5rem 0;
        padding: 0 0.75rem;
        width: fit-content;
        border: 1px solid #49b1f5;
        border-radius: 1rem;
        color: #49b1f5 !important;
        font-size: 12px;
        line-height: 2;
      }
      .tag-container a:hover {
        color: #fff !important;
        background: #49b1f5;
        transition: all 0.5s;
      }
    }

    .article-reward {
      margin-top: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .reward-btn {
        position: relative;
        display: inline-block;
        width: 100px;
        background: #49b1f5;
        margin: 0 1rem;
        color: #fff !important;
        text-align: center;
        line-height: 36px;
        font-size: 0.875rem;

        &:hover {
          background: #ec7259;
        }
      }
      .reward-btn:hover .reward-main {
        display: block;
      }
      .reward-main {
        display: none;
        position: absolute;
        bottom: 40px;
        left: 0;
        margin: 0;
        padding: 0 0 15px;
        width: 100%;
      }
      .reward-all {
        display: inline-block;
        margin: 0 0 0 -110px;
        padding: 20px 10px 8px !important;
        width: 320px;
        border-radius: 4px;
        background: #f5f5f5;
      }
      .reward-all:before {
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100%;
        height: 20px;
        content: '';
      }
      .reward-all:after {
        content: '';
        position: absolute;
        right: 0;
        bottom: 2px;
        left: 0;
        margin: 0 auto;
        width: 0;
        height: 0;
        border-top: 13px solid #f5f5f5;
        border-right: 13px solid transparent;
        border-left: 13px solid transparent;
      }
      .reward-item {
        display: inline-block;
        padding: 0 8px;
        list-style-type: none;
      }
      .reward-img {
        width: 130px;
        height: 130px;
        display: block;
      }
      .reward-desc {
        margin: -5px 0;
        color: #858585;
        text-align: center;
      }
      .like-btn {
        display: inline-block;
        width: 100px;
        background: #969696;
        color: #fff !important;
        text-align: center;
        line-height: 36px;
        font-size: 0.875rem;
      }
      .like-btn-active {
        display: inline-block;
        width: 100px;
        background: #ec7259;
        color: #fff !important;
        text-align: center;
        line-height: 36px;
        font-size: 0.875rem;
      }
    }

    .recommend-container {
      margin-top: 40px;
    }

    .pagination-post {
      margin-top: 40px;
      overflow: hidden;
      width: 100%;
      background: #000;
      .post {
        position: relative;
        height: 150px;
        overflow: hidden;
      }
      .post-info {
        position: absolute;
        top: 50%;
        padding: 20px 40px;
        width: 100%;
        transform: translate(0, -50%);
        line-height: 2;
        font-size: 14px;
      }

      .post-cover {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.4;
        transition: all 0.6s;
        object-fit: cover;
      }
      .post a {
        position: relative;
        display: block;
        overflow: hidden;
        height: 150px;
      }
      .post:hover .post-cover {
        opacity: 0.8;
        transform: scale(1.1);
      }
      .label {
        font-size: 90%;
        color: #eee;
      }
      .post-title {
        font-weight: 500;
        color: #fff;
      }

      .full {
        width: 100% !important;
      }
    }
  }
}

@media (min-width: 760px) {
  .article-info span {
    font-size: 95%;
  }
  .article-info-container {
    position: absolute;
    bottom: 6.25rem;
    padding: 0 8%;
    width: 100%;
    text-align: center;
  }
  .second-line,
  .third-line {
    display: inline;
  }
  .article-title {
    font-size: 35px;
    margin: 20px 0 8px;
  }
  .pagination-post {
    display: flex;
  }
  .post {
    width: 50%;
  }
  .recommend-item {
    position: relative;
    display: inline-block;
    overflow: hidden;
    margin: 3px;
    width: calc(33.333% - 6px);
    height: 200px;
    background: #000;
    vertical-align: bottom;
  }
}
@media (max-width: 759px) {
  .article-info span {
    font-size: 90%;
  }
  .separator:first-child {
    display: none;
  }
  .blog-container {
    margin: 322px 5px 0 5px;
  }
  .article-info-container {
    position: absolute;
    bottom: 1.3rem;
    padding: 0 5%;
    width: 100%;
    color: #eee;
    text-align: left;
  }
  .article-title {
    font-size: 1.5rem;
    margin-bottom: 0.4rem;
  }
  .post {
    width: 100%;
  }
  .pagination-post {
    display: block;
  }
  .recommend-item {
    position: relative;
    display: inline-block;
    overflow: hidden;
    margin: 3px;
    width: calc(100% - 4px);
    height: 150px;
    margin: 2px;
    background: #000;
    vertical-align: bottom;
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
</style>
