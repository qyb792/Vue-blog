<template>
  <div class="recent-post-item">
    <div
      class="recent-post-content"
      :class="index % 2 === 0 ? 'left' : 'right'"
    >
      <router-link class="article-content" :to="'/articles/' + article.id">
        <div class="article-content-text">
          {{ article.articleContent }}
        </div>
      </router-link>

      <div class="recent-post-info">
        <router-link class="article-title" :to="'/articles/' + article.id">
          <div class="article-title-link">{{ article.articleTitle }}</div>
        </router-link>

        <div class="recent-post-meta">
          <div class="article-meta-wrap">
            <span class="post-meta-date"
              ><i class="el-icon-date"></i
              ><span class="article-meta-label">发表于</span
              ><time
                class="post-meta-date-created"
                :title="`发表于 ${article.createTime}`"
              >
                {{ article.createTime | date }}</time
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
              ><i class="el-icon-receiving"></i>

              <router-link
                :to="'/categories/' + article.categoryId"
                class="article-meta__categories"
              >
                {{ article.categoryName }}
              </router-link>

              <!-- <a
                class="article-meta__categories"
                href="/categories/%F0%9F%8D%A1Akilar%E3%81%AE%E7%B3%96%E8%91%AB%E8%8A%A6/"
                data-pjax-state=""
                >🍡Akilar の糖葫芦
              </a>  --> </span
            ><span class="article-meta tags"
              ><span class="article-meta-separator"> |</span
              ><i class="el-icon-price-tag"></i>
              <router-link
                :to="'/tags/' + tag.id"
                class="article-meta__categories"
                v-for="(tag, index) of article.tagDTOList"
                :key="tag.id"
              >
                {{ tag.tagName }}
                <span
                  v-if="
                    article.tagDTOList.length > 1 &&
                    index !== article.tagDTOList.length - 1
                  "
                  class="article-meta-link"
                  >•</span
                >
              </router-link>
            </span>
          </div>
        </div>
      </div>
      <router-link
        tag="div"
        class="recent-post-cover"
        :to="'/articles/' + article.id"
      >
        <img
          class="article-cover entered loaded"
          :src="article.articleCover"
          :data-lazy-src="article.articleCover"
          onerror='this.onerror=null,this.src="https://npm.elemecdn.com/akilar-candyassets/image/loading.gif"'
          data-ll-status="loaded"
        />
      </router-link>
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
  margin-bottom: 15px;
  width: 100%;
  background: var(--recent-post-bgcolor);
  overflow: hidden;
  border-radius: 15px;
  transform: translateZ(0);
}

.recent-posts .recent-post-item .article-content {
  background: var(--article-content-bgcolor);
  position: relative;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
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
  background: var(--recent-post-bgcolor);
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
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
  display: flex;
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

.recent-posts
  .recent-post-item
  .recent-post-info
  .article-title
  .article-title-link {
  color: var(--text-highlight-color);
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.recent-posts .recent-post-item .recent-post-info .recent-post-meta {
  height: 50%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
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

  .recent-post-item .recent-post-content.both,
  .recent-post-item .recent-post-content.right {
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -o-box-orient: horizontal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    left: calc(-23.07% - 41px);
    -webkit-transition: all 0.5s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    -moz-transition: all 0.5s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    -o-transition: all 0.5s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    -ms-transition: all 0.5s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    transition: all 0.5s cubic-bezier(0.59, 0.01, 0.48, 1.17);
  }

  .recent-post-item .recent-post-content.left::before {
    right: calc(23.07% + 40px);
    border-right: 6px solid var(--recent-post-triangle);
  }

  .recent-post-item .recent-post-content.both::before,
  .recent-post-item .recent-post-content.right::before {
    left: calc(23.07% + 40px);
    border-left: 6px solid var(--recent-post-triangle);
  }

  .recent-post-item .article-content {
    width: 23%;
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
    border-right: 60px solid var(--article-content-bgcolor);
  }

  .recent-post-item .recent-post-content.left .article-content-text {
    margin: 20px 0 20px 20px;
  }

  .recent-post-item .recent-post-info {
    width: 60%;
    height: 200px;
  }

  .recent-post-item .recent-post-content.left .recent-post-info::before {
    background: -webkit-linear-gradient(
      right,
      var(--recent-post-cover-shadow),
      transparent
    );
    background: -moz-linear-gradient(
      right,
      var(--recent-post-cover-shadow),
      transparent
    );
    background: -o-linear-gradient(
      right,
      var(--recent-post-cover-shadow),
      transparent
    );
    background: -ms-linear-gradient(
      right,
      var(--recent-post-cover-shadow),
      transparent
    );
    background: linear-gradient(
      to left,
      var(--recent-post-cover-shadow),
      transparent
    );
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

  .recent-post-item:hover .recent-post-content.right {
    /* -webkit-transform: translateX(-21%); */
    -moz-transform: translateX(21%);
    -o-transform: translateX(21%);
    -ms-transform: translateX(21%);
    transform: translateX(21%);
    -webkit-transition: all 0.8s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    -moz-transition: all 0.8s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    -o-transition: all 0.8s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    -ms-transition: all 0.8s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    transition: all 0.8s cubic-bezier(0.59, 0.01, 0.48, 1.17);
  }

  .recent-post-item:hover .recent-post-content.right .article-content-text {
    margin: 20px 20px 20px 60px;
  }

  .recent-post-item .recent-post-content.both .article-content::before,
  .recent-post-item .recent-post-content.right .article-content::before {
    right: -59px;
    border-left: 60px solid var(--article-content-bgcolor);
  }

  .recent-post-item .recent-post-content.both .article-content-text,
  .recent-post-item .recent-post-content.right .article-content-text {
    margin: 20px 20px 20px 0;
  }

  .recent-post-item .recent-post-content.right .recent-post-info::before {
    background: -webkit-linear-gradient(
      left,
      var(--recent-post-cover-shadow),
      transparent
    );
    background: -moz-linear-gradient(
      left,
      var(--recent-post-cover-shadow),
      transparent
    );
    background: -o-linear-gradient(
      left,
      var(--recent-post-cover-shadow),
      transparent
    );
    background: -ms-linear-gradient(
      left,
      var(--recent-post-cover-shadow),
      transparent
    );
    background: linear-gradient(
      to right,
      var(--recent-post-cover-shadow),
      transparent
    );
    left: calc(100% - 1px);
  }

  .recent-post-item .recent-post-content.both .article-title,
  .recent-post-item .recent-post-content.right .article-title {
    padding: 0 30px 0 70px;
  }

  .recent-post-item .recent-post-content.both .recent-post-meta,
  .recent-post-item .recent-post-content.right .recent-post-meta {
    padding: 0 20px 0 70px;
  }

  .recent-post-item .recent-post-content::before {
    content: '';
    width: 0;
    height: 0;
    background: 0 0;
    position: absolute;
    z-index: 3;
    top: calc(50% - 10px);
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    -webkit-transition: all 0.5s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    -moz-transition: all 0.5s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    -o-transition: all 0.5s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    -ms-transition: all 0.5s cubic-bezier(0.59, 0.01, 0.48, 1.17);
    transition: all 0.5s cubic-bezier(0.59, 0.01, 0.48, 1.17);
  }

  .recent-post-item .recent-post-content.both::before,
  .recent-post-item .recent-post-content.right::before {
    left: calc(23.07% + 40px);
    border-left: 6px solid var(--recent-post-triangle);
  }
}

@media screen and (min-width: 600px) {
  .recent-post-item .recent-post-content {
    background: var(--recent-post-bgcolor);
    position: relative;
    height: 200px;
    width: 130%;
    z-index: 0;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
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

  .recent-post-item
    .recent-post-info
    .recent-post-meta
    > .article-meta-wrap
    a:hover {
    color: #49b1f5;
  }

  .recent-posts .recent-post-item .recent-post-info .article-title-link {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}

@media screen and (max-width: 600px) {
  .recent-post-item {
    height: 400px;
  }

  .recent-post-item .recent-post-content {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -o-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 400px;
  }

  .recent-post-item .recent-post-content .article-content {
    pointer-events: none;
    -webkit-box-ordinal-group: 1;
    -moz-box-ordinal-group: 1;
    -o-box-ordinal-group: 1;
    -ms-flex-order: 1;
    -webkit-order: 1;
    order: 1;
    height: 200px;
    position: absolute;
    width: calc(100% - 40px);
    z-index: 3;
    background: rgba(22, 22, 22, 0.5);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    display: none;
    opacity: 0;
  }

  .recent-post-item
    .recent-post-content
    .article-content
    .article-content-text {
    height: 120px;
    color: #fff;
    width: 80%;
  }

  .recent-post-item .recent-post-content .article-content {
    pointer-events: none;
    -webkit-box-ordinal-group: 1;
    -moz-box-ordinal-group: 1;
    -o-box-ordinal-group: 1;
    -ms-flex-order: 1;
    -webkit-order: 1;
    order: 1;
    height: 200px;
    position: absolute;
    width: calc(100% - 40px);
    z-index: 3;
    background: rgba(22, 22, 22, 0.5);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    display: none;
    opacity: 0;
  }

  .recent-post-item .recent-post-content .recent-post-info {
    -webkit-box-ordinal-group: 3;
    -moz-box-ordinal-group: 3;
    -o-box-ordinal-group: 3;
    -ms-flex-order: 3;
    -webkit-order: 3;
    order: 3 !important;
    height: 200px;
  }

  .recent-post-item .recent-post-content .recent-post-info::before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    z-index: 3;
    bottom: calc(100% - 4px);
    left: 0;
    border-bottom: 50px solid rgba(255, 255, 255, 0.9);
    border-right: 300px solid transparent;
  }

  .recent-post-item .recent-post-content .recent-post-info .article-title {
    padding: 0 35px 0 35px;
  }

  .recent-post-item .recent-post-content .recent-post-info .recent-post-meta {
    padding: 0 30px 0 30px;
  }

  .recent-post-item .recent-post-content .recent-post-info::after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    z-index: 3;
    bottom: calc(100% + 150px);
    right: 0;
    border-top: 50px solid rgba(255, 255, 255, 0.9);
    border-left: 300px solid transparent;
  }

  .recent-post-item .recent-post-content .recent-post-cover {
    -webkit-box-ordinal-group: 2;
    -moz-box-ordinal-group: 2;
    -o-box-ordinal-group: 2;
    -ms-flex-order: 2;
    -webkit-order: 2;
    order: 2;
    height: 200px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    -ms-transition: all 0.5s;
    transition: all 0.5s;
  }

  @keyframes shutter-effect-content {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      -ms-filter: none;
      filter: none;
    }
  }

  @keyframes shutter-effect-content {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      -ms-filter: none;
      filter: none;
    }
  }
  @-moz-keyframes shutter-effect-content {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      -ms-filter: none;
      filter: none;
    }
  }
  @-webkit-keyframes shutter-effect-content {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      -ms-filter: none;
      filter: none;
    }
  }
  @-o-keyframes shutter-effect-content {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      -ms-filter: none;
      filter: none;
    }
  }

  @keyframes shutter-effect-left {
    0% {
      bottom: calc(100% - 4px);
      border-bottom: 50px solid rgba(255, 255, 255, 0.9);
      border-right: 300px solid transparent;
    }
    50% {
      bottom: calc(100% - 4px);
      border-bottom: 200px solid rgba(255, 255, 255, 0.9);
      border-right: 600px solid transparent;
    }
    100% {
      bottom: calc(100% - 4px);
      border-bottom: 50px solid rgba(255, 255, 255, 0.9);
      border-right: 300px solid transparent;
    }
  }

  @keyframes shutter-effect-right {
    0% {
      bottom: calc(100% + 150px);
      border-top: 50px solid rgba(255, 255, 255, 0.9);
      border-left: 300px solid transparent;
    }
    50% {
      bottom: 100%;
      border-top: 200px solid rgba(255, 255, 255, 0.9);
      border-left: 600px solid transparent;
    }
    100% {
      bottom: calc(100% + 150px);
      border-top: 50px solid rgba(255, 255, 255, 0.9);
      border-left: 300px solid transparent;
    }
  }
  .recent-post-item:hover .article-content {
    display: -webkit-box !important;
    display: -moz-box !important;
    display: -webkit-flex !important;
    display: -ms-flexbox !important;
    display: flex !important;
    display: flex !important;
    -webkit-animation: shutter-effect-content 0.5s 2 forwards linear;
    -moz-animation: shutter-effect-content 0.5s 2 forwards linear;
    -o-animation: shutter-effect-content 0.5s 2 forwards linear;
    -ms-animation: shutter-effect-content 0.5s 2 forwards linear;
    animation: shutter-effect-content 0.5s 2 forwards linear;
  }

  .recent-post-item:hover .recent-post-info::before {
    -webkit-animation: shutter-effect-left 0.5s 1 ease-in-out;
    -moz-animation: shutter-effect-left 0.5s 1 ease-in-out;
    -o-animation: shutter-effect-left 0.5s 1 ease-in-out;
    -ms-animation: shutter-effect-left 0.5s 1 ease-in-out;
    animation: shutter-effect-left 0.5s 1 ease-in-out;
  }

  .recent-post-item:hover .recent-post-info::after {
    -webkit-animation: shutter-effect-right 0.5s 1 ease-in-out;
    -moz-animation: shutter-effect-right 0.5s 1 ease-in-out;
    -o-animation: shutter-effect-right 0.5s 1 ease-in-out;
    -ms-animation: shutter-effect-right 0.5s 1 ease-in-out;
    animation: shutter-effect-right 0.5s 1 ease-in-out;
  }

  .recent-post-item:hover .recent-post-cover {
    filter: blur(2px);
  }
}

.recent-posts .recent-post-item .recent-post-info .article-title-link:hover {
  color: #49b1f5 !important;
}
</style>
