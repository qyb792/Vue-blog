<template>
  <div class="recent-post-item" :class="index % 2 === 0 ? '' : 'right'">
    <div class="recent-post-content left">
      <a class="article-content" href="/posts/eac2c3d0/" data-pjax-state=""
        ><div class="article-content-text">
          首页顶栏：“等了这么久，店长终于还是对我动手了。”
        </div></a
      >
      <div class="recent-post-info">
        <a class="article-title" href="/posts/eac2c3d0/" data-pjax-state=""
          ><div class="article-title-link">博客顶栏菜单重写</div></a
        >
        <div class="recent-post-meta">
          <div class="article-meta-wrap">
            <span class="post-meta-date"
              ><i class="el-icon-date"></i
              ><span class="article-meta-label">发表于</span
              ><time
                class="post-meta-date-created"
                datetime="2022-04-15T13:15:03.000Z"
                title="发表于 2022-04-15 13:15:03"
              >
                2022-04-15</time
              >
              <!--
                <span class="article-meta-separator">|</span>
                 <i class="fas fa-history"></i
              ><span class="article-meta-label">更新于</span
              ><time
                class="post-meta-date-updated"
                datetime="2022-04-15T13:15:03.000Z"
                title="更新于 2022-04-15 13:15:03"
              >
                2022-04-15</time
              > --> </span
            ><span class="article-meta"
              ><span class="article-meta-separator">|</span
              ><i class="el-icon-receiving"></i
              ><a
                class="article-meta__categories"
                href="/categories/%F0%9F%8D%A1Akilar%E3%81%AE%E7%B3%96%E8%91%AB%E8%8A%A6/"
                data-pjax-state=""
                >🍡Akilar の糖葫芦</a
              ></span
            ><span class="article-meta tags"
              ><span class="article-meta-separator"> |</span
              ><i class="el-icon-price-tag"></i
              ><a
                class="article-meta__tags"
                href="/tags/%F0%9F%93%81Hexo/"
                data-pjax-state=""
                >📁Hexo</a
              ><span class="article-meta-link">•</span
              ><a
                class="article-meta__tags"
                href="/tags/%F0%9F%A6%8BButterfly/"
                data-pjax-state=""
                >🦋Butterfly</a
              ></span
            >
          </div>
        </div>
      </div>
      <div class="recent-post-cover">
        <img
          class="article-cover entered loaded"
          src="https://npm.elemecdn.com/akilar-candyassets/image/cover5.webp"
          data-lazy-src="https://npm.elemecdn.com/akilar-candyassets/image/cover5.webp"
          onerror='this.onerror=null,this.src="https://npm.elemecdn.com/akilar-candyassets/image/loading.gif"'
          data-ll-status="loaded"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
    },
  },
};
</script>

<style lang="less" scoped>
.recent-post-item {
  background: rgba(255, 255, 255, 0.9) !important;
  margin-bottom: 15px;
  width: 100%;
  background: gba(255, 255, 255, 0.9);
  overflow: hidden;
  border-radius: 15px;
  transform: translateZ(0);
}

.recent-posts .recent-post-item .article-content {
  background: #49b1f5;
  position: relative;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.recent-posts .recent-post-item .article-content .article-content-text {
  -webkit-transition: all 0.8s cubic-bezier(0.59, 0.01, 0.48, 1.17);
  -moz-transition: all 0.8s cubic-bezier(0.59, 0.01, 0.48, 1.17);
  -o-transition: all 0.8s cubic-bezier(0.59, 0.01, 0.48, 1.17);
  -ms-transition: all 0.8s cubic-bezier(0.59, 0.01, 0.48, 1.17);
  transition: all 0.8s cubic-bezier(0.59, 0.01, 0.48, 1.17);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #fff;
  text-shadow: 1px 2px 3px #000;
}

.recent-posts .recent-post-item .recent-post-info {
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  color: #000;
}

.recent-posts .recent-post-item .recent-post-info .article-title {
  height: 50%;
  font-size: 24px;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: end;
  -moz-box-pack: end;
  -o-box-pack: end;
  -ms-flex-pack: end;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.recent-posts .recent-post-item .recent-post-info .recent-post-meta {
  height: 50%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: start;
  -moz-box-pack: start;
  -o-box-pack: start;
  -ms-flex-pack: start;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.recent-posts .recent-post-item .recent-post-info .article-meta-wrap {
  font-size: 12px;
  color: #969797;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.recent-posts .recent-post-item .recent-post-cover {
  position: relative;
  background: 0 0;
}

.recent-posts .recent-post-item .recent-post-cover img.article-cover {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

@media screen and (min-width: 600px) {
  .recent-post-item .recent-post-content.left {
    -webkit-box-direction: reverse;
    -moz-box-direction: reverse;
    -o-box-direction: reverse;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -o-box-orient: horizontal;
    -webkit-flex-direction: row-reverse;
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse;
    right: 9px;
    -webkit-transition: all 0.5s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    -moz-transition: all 0.5s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    -o-transition: all 0.5s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    -ms-transition: all 0.5s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    transition: all 0.5s cubic-bezier(0.59, 0.01, 0.48, 1.17);
  }

  .recent-post-item .recent-post-content.left::before {
    right: calc(23.07% + 40px);
    border-right: 6px solid #fff;
  }

  .recent-post-item .article-content {
    width: 30%;
    height: 200px;
    left: 0;
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .recent-post-item .recent-post-content.left .article-content::before {
    left: -59px;
    border-right: 60px solid #49b1f5;
  }

  .recent-post-item .recent-post-content.left .article-content-text {
    margin: 20px 0 20px 20px;
  }

  .recent-post-item .recent-post-info {
    width: 60%;
    height: 200px;
  }

  .recent-post-item .recent-post-content.left .recent-post-info::before {
    background: -webkit-linear-gradient(right, #fff, transparent);
    background: -moz-linear-gradient(right, #fff, transparent);
    background: -o-linear-gradient(right, #fff, transparent);
    background: -ms-linear-gradient(right, #fff, transparent);
    background: linear-gradient(to left, #fff, transparent);
    right: calc(100% - 1px);
  }

  .recent-post-item .recent-post-info::before {
    content: '';
    width: 200px;
    height: 200px;
    position: absolute;
    z-index: 1;
    top: 0;
  }

  .recent-post-item .recent-post-content.left .recent-post-meta {
    padding: 0 70px 0 20px;
  }

  .recent-post-item .recent-post-info .recent-post-meta > .article-meta-wrap {
    margin: 6px 0;
    color: #858585;
    font-size: 90%;
  }

  .recent-post-item .recent-post-cover {
    width: 40%;
    height: 200px;
  }

  .recent-post-item:hover .recent-post-content.left {
    /* -webkit-transform: translateX(-21%); */
    -moz-transform: translateX(-21%);
    -o-transform: translateX(-21%);
    -ms-transform: translateX(-21%);
    transform: translateX(-21%);
    -webkit-transition: all 0.8s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    -moz-transition: all 0.8s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    -o-transition: all 0.8s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    -ms-transition: all 0.8s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    transition: all 0.8s cubic-bezier(0.59, 0.01, 0.48, 1.17);
  }

  .recent-post-item:hover .recent-post-content.left .article-content-text {
    margin: 20px 60px 20px 20px;
  }
}

@media screen and (min-width: 600px) {
  .recent-post-item .recent-post-content {
    background: rgba(255, 255, 255, 0.9);
    position: relative;
    height: 200px;
    width: 130%;
    z-index: 0;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
    overflow: hidden;
    border: 0 solid;
  }

  .recent-post-item .recent-post-content.left .article-title {
    padding: 0 70px 0 30px;
  }

  .recent-post-item .article-content::before {
    content: '';
    width: 0;
    height: 0;
    background: 0 0;
    position: absolute;
    z-index: 2;
    top: 0;
    border-top: 100px solid transparent;
    border-bottom: 100px solid transparent;
  }

  .recent-post-item .recent-post-info .recent-post-meta > .article-meta-wrap i {
    margin: 0 4px 0 0;
  }

  .recent-post-item
    .recent-post-info
    .recent-post-meta
    > .article-meta-wrap
    .article-meta-label {
    padding-right: 4px;
  }

  .recent-post-item
    .recent-post-info
    .recent-post-meta
    > .article-meta-wrap
    .article-meta-separator {
    margin: 0 6px;
  }
  .recent-post-item .recent-post-info .recent-post-meta > .article-meta-wrap a {
    color: #858585;
  }

  .recent-posts .recent-post-item .recent-post-info .article-title-link {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .recent-posts
    .recent-post-item
    .recent-post-info
    .article-title
    .article-title-link {
    color: #1f2d3d;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    font-size: 24px;
    font-family: Candyhome !important;
    src: url(https://npm.elemecdn.com/akilar-blog@1.0.5/fontsdest/Candyhome.ttf) !important;
  }
}
</style>
