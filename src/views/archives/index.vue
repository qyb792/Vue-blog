<template>
  <div>
    <!-- banner -->

    <SmallBanner title="归档" :articleCover="cover" />
    <main id="content-inner" class="layout_page">
      <div class="archive" id="archive">
        <timeline>
          <timeline-title> 目前共计{{ count }}篇文章，继续加油 </timeline-title>
          <timeline-item v-for="item of archiveList" :key="item.id">
            <!-- 日期 -->
            <span class="time">{{ item.createTime | date }}</span>
            <!-- 文章标题 -->
            <router-link
              :to="'/articles/' + item.id"
              style="color: #666; text-decoration: none"
            >
              {{ item.articleTitle }}
            </router-link>
          </timeline-item>
        </timeline>

        <el-pagination
          :current-page.sync="current"
          :page-size="10"
          background
          layout="prev, pager, next, jumper"
          :total="count"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 右侧菜单 -->
      <aside-content style="padding-top: 0" />
    </main>
  </div>
</template>

<script>
import { getArchives } from '@/api/archive';
import SmallBanner from '@/components/layout/component/SmallBanner';
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline';
import 'vue-cute-timeline/dist/index.css';
export default {
  data: () => ({
    current: 1,
    count: 0,
    archiveList: [],
  }),
  components: {
    SmallBanner,
    Timeline,
    TimelineItem,
    TimelineTitle,
  },

  created() {
    this.getArchiveList();
    
  },
  computed: {
    cover() {
      var cover = '';
      this.$store.state.blogInfo.pageList.forEach((item) => {
        if (item.pageLabel === 'archive') {
          cover = item.pageCover;
        }
      });
      return 'background: url(' + cover + ') center center / cover no-repeat';
    },
  },
  watch: {
    current(value) {
      getArchives(value).then((data) => {
        this.archiveList = data.data.recordList;
        this.count = data.data.count;
      });
    },
  },
  methods: {
    async getArchiveList() {
      const result = await getArchives(this.current);
      this.archiveList = result.data;
      this.count = result.count;
      // console.log(result)
    },
    // 当页数改变边的时候
    handleCurrentChange(val) {
      this.current = val;
      // this.getArchives();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.archive {
  -o-box-align: center;
  align-items: center;
  padding: 0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 8px 6px rgb(7 17 27 / 6%);
  transition: all 0.3s;
  padding: 50px 40px;
}

.time {
  font-size: 0.75rem;
  color: #555;
  margin-right: 1rem;
}

.timeline-title-circle {
  position: relative;
  &::before {
    position: absolute;
    top: calc(((100% - 36px) / 2));
    left: -9px;
    z-index: 1;
    width: 10px;
    height: 10px;
    border: 5px solid #49b1f5;
    border-radius: 10px;
    background: #fff;
    content: '';
    line-height: 10px;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
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
