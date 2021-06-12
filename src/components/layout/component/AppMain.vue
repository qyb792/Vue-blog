<template>
  <main id="content-inner" class="layout_page">

    <router-view :key="key" />
    <!-- 右侧菜单 -->
    <aside-content />

    <!-- 提示消息 -->
    <!-- <v-snackbar v-model="tip" top color="#49b1f5" :timeout="2000">
      按CTRL+D 键将本页加入书签
    </v-snackbar> -->
  </main>
</template>

<script>
import AsideContent from './AsideContent.vue'
export default {
  name: 'AppMain',
  components: {
    AsideContent
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>

</style>
