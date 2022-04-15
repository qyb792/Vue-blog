<template>
  <div id="aside_content" class="aside-content">
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
            <div class="webinfo-article-name">本站总访问量 :</div>
            <div class="webinfo-article-count">{{ blogInfo.viewsCount }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
  data: () => {
    return {
      tip: false,
      time: '',
      obj: {
        output: '',
        isEnd: false,
        speed: 300,
        singleBack: false,
        sleep: 0,
        type: 'rollback',
        backSpeed: 40,
        sentencePause: true,
      },
      articleList: [],
      talkList: [],
      current: 1,
    };
  },
  computed: {
    isRight() {
      return function (index) {
        if (index % 2 === 0) {
          return 'article-cover left-radius';
        }
        return 'article-cover right-radius';
      };
    },
    blogInfo() {
      return this.$store.state.blogInfo;
    },
    isShowSocial() {
      return function (social) {
        return this.blogInfo.websiteConfig.socialUrlList.indexOf(social) !== -1;
      };
    },
  },
  created() {
    // this.init();
    this.listHomeTalks();
    this.timer = setInterval(this.runTime, 1000);
  },
  methods: {
    popUp() {
      this.$message({
        message: '按 CTRL+ D 键将本页加入书签',
        center: true,
        type: 'success',
      });
    },
    // 初始化
    // init() {
    //   document.title = this.blogInfo.websiteConfig.websiteName;
    // },
    listHomeTalks() {
      request('/home/talks').then(({ data }) => {
        this.talkList = data;
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
  },
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 900px) {
  .aside-content {
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
  .aside-content {
    .card-widget {
      margin-left: 15px !important;
      // .card-content {
      //   .card-info-social-icons {
      //   }
      // }
    }
  }
}

@media screen and (min-width: 992px) {
  .aside-content {
    .card-widget {
      margin-left: 15px !important;
      // .card-content {
      //   .card-info-social-icons {
      //   }
      // }
    }
  }
}

@media screen and (min-width: 1200px) {
  .aside-content {
    .card-widget {
      margin-left: 15px !important;

      .card-content {
        padding: 20px 24px;
        // .card-info-social-icons {
        // }
      }
    }
  }
}
</style>

<style lang="less" scoped>
.aside-content {
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
    line-height: 2;
    color: #4c4948;
    margin-left: 0 !important;
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

.toc-list {
  padding: 0 !important;
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
</style>
