<template>
  <div>
    <!-- banner -->
    <SmallBanner title="分类" :articleCover="cover" />
    <!-- 分类内容 -->
    <main id="content-inner" class="layout">
      <div id="post">
        <div class="category-lists">
          <div class="category-title is-center">
            分类 - <span class="category-amount">{{ count }}</span>
          </div>
          <div>
            <ul class="category-list">
              <li
                v-for="item of categoryList"
                :key="item.id"
                class="category-list-item"
              >
                <router-link :to="'/categories/' + item.id">
                  {{ item.categoryName }}
                  <span class="category-count">({{ item.articleCount }})</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <hr class="scissors-hr" />
      </div>
      <!-- 右侧菜单 -->
      <aside-content />
    </main>
  </div>
</template>

<script>
import { getCategoryList } from '@/api/category';
export default {
  data() {
    return {
      categoryList: [],
      count: 0,
    };
  },
  created() {
    getCategoryList().then(({ data }) => {
      this.categoryList = data.recordList;
      this.count = data.count;
    });
  },
  methods: {},
  computed: {
    cover() {
      var cover = '';
      this.$store.state.blogInfo.pageList.forEach((item) => {
        if (item.pageLabel === 'category') {
          cover = item.pageCover;
        }
      });
      return 'background: url(' + cover + ') center center / cover no-repeat';
    },
  },
};
</script>

<style lang="scss" scoped>
#post {
  .category-lists {
    padding: 1rem 0 1.5rem;

    .category-list {
      a {
        color: #4c4948;
        text-decoration: none;
        word-wrap: break-word;
        -webkit-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -o-transition: all 0.2s;
        -ms-transition: all 0.2s;
        transition: all 0.2s;
        overflow-wrap: break-word;
        background-color: transparent;

        &:hover {
          color: #49b1f5;
        }
      }

      .category-list-count {
        margin-left: 0.4rem;
        color: #858585;

        &::before {
          content: '(';
        }

        &::after {
          content: ')';
        }
      }
    }

    .category-title {
      font-size: 2.57em;
    }

    ul {
      margin-top: 0.4rem;
      padding: 0 0 0 1rem;
      list-style: none;
      counter-reset: li;

      li {
        position: relative;
        margin: 0.3rem 0;
        padding: 0.12em 0.4em 0.12em 1.4em;

        &:before {
          position: absolute;
          left: 0;
          cursor: pointer;
          -webkit-transition: all 0.3s ease-out;
          -moz-transition: all 0.3s ease-out;
          -o-transition: all 0.3s ease-out;
          -ms-transition: all 0.3s ease-out;
          transition: all 0.3s ease-out;
          top: 0.4em;
          width: 0.43em;
          height: 0.43em;
          border: 0.215em solid #49b1f5;
          border-radius: 0.43em;
          background: 0 0;
          content: '';
        }

        &:hover:before {
          border-color: #ff7242;
        }
      }
    }
  }
}
</style>
