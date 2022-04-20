<template>
  <div class="post-item" style="margin: 0 0 20px 0">
    <!-- <div id="github_container" class="githubContainer" style="padding: 10px" /> -->
    <iframe
      id="githubcalen"
      class="iframe"
      src="https://www.bsat1314.top/githubcalendar.html"
      frameborder="0"
      scrolling="no"
    />
  </div>
</template>

<script>
// import github from 'github-calendar'
// import axios from 'axios'
export default {
  data: () => ({}),

  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: 100%;
}
</style>
