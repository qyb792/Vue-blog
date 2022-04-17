<template>
  <div>
    <!-- banner -->
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">{{ photoAlbumName }}</h1>
    </div>
    <!-- 相册列表 -->
    <div class="layout">
      <div id="page">
        <div
          class="photo-wrap"
          v-infinite-scroll="infiniteHandler"
          style="overflow: auto"
        >
          <img
            v-for="(item, index) of photoList"
            class="photo"
            :key="index"
            :src="item"
            @click="preview(index)"
          />
        </div>
        <!-- 无限加载 -->
        <!-- <infinite-loading @infinite="infiniteHandler">
        <div slot="no-more" />
        <div slot="no-results" />
      </infinite-loading> -->
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
  data: function () {
    return {
      photoAlbumName: '',
      photoAlbumCover: '',
      photoList: [],
      current: 1,
      size: 10,
    };
  },

  methods: {
    preview(index) {
      this.$imagePreview({
        images: this.photoList,
        index: index,
      });
    },
    infiniteHandler() {
      request('/albums/' + this.$route.params.albumId + '/photos', {
        params: {
          current: this.current,
          size: this.size,
        },
      }).then(({ data }) => {
        this.photoAlbumCover = data.photoAlbumCover;
        this.photoAlbumName = data.photoAlbumName;
        if (data.photoList.length) {
          this.current++;
          this.photoList.push(...data.photoList);
        }
      });
    },
  },
  computed: {
    cover() {
      return (
        'background: url(' +
        this.photoAlbumCover +
        ') center center / cover no-repeat'
      );
    },
  },
};
</script>

<style scoped>
.photo-wrap {
  display: flex;
  flex-wrap: wrap;
}
.photo {
  margin: 3px;
  cursor: pointer;
  flex-grow: 1;
  object-fit: cover;
  height: 200px;
}
.photo-wrap::after {
  content: '';
  display: block;
  flex-grow: 9999;
}
@media (max-width: 759px) {
  .photo {
    width: 100%;
  }
}
</style>

<style lang="less" scoped>
@keyframes header-effect {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-50px);
    -moz-transform: translateY(-50px);
    -o-transform: translateY(-50px);
    -ms-transform: translateY(-50px);
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -o-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}

.banner {
  height: 25rem;
  position: relative;
  width: 100%;
  background-color: #49b1f5;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  animation: header-effect 1s;
  color: #fff;
  .article-category a {
    color: #fff;

    &:hover {
      color: #fff;
    }
  }

  .banner-title {
    animation: title-scale 1s;
    position: absolute;
    top: 12.5rem;
    padding: 0 0.5rem;
    width: 100%;
    font-size: 2.5rem;
    text-align: center;
    color: #eee;
  }

  &:before {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
  }

  .article-info-container {
    position: absolute;
    bottom: 8.25rem;
    padding: 0 8%;
    width: 100%;
    text-align: center;

    .article-title {
      font-size: 2.5rem;
      margin: 20px 0 8px;
    }

    .article-info {
      color: #eee;
      font-size: 95%;
    }
  }
}

@media screen and (max-width: 900px) {
  .layout_post {
    flex-wrap: wrap;
  }

  #post {
    width: 100% !important;
  }
}
</style>
