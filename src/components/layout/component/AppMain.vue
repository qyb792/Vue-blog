<template>
  <div>

    <router-view :key="key" />

    <!-- 提示消息 -->
    <!-- <v-snackbar v-model="tip" top color="#49b1f5" :timeout="2000">
      按CTRL+D 键将本页加入书签
    </v-snackbar> -->
  </div>

</template>

<script>

export default {
  name: 'AppMain',
  components: {

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
