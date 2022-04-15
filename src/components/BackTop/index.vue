<template>
  <div id="rightside" class="rightside" :style="isShow">
    <!-- 此处注意空格 -->
    <div :class="'rightside-config-hide ' + isOut">
      <i :class="'iconfont rightside-icon ' + icon" title="夜间模式" @click="check" />
    </div>
    <div id="rightside-config-show" @click="show">
      <div id="rightside_config" title="设置">
        <i class="iconfont iconshezhi setting" />
      </div>
      <i id="go-up" class="iconfont rightside-icon iconziyuanldpi" title="回到顶部" @click="backTop" />
    </div>
  </div>

</template>

<script>
import Cookies from 'js-cookie'
export default {
  data: function() {
    return {
      isShow: '',
      isOut: 'rightside-out',
      icon: 'iconyueliang',
      mode: 'light'
    }
  },
  created() {
    // 判断是否夜间模式
    this.isNightMode(Cookies.get('data-theme'))
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
    // 回到顶部方法
    backTop() {
      window.scrollTo({
        behavior: 'smooth',
        top: 0
      })
    },
    // 为了计算距离顶部的高度，当高度大于100显示回顶部图标，小于100则隐藏
    scrollToTop() {
      const that = this
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 20) {
        that.isShow = 'opacity: 1;transform: translateX(-38px);'
      } else {
        that.isShow = ''
      }
    },
    show() {
      const flag = this.isOut === 'rightside-out'
      this.isOut = flag ? 'rightside-in' : 'rightside-out'
    },
    check() {
      const flag = this.icon === 'iconyueliang'
      this.icon = flag ? 'icontaiyang' : 'iconyueliang'
      // console.log(document.getElementsByTagName('html'))
      this.mode = flag ? 'dark' : 'light'

      document.documentElement.setAttribute('data-theme', this.mode)
      Cookies.set('data-theme', this.mode)
      // this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    isNightMode(mode) {
      if (mode === 'dark') {
        document.documentElement.setAttribute('data-theme', mode)
        this.icon = 'icontaiyang'
        this.mode = mode
      }
    }
  }
}
</script>

<style scoped>
.rightside {
  z-index: 4;
  position: fixed;
  right: -38px;
  bottom: 40px;
  transition: all 0.5s;
}
.rightside-config-hide {
  transform: translate(35px, 0);
}
.rightside-out {
  animation: rightsideOut 0.3s;
}
.rightside-in {
  transform: translate(0, 0) !important;
  animation: rightsideIn 0.3s;
}
#rightside > div > i,
#rightside_config {
  display: block;
  margin-bottom: 2px;
  width: 30px;
  height: 30px;
  background-color: #49b1f5;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 29px;
  cursor: pointer;
}

#rightside_config i {
  display: block;
  -webkit-animation: turn_around 2s linear infinite;
  -moz-animation: turn_around 2s linear infinite;
  -o-animation: turn_around 2s linear infinite;
  -ms-animation: turn_around 2s linear infinite;
  animation: turn_around 2s linear infinite;
}
@keyframes turn-around {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rightsideOut {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(30px, 0);
  }
}
@keyframes rightsideIn {
  0% {
    transform: translate(30px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
