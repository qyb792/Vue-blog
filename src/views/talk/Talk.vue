<template>
  <div>
    <!-- banner -->
    <SmallBanner title="说说" :articleCover="cover" />
    <!-- 说说内容 -->
    <div class="layout">
      <div id="page">
        <div class="talk-item" v-for="item of talkList" :key="item.id">
          <router-link :to="'/talks/' + item.id">
            <!-- 用户信息 -->
            <div class="user-info-wrapper">
              <el-avatar class="user-avatar">
                <img :src="item.avatar" />
              </el-avatar>

              <div class="user-detail-wrapper">
                <div class="user-nickname">
                  {{ item.nickname }}
                </div>
                <!-- 发表时间 -->
                <div class="time">
                  {{ item.createTime | time }}
                  <span class="top" v-if="item.isTop === 1">
                    <i class="iconfont iconzhiding" /> 置顶
                  </span>
                </div>
                <!-- 说说信息 -->
                <div class="talk-content" v-html="item.content" />
                <!-- 图片列表 -->
                <el-row class="talk-images" v-if="item.imgList" :gutter="10">
                  <el-col
                    :lg="8"
                    :sm="12"
                    :xs="24"
                    v-for="(img, index) of item.imgList"
                    :key="index"
                  >
                    <el-image
                      class="images-items"
                      :src="img"
                      @click.prevent="previewImg(img)"
                      style="width: 100%; max-height: 220px; height: 220px"
                    />
                  </el-col>
                </el-row>
                <!-- 说说操作 -->
                <div class="talk-operation">
                  <div class="talk-operation-item">
                    <i
                      :color="isLike(item.id)"
                      class="iconfont icondianzan like-btn"
                      @click.prevent="like(item)"
                    >
                    </i>
                    <div class="operation-count">
                      {{ item.likeCount === null ? 0 : item.likeCount }}
                    </div>
                  </div>
                  <div class="talk-operation-item">
                    <i class="iconfont iconpinglunzu"></i>
                    <div class="operation-count">
                      {{ item.commentCount === null ? 0 : item.commentCount }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div
          class="load-wrapper"
          v-if="talkList && count > talkList.length"
          @click="listTalks"
        >
          <v-btn outlined> 加载更多... </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
  created() {
    this.listTalks();
  },
  data: function () {
    return {
      current: 1,
      size: 10,
      talkList: [],
      count: 0,
      previewList: [],
    };
  },
  methods: {
    listTalks() {
      request('/talks', {
        params: {
          current: this.current,
          size: this.size,
        },
      }).then(({ data }) => {
        if (this.current === 1) {
          this.talkList = data.recordList;
        } else {
          this.talkList.push(...data.recordList);
        }
        this.talkList.forEach((item) => {
          if (item.imgList) {
            this.previewList.push(...item.imgList);
          }
        });
        this.current++;
        this.count = data.count;
      });
    },
    previewImg(img) {
      this.$imagePreview({
        images: this.previewList,
        index: this.previewList.indexOf(img),
      });
    },
    like(talk) {
      // 判断登录
      if (!this.$store.state.userId) {
        this.$store.state.loginFlag = true;
        return false;
      }
      // 发送请求
      request.post('/talks/' + talk.id + '/like').then((data) => {
        if (data.flag) {
          // 判断是否点赞
          if (this.$store.state.talkLikeSet.indexOf(talk.id) !== -1) {
            this.$set(talk, 'likeCount', talk.likeCount - 1);
          } else {
            this.$set(talk, 'likeCount', talk.likeCount + 1);
          }
          this.$store.commit('talkLike', talk.id);
        }
      });
    },
  },
  computed: {
    cover() {
      var cover = '';
      this.$store.state.blogInfo.pageList.forEach((item) => {
        if (item.pageLabel === 'talk') {
          cover = item.pageCover;
        }
      });
      return 'background: url(' + cover + ') center center / cover no-repeat';
    },
    isLike() {
      return function (talkId) {
        var talkLikeSet = this.$store.state.talkLikeSet;
        return talkLikeSet.indexOf(talkId) !== -1 ? '#eb5055' : '#999';
      };
    },
  },
};
</script>

<style scoped>
.col-xl,
.col-xl-auto,
.col-xl-12,
.col-xl-11,
.col-xl-10,
.col-xl-9,
.col-xl-8,
.col-xl-7,
.col-xl-6,
.col-xl-5,
.col-xl-4,
.col-xl-3,
.col-xl-2,
.col-xl-1,
.col-lg,
.col-lg-auto,
.col-lg-12,
.col-lg-11,
.col-lg-10,
.col-lg-9,
.col-lg-8,
.col-lg-7,
.col-lg-6,
.col-lg-5,
.col-lg-4,
.col-lg-3,
.col-lg-2,
.col-lg-1,
.col-md,
.col-md-auto,
.col-md-12,
.col-md-11,
.col-md-10,
.col-md-9,
.col-md-8,
.col-md-7,
.col-md-6,
.col-md-5,
.col-md-4,
.col-md-3,
.col-md-2,
.col-md-1,
.col-sm,
.col-sm-auto,
.col-sm-12,
.col-sm-11,
.col-sm-10,
.col-sm-9,
.col-sm-8,
.col-sm-7,
.col-sm-6,
.col-sm-5,
.col-sm-4,
.col-sm-3,
.col-sm-2,
.col-sm-1,
.col,
.col-auto,
.col-12,
.col-11,
.col-10,
.col-9,
.col-8,
.col-7,
.col-6,
.col-5,
.col-4,
.col-3,
.col-2,
.col-1 {
  width: 100%;
  padding: 2px !important;
}
.talk-item:not(:first-child) {
  margin-top: 20px;
}
.talk-item {
  padding: 16px 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 3px 8px 6px rgb(7 17 27 / 6%);
  transition: all 0.3s ease 0s;
}

.talk-item a {
  color: #4c4948;
  text-decoration: none;
}

.talk-item a:hover {
  color: #4c4948;
  text-decoration: none;
}

.talk-item:hover {
  box-shadow: 0 5px 10px 8px rgb(7 17 27 / 16%);
  transform: translateY(-3px);
}
.user-info-wrapper {
  width: 100%;
  display: flex;
}
.user-avatar {
  border-radius: 50%;
}
.user-avatar {
  transition: all 0.5s;
}
.user-avatar:hover {
  transform: rotate(360deg);
}
.user-detail-wrapper {
  flex: 1;
  margin-left: 10px;
  width: 0;
}
.user-nickname {
  font-size: 15px;
  font-weight: bold;
  vertical-align: middle;
}
.user-sign {
  margin-left: 4px;
}
.time {
  color: #999;
  margin-top: 2px;
  font-size: 12px;
}
.top {
  color: #ff7242;
  margin-left: 10px;
}
.talk-content {
  margin-top: 8px;
  font-size: 14px;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-all;
}
.talk-images {
  padding: 0 10px;
  margin-top: 8px;
}
.images-items {
  cursor: pointer;
  border-radius: 4px;
}
.talk-operation {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.talk-operation-item {
  display: flex;
  align-items: center;
  margin-right: 40px;
  font-size: 15px;
}
.operation-count {
  margin-left: 4px;
}
.load-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.load-wrapper button {
  background-color: #49b1f5;
  color: #fff;
}
.like-btn:hover {
  color: #eb5055 !important;
}
</style>
