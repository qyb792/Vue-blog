<template>
  <div>
    <!-- banner -->
    <SmallBanner title="友情链接" :articleCover="cover" />
    <!-- 链接列表 -->
    <div class="layout">
      <div id="post">
        <div class="link-title mb-1">
          <i class="iconfont iconlianjie" color="blue"></i> 大佬链接
        </div>
        <el-row class="link-container">
          <el-col
            class="link-wrapper"
            :lg="8"
            :md="12"
            :sm="24"
            v-for="item of friendLinkList"
            :key="item.id"
          >
            <a :href="item.linkAddress" target="_blank">
              <el-avatar :size="65" class="link-avatar">
                <img :src="item.linkAvatar" />
              </el-avatar>
              <div style="z-index: 10" class="info">
                <div class="link-name">{{ item.linkName }}</div>
                <div class="link-intro">{{ item.linkIntro }}</div>
              </div>
            </a>
          </el-col>
        </el-row>
        <!-- 说明 -->
        <div class="link-title" style="margin: 20px 0">
          <i class="iconfont iconfenlei"></i> 添加友链
        </div>
        <blockquote>
          <div>名称：{{ blogInfo.websiteConfig.websiteName }}</div>
          <div>简介：{{ blogInfo.websiteConfig.websiteIntro }}</div>
          <div>头像：{{ blogInfo.websiteConfig.websiteAvatar }}</div>
        </blockquote>
        <div style="margin: 20px 0">需要交换友链的可在下方留言💖</div>
        <blockquote style="margin: 20px 0">
          友链信息展示需要，你的信息格式要包含：名称、介绍、链接、头像
        </blockquote>
        <!-- 评论 -->
        <Comment :type="this.commentType" />
      </div>

      <aside-content />
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment.vue';
import request from '@/utils/request';
export default {
  components: {
    Comment,
  },
  created() {
    this.listFriendLink();
  },
  data: function () {
    return {
      friendLinkList: [],
      commentType: 2,
    };
  },
  methods: {
    listFriendLink() {
      request.get('/links').then(({ data }) => {
        this.friendLinkList = data;
      });
    },
  },
  computed: {
    blogInfo() {
      return this.$store.state.blogInfo;
    },
    cover() {
      var cover = '';
      this.$store.state.blogInfo.pageList.forEach((item) => {
        if (item.pageLabel === 'link') {
          cover = item.pageCover;
        }
      });
      return 'background: url(' + cover + ') center center / cover no-repeat';
    },
  },
};
</script>

<style scoped>
.info {
  text-align: center;
  width: 70%;
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
.link-title {
  color: #344c67;
  font-size: 21px;
  font-weight: bold;
  line-height: 2;
}
.link-container {
  margin: 10px 10px 0;
}
.link-wrapper {
  position: relative;
  transition: all 0.3s;
  border-radius: 8px;
  padding: 7.5px;
}
.link-avatar {
  margin-top: 5px;
  margin-left: 10px;
  transition: all 0.5s;
}
@media (max-width: 759px) {
  .link-avatar {
    margin-left: 30px;
  }
}
.link-name {
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  z-index: 1000;
}
.link-intro {
  text-align: center;
  padding: 16px 10px;
  height: 50px;
  font-size: 13px;
  color: #1f2d3d;
  width: 100%;
}
.link-wrapper:hover a {
  color: #fff;
}

.link-wrapper:hover .link-intro {
  color: #fff;
}
.link-wrapper:hover .link-avatar {
  /* transform: rotate(360deg); */
  width: 0 !important;
  margin-left: -5px;
}

.link-wrapper:hover .info {
  width: 100%;
}

.link-wrapper a {
  color: #333;
  text-decoration: none;
  display: flex;
  height: 100%;
  width: 100%;
}
.link-wrapper:hover {
  box-shadow: 0 2px 20px #49b1f5;
}
.link-wrapper:hover:before {
  transform: scale(1);
}
.link-wrapper:before {
  position: absolute;
  border-radius: 8px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #49b1f5 !important;
  content: '';
  transition-timing-function: ease-out;
  transition-duration: 0.3s;
  transition-property: transform;
  transform: scale(0);
}
</style>
