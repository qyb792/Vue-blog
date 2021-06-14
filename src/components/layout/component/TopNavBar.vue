<template>
  <div
    id="page-header"
    style="
      opacity: 1;
      animation: 1s ease 0s 1 normal none running headerNoOpacity;
    "
    :class="navClass"
  >
    <!-- 网页logo -->
    <span id="blog_name" class="pull_left">
      <router-link
        id="site-name"
        class="blog_title"
        to="/"
      >邱同学のblog</router-link>
    </span>
    <!-- 导航菜单 -->
    <span class="pull_right menus">
      <div class="menus_items">
        <div class="menus_item">
          <router-link to="/" class="site-page">
            <i class="iconfont iconzhuye " />
            <span> 首页</span>
          </router-link>
        </div>
        <div class="menus_item">
          <router-link to="/archive" class="site-page">
            <i class="iconfont iconguidang" />
            <span> 归档</span>
          </router-link>
        </div>
        <div class="menus_item">
          <router-link class="site-page" to="/category">
            <i class="iconfont iconfenlei" />
            <span> 分类</span>
          </router-link>
        </div>
        <div class="menus_item">
          <router-link class="site-page" to="/tags">
            <i class="iconfont iconbiaoqian" />
            <span> 标签</span>
          </router-link>
        </div>
        <div class="menus_item">
          <router-link class="site-page" to="/link">
            <i class="iconfont iconlianjie" />
            <span> 友链</span>
          </router-link>
        </div>
        <div class="menus_item">
          <router-link to="/about" class="site-page">
            <i class="iconfont iconzhifeiji" />
            <span> 关于我</span>
          </router-link>
        </div>
        <div class="menus_item">
          <router-link to="/message" class="site-page">
            <i class="iconfont iconpinglunzu" />
            <span> 留言</span>
          </router-link>
        </div>
        <div class="menus_item user-btn">
          <a v-if="!this.$store.getters.loginAvatar" class="site-page" href="javascript:;" @click="isLogin">
            <i class="iconfont icondenglu" />
            <span> 登录</span>
          </a>
          <template v-else>
            <img
              class="user-avatar"
              :src="this.$store.getters.loginAvatar"
              height="30"
              width="30"
            >
            <ul class="user-submenu">
              <li>
                <a href="#">
                  <i class="iconfont icongerenzhongxin" /> 后台管理
                </a>
              </li>
              <li>
                <a @click="logout"><i class="iconfont icontuichu" /> 退出</a>
              </li>
            </ul>
          </template>

        </div>

      </div>
      <span id="toggle-menu" class="toggle-menu close">
        <a class="site-page">
          <i class="fa fa-bars fa-fw" />
        </a>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      navClass: '',
      top: 58
    }
  },

  mounted() {
    window.addEventListener('scroll', this.scroll)
  },
  methods: {
    isLogin() {
      this.$emit('isLogin')
    },
    logout() {
      this.$store.dispatch('blog/logout')
    },
    scroll() {
      const that = this
      const scrollTop =
       document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop < 58) {
        this.navClass = ''
      } else {
        that.navClass = 'fixed'
        if (scrollTop < this.top) {
          that.navClass = 'fixed visible'
        } else {
          that.navClass = 'fixed'
        }
      }
      this.top = scrollTop
    }
  }
}
</script>

<style>
.el-dialog {
  z-index: 9999;
}
.tx {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: top;
}

.user-avatar {
  cursor: pointer;
  border-radius: 50%;
  vertical-align: top;
}

.user-btn:hover .user-submenu {
  display: block;
}
.user-submenu {
  position: absolute;
  display: none;
  right: 0;
  width: max-content;
  margin-top: 8px;
  box-shadow: 0 5px 20px -4px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  animation: submenu 0.3s 0.1s ease both;
  list-style: none;
}
.user-submenu:before {
  position: absolute;
  top: -8px;
  left: 0;
  width: 100%;
  height: 20px;
  content: "";
}
.user-submenu a {
  line-height: 2;
  color: #4c4948 !important;
  text-shadow: none;
  display: block;
  padding: 6px 14px;
}
.user-submenu a:hover {
  background: #4ab1f4;
}
@keyframes submenu {
  0% {
    opacity: 0;
    filter: alpha(opacity=0);
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    filter: none;
    transform: translateY(0);
  }
}
</style>
