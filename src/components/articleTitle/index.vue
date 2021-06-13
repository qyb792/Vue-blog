<template>
  <div v-if="!isArticleInfo" id="post-info">
    <div id="post-title">
      <div class="posttitle">{{ articleInfo.article.articleTitle }}</div>
    </div>
    <div id="post-meta">
      <div class="meta-firstline">
        <time class="post-meta__date">
          <span class="post-meta__date-created" :title="'发表于' + articleInfo.article.createTime ">
            <i class="fa fa-calendar" />
            发表于 {{ articleInfo.article.createTime | date }}
          </span>
          <span class="post-meta__separator">|</span>
          <span class="post-meta__date-updated" title="更新于 2020-12-22 09:21:40">
            <i class="fa fa-history" />
            更新于 {{ articleInfo.article.updateTime | date }}
          </span>
        </time>
        <span class="post-meta__categories">
          <span class="post-meta__separator">|</span>
          <i class="fa fa-inbox post-meta__icon" />
          <a href="javascript:;" class="post-meta__categories"> Javaweb</a>
        </span>
      </div>
      <div class="meta-secondline">
        <span class="post-meta-wordcount">
          <i class="post-meta__icon fa fa-file-word-o" />
          <span> 字数总计:</span>
          <span class="word-count">{{ articleInfo.article.wordNum }}</span>
          <span class="post-meta__separator">|</span>
          <i class="post-meta__icon fa fa-clock-o" />
          <span> 阅读时长: {{ articleInfo.article.readTimes }}</span>
        </span>
      </div>
      <div class="meta-thirdline">
        <span class="post-meta-pv-cv">
          <span class="post-meta__separator">|</span>
          <i class="fa fa-eye post-meta__icon" />
          <span> 阅读量:</span>
          <span class="busuanzi_value_page_pv">77</span>
        </span>
        <span class="post-meta-commentcount">
          <span class="post-meta__separator">|</span>
          <i class="post-meta__icon fa fa-comment-o" />
          <span> 评论数:</span>
          <a href="javascript:;">
            <span class="valine-comment-count comment-count">10</span>
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    isArticleInfo() {
      return this.articleInfo.article === undefined
    }
  },

  watch: {
    // 监听props的改变跟着改变
    articleInfo: {
      immediate: true, // 这句重要
      handler(val) {
        this.articleInfo = val
      }
    }
  },
  created() {
    // console.log(this.isArticleInfo)
  }
}
</script>

<style>

</style>
