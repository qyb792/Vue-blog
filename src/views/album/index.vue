<template>
  <div>
    <!-- banner -->
    <SmallBanner title="相册" :articleCover="cover" />
    <!-- 相册内容 -->
    <div class="layout">
      <div class="blog-container" id="page">
        <el-row :gutter="20">
          <el-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="12"
            v-for="item of photoAlbumList"
            :key="item.id"
            style="margin-bottom: 20px"
          >
            <div class="album-item">
              <img class="album-cover" :src="item.albumCover" />
              <router-link :to="'/albums/' + item.id" class="album-wrapper">
                <div class="album-name">{{ item.albumName }}</div>
                <div class="album-desc">{{ item.albumDesc }}</div>
              </router-link>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
  created() {
    this.listPhotoAlbums();
  },
  data: function () {
    return {
      photoAlbumList: [],
    };
  },
  methods: {
    listPhotoAlbums() {
      request('/photos/albums').then(({ data }) => {
        console.log(data);
        this.photoAlbumList = data;
      });
    },
  },
  computed: {
    cover() {
      var cover = '';
      this.$store.state.blogInfo.pageList.forEach((item) => {
        if (item.pageLabel === 'album') {
          cover = item.pageCover;
        }
      });
      return 'background: url(' + cover + ') center center / cover no-repeat';
    },
  },
};
</script>

<style scoped>
.album-item {
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background: #000;
  border-radius: 0.5rem !important;
}
.album-cover {
  position: relative;
  max-width: none;
  width: calc(100% + 1.25rem);
  height: 250px;
  opacity: 0.8;
  transition: opacity 0.35s, transform 0.35s;
  transform: translate3d(-10px, 0, 0);
  object-fit: cover;
}
.album-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.8rem 2rem;
  color: #fff !important;
}
.album-item:hover .album-cover {
  transform: translate3d(0, 0, 0);
  opacity: 0.4;
}
.album-item:hover .album-name:after {
  transform: translate3d(0, 0, 0);
}
.album-item:hover .album-desc {
  opacity: 1;
  filter: none;
  transform: translate3d(0, 0, 0);
}
.album-name {
  font-weight: bold;
  font-size: 1.25rem;
  overflow: hidden;
  padding: 0.7rem 0;
  position: relative;
}
.album-name:after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #fff;
  content: '';
  transition: transform 0.35s;
  transform: translate3d(-101%, 0, 0);
}
.album-desc {
  margin: 0;
  padding: 0.4rem 0 0;
  line-height: 1.5;
  opacity: 0;
  transition: opacity 0.35s, transform 0.35s;
  transform: translate3d(100%, 0, 0);
}
</style>
