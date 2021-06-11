<template>
  <div
    id="page-header"
    style="
      opacity: 1;
      animation: 1s ease 0s 1 normal none running headerNoOpacity;
    "
    class=""
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
          <a class="site-page" href="./index.html">
            <i class="iconfont iconzhuye " />
            <span> 首页</span>
          </a>
        </div>
        <div class="menus_item">
          <a class="site-page" href="./index.html">
            <i class="iconfont iconguidang" />
            <span> 归档</span>
          </a>
        </div>
        <div class="menus_item">
          <a class="site-page" href="./index.html">
            <i class="iconfont iconfenlei" />
            <span> 分类</span>
          </a>
        </div>
        <div class="menus_item">
          <a class="site-page" href="./index.html">
            <i class="iconfont iconbiaoqian" />
            <span> 标签</span>
          </a>
        </div>
        <div class="menus_item">
          <a class="site-page" href="./aboutBlog.html">
            <i class="iconfont iconlianjie" />
            <span> 友链</span>
          </a>
        </div>
        <div class="menus_item">
          <a class="site-page" href="./login.html">
            <i class="iconfont iconzhifeiji" />
            <span> 关于我</span>
          </a>
        </div>
        <div class="menus_item">
          <a class="site-page" href="./login.html">
            <i class="iconfont iconpinglunzu" />
            <span> 留言</span>
          </a>
        </div>
        <div class="menus_item">
          <a class="site-page" href="./login.html">
            <i class="iconfont icondenglu" />
            <span> 登录</span>
          </a>
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
export default {}
</script>

<style>
</style>
