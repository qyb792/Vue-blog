<template>
  <div class="reply-input-wrapper" style="display: none" ref="reply">
    <textarea
      class="comment-textarea"
      :placeholder="'回复 @' + nickname + '：'"
      auto-grow
      dense
      v-model="commentContent"
    />
    <div class="emoji-container">
      <span
        :class="chooseEmoji ? 'emoji-btn-active' : 'emoji-btn'"
        @click="chooseEmoji = !chooseEmoji"
      >
        <i class="iconfont iconbiaoqing" />
      </span>
      <div style="margin-left: auto">
        <el-button
          @click="cancleReply"
          class="cancle-btn v-comment-btn"
          size="small"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="insertReply"
          class="upload-btn v-comment-btn"
          size="small"
          >提交</el-button
        >
      </div>
    </div>
    <!-- 表情框 -->
    <emoji @addEmoji="addEmoji" :chooseEmoji="chooseEmoji" />
  </div>
</template>

<script>
import Emoji from './Emoji';
import { EmoticonList } from 'qyb-blog-emoticon';

import request from '@/utils/request';
export default {
  components: {
    Emoji,
  },
  props: {
    type: {
      type: Number,
    },
  },
  data: function () {
    return {
      index: 0,
      chooseEmoji: false,
      nickname: '',
      replyUserId: null,
      parentId: null,
      commentContent: '',
    };
  },
  methods: {
    cancleReply() {
      this.$refs.reply.style.display = 'none';
    },
    insertReply() {
      //判断登录
      if (!this.$store.state.userId) {
        this.$store.state.loginFlag = true;
        return false;
      }
      if (this.commentContent.trim() === '') {
        this.$message({ type: 'error', message: '回复不能为空' });
        return false;
      }
      //解析表情
      var reg = /\[.+?\]/g;
      this.commentContent = this.commentContent.replace(reg, function (str) {
        return (
          '<img src= \'' +
          EmoticonList[str] +
          '\' width=\'50\'height=\'50\' style=\'margin: 0 1px;vertical-align: text-bottom\'/>'
        );
      });
      const path = this.$route.path;
      const arr = path.split('/');
      var comment = {
        type: this.type,
        replyUserId: this.replyUserId,
        parentId: this.parentId,
        commentContent: this.commentContent,
      };
      switch (this.type) {
      case 1:
      case 3:
        comment.topicId = arr[2];
        break;
      default:
        break;
      }
      this.commentContent = '';
      request.post('/comments', comment).then((data) => {
        if (data.flag) {
          this.$emit('reloadReply', this.index);
          this.$message({ type: 'success', message: '回复成功' });
        } else {
          this.$message({ type: 'error', message: data.data.message });
        }
      });
    },
    addEmoji(text) {
      this.commentContent += text;
    },
  },
};
</script>

<style scoped>
.reply-input-wrapper {
  border: 1px solid #90939950;
  border-radius: 4px;
  padding: 10px;
  margin: 10px 0 10px 10px;
}
</style>
