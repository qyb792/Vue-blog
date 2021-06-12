<template>
  <div id="nav" class="full-page">

    <!-- 头图中间文字 -->
    <div id="site-info">
      <h1 id="site_title">邱同学のblog</h1>
      <div id="site_subtitle">
        <span id="subtitle" />
        <span class="typed-cursor typed-cursor--blink">|</span>
        <div id="clock" />
      </div>
    </div>
    <!-- 下拉按钮 -->
    <div id="scroll_down" @click="scrollDown">
      <i class="el-icon-arrow-down" />
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    // 初始化
    scrollDown() {
      window.scrollTo({
        behavior: 'smooth',
        // 获取当前元素的高度
        top: document.documentElement.clientHeight
      })
      console.log(document.documentElement.clientHeight)
    }
  }
}
</script>

<style>

</style>
