<template>
  <div v-show="chooseEmoji" class="tabs">
    <el-tabs tab-position="bottom" style="height: 200px">
      <el-tab-pane label="Coolapk">
        <div class="emoji-wrapper">
          <span
            class="emoji-item"
            v-for="(value, key, index) of coolapkList"
            :key="index"
            @click="addEmoji(key)"
          >
            <el-image
              :lazy-src="value"
              :src="value"
              :title="key"
              class="emoji"
              :size="50"
            />
          </span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Emoji">
        <div class="emoji-wrapper">
          <span
            class="emoji-item"
            v-for="(value, key, index) of emojiList"
            :key="index"
            @click="addEmoji(key)"
          >
            <el-image
              :lazy-src="value"
              :src="value"
              :title="key"
              class="emoji"
              :size="50"
            />
          </span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="bilibili2233">
        <div class="emoji-wrapper">
          <span
            class="emoji-item"
            v-for="(value, key, index) of bilibili2233List"
            :key="index"
            @click="addEmoji(key)"
          >
            <el-image
              :lazy-src="value"
              :src="value"
              :title="key"
              class="emoji"
              :size="50"
            />
          </span>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Bilibili">
        <div class="emoji-wrapper">
          <span
            class="emoji-item"
            v-for="(value, key, index) of bilibiliList"
            :key="index"
            @click="addEmoji(key)"
          >
            <el-image
              :lazy-src="value"
              :src="value"
              :title="key"
              class="emoji"
              :size="50"
            />
          </span>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import CoolapkList from '../assets/js/emoticon/coolapk';
// import EmojiList from '../assets/js/emoticon/emoji';
// import Bilibili2233List from '../assets/js/emoticon/bilibili2233';
// import BilibiliList from '../assets/js/emoticon/bilibili';
import {
  CoolapkList,
  EmojiList,
  Bilibili2233List,
  BilibiliList,
} from 'qyb-blog-emoticon';
export default {
  props: {
    chooseEmoji: {
      type: Boolean,
    },
  },
  data: function () {
    return {
      coolapkList: CoolapkList,
      emojiList: EmojiList,
      bilibili2233List: Bilibili2233List,
      bilibiliList: BilibiliList,
    };
  },
  methods: {
    addEmoji(key) {
      this.$emit('addEmoji', key);
    },
  },
};
</script>

<style scoped>
.emoji {
  user-select: none;
  margin: 0.25rem;
  display: inline-block;
  vertical-align: middle;
}
.emoji-item {
  cursor: pointer;
  display: inline-block;
  width: 3.125rem;
  height: 3.125rem;
}
.emoji-item:hover {
  transition: all 0.2s;
  border-radius: 0.25rem;
  background: #dddddd;
}
.emoji-wrapper {
  max-height: 150px;
  min-height: 150px;
  overflow-y: auto;
}
</style>
