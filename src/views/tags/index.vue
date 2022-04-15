<template>
  <div>
    <!-- banner -->
    <SmallBanner title="标签" :articleCover="cover" />
    <!-- 分类内容 -->
    <main id="content-inner" class="layout_page">
      <div id="tags">
        <div class="tag-cloud-title">标签 - 4</div>
        <div class="tag-cloud">
          <router-link
            :style="{ 'font-size': Math.floor(Math.random() * 10) + 18 + 'px' }"
            v-for="item of tagList"
            :key="item.id"
            :to="'/tags/' + item.id"
          >
            {{ item.tagName }}
          </router-link>
        </div>
        <hr />
      </div>
      <!-- 右侧菜单 -->
      <aside-content />
    </main>
  </div>
</template>

<script>
import { getTaglsit } from '@/api/tags';
export default {
  data() {
    return {
      tagList: [],
      count: 0,
    };
  },
  created() {
    getTaglsit().then(({ data }) => {
      this.tagList = data.recordList;
      this.count = data.count;
    });
  },
  computed: {
    cover() {
      let cover = '';
      this.$store.state.blogInfo.pageList.forEach((item) => {
        if (item.pageLabel === 'tag') {
          cover = item.pageCover;
        }
      });
      return 'background: url(' + cover + ') center center / cover no-repeat';
    },
  },
};
</script>

<style lang="scss" scoped>
#tags {
  -o-box-align: center;
  align-items: center;
  padding: 0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 8px 6px rgb(7 17 27 / 6%);
  transition: all 0.3s;
  padding: 50px 40px;

  &:hover {
    box-shadow: 0 4px 12px 12px rgb(7 17 27 / 15%);
  }
}

.tag-cloud-title {
  line-height: 2;
  font-size: 36px;
  text-align: center;
}

.tag-cloud {
  text-align: center;

  a {
    color: #4c4948;
    text-decoration: none;

    display: inline-block;
    padding: 0 8px;
    line-height: 2;
    transition: all 0.3s;

    &:hover {
      color: #03a9f4 !important;
      transform: scale(1.1);
    }
  }
}
</style>

// 自适应
<style lang="less" scoped>
@media screen and (max-width: 900px) {
  .layout {
    flex-wrap: wrap;
  }

  #aside_content {
    margin-top: 20px;
    width: 100% !important;
    .card-widget {
      margin-left: 0 !important;
      .card-content {
        // .card-info-social-icons {
        // }

        .author-info-description {
          font-size: 0.875rem;
        }
      }
    }
  }
}

@media screen and (min-width: 900px) {
  #aside_content {
    .card-widget {
      margin-left: 0px !important;
      // .card-content {
      //   .card-info-social-icons {
      //   }
      // }
    }
  }
}

@media screen and (min-width: 992px) {
  #aside_content {
    .card-widget {
      margin-left: 0px !important;
      // .card-content {
      //   .card-info-social-icons {
      //   }
      // }
    }
  }
}

@media screen and (min-width: 1200px) {
  #aside_content {
    .card-widget {
      margin-left: 0px !important;

      .card-content {
        padding: 20px 24px;
        // .card-info-social-icons {
        // }
      }
    }
  }
}

hr {
  position: relative;
  margin: 20px auto;
  width: calc(100% - 4px);
  border: 2px dashed #a4d8fa;
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}

hr:before {
  position: absolute;
  top: -10px;
  left: 5%;
  z-index: 1;
  color: #49b1f5;
  content: '\f0c4';
  font-style: normal;
  font-variant: normal;
  font-size: 20px;
  line-height: 1;
  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
  -ms-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  font-weight: normal;
  font-family: FontAwesome;
}

hr:hover:before {
  /* 计算元素宽度减少20设置给left */
  left: calc(95% - 20px);
}
</style>
