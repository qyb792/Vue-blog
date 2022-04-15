<template>
  <div class="post-item" style="margin: 0 0 20px 0">
    <!-- <div id="github_container" class="githubContainer" style="padding: 10px" /> -->
    <iframe id="githubcalen" class="iframe" src="https://www.bsat1314.top/githubcalendar.html" frameborder="0" scrolling="no" />

  </div>
</template>

<script>
// import github from 'github-calendar'
// import axios from 'axios'
export default {
  data: () => ({

  }),

  created() {
    // console.log(github)
    // this.githubCanlendar('zytqyb')
  },
  methods: {
    // githubCanlendar(git_user, git_color) {
    //   axios.get(`https://python-github-calendar-api-jade.vercel.app/api?` + git_user).then(res => {
    //     // var git_githubapiurl = res.data.contributions
    //     // console.log(git_githubapiurl);
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.iframe{
	width: 100%;
	height: 100%;

}
</style>
