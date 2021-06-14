<template>
  <div>
    <!-- banner -->
    <banner
      :banner-title="'友情链接'"
      :banner-img="'https://cdn.jsdelivr.net/gh/zytqyb/Image-hosting@master/hexo_blog_img/4.4t52zd5w6x40.jpg'"
    />
    <!-- 分类内容 -->
    <main id="content-inner" class="layout_page">
      <div id="link">
        <h2><i class="iconfont iconlianjie link-title" /> 友情链接</h2>
        <div class="flink-list">
          <div v-for="item in friendLinkList" :key="item.id" class="flink-list-item">
            <a
              :href="item.linkAddress"
              :title="item.linkName"
              target="_blank"
            ><img
              :src="item.linkAvatar"
              onerror="this.onerror=null;this.src='/img/friend_404.gif'"
              :alt="item.linkName"
            ><span class="flink-item-name">{{ item.linkName }}</span><span
              class="flink-item-desc"
              :title="item.linkIntro"
            >{{ item.linkIntro }}</span></a>
          </div>
        </div>

        <h2><i class="el-icon-reading link-title" /> 添加友链</h2>
        <blockquote>
          <div>名称：邱同学的小破站</div>
          <div>简介：遇事不决， 可问春风</div>
          <div>头像：头像链接</div>
          <div>博客：博客链接</div>
        </blockquote>

        <div style="margin: 20px 0 !important">
          需要交换友链的可在下方留言💖
        </div>

        <blockquote style="margin-bottom: 40px">
          友链信息展示需要，你的信息格式要包含：名称、介绍、链接、头像
        </blockquote>
        <hr>
      </div>
      <!-- 右侧菜单 -->
      <aside-content />
    </main>
  </div>
</template>

<script>
import { getLinkList } from '@/api/link'
export default {
  data: function() {
    return {
      friendLinkList: [],
      commentList: [],
      count: 0
    }
  },
  created() {
    this.getLinkList()
  },
  methods: {
    async getLinkList() {
      const result = await getLinkList()
      // console.log(result)
      this.friendLinkList = result.data
    }
  }
}
</script>

<style lang="scss" scoped>
#link {
  .link-title {
    color: #2196f3 !important;
    caret-color: #2196f3 !important;
    font-size: 21px;
    font-weight: bold;
    line-height: 2;
  }

  a {
    color: #99a9bf;
    text-decoration: none;
    word-wrap: break-word;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    -o-transition: all 0.2s;
    -ms-transition: all 0.2s;
    transition: all 0.2s;
    overflow-wrap: break-word;
  }

  .link-title {
    margin: 16px 0 !important;
  }
  blockquote {
    line-height: 2;
    margin: 0;
    font-size: 15px;
    border-left: 0.2rem solid #49b1f5;
    padding: 10px 1rem !important;
    background-color: #ecf7fe;
    border-radius: 4px;
  }

  .flink-list {
    overflow: auto;
    padding: 10px 10px 0;
    text-align: center;

    .flink-list-item {
      position: relative;
      float: left;
      overflow: hidden;
      margin: 15px 7px;
      width: calc(100% / 3 - 15px);
      height: 90px;
      border-radius: 8px;
      line-height: 17px;
      transform: translateZ(0);

      &::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        background: #49b1f5;
        content: '';
        -webkit-transition: -webkit-transform 0.3s ease-out;
        -moz-transition: -moz-transform 0.3s ease-out;
        -o-transition: -o-transform 0.3s ease-out;
        -ms-transition: -ms-transform 0.3s ease-out;
        transition: transform 0.3s ease-out;
        -webkit-transform: scale(0);
        -moz-transform: scale(0);
        -o-transform: scale(0);
        -ms-transform: scale(0);
        transform: scale(0);
      }

      &:hover::before {
        transform: scale(1);
      }

      &:hover img {
        transform: rotate(360deg);
      }

      a {
        color: #4c4948;
        text-decoration: none;

        img {
          float: left;
          margin: 15px 10px;
          width: 60px;
          height: 60px;
          border-radius: 35px;
          -webkit-transition: all 0.3s;
          -moz-transition: all 0.3s;
          -o-transition: all 0.3s;
          -ms-transition: all 0.3s;
          transition: all 0.3s;
        }

        .flink-item-name {
          display: block;
          padding: 16px 10px 0 0;
          height: 40px;
          font-weight: bold;
          font-size: 1.43em;
        }

        .flink-item-desc {
          display: block;
          padding: 16px 10px 16px 0;
          height: 50px;
          font-size: 0.93em;
        }
      }
    }
  }
}
</style>
