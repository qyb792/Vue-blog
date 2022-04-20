<template>
  <div>
    <div id="article-container">
      <div id="maincontent">
        <div id="form-wrap">
          <img
            class="no-lightbox entered loaded"
            id="beforeimg"
            src="https://unpkg.zhimg.com/hexo-butterfly-envelope/lib/before.png"
            data-lazy-src="https://unpkg.zhimg.com/hexo-butterfly-envelope/lib/before.png"
            data-ll-status="loaded"
          />
          <div id="envelope">
            <form>
              <div class="formmain" style="pointer-events: none">
                <img
                  class="headerimg no-lightbox entered loaded"
                  src="https://bsat1314.cn/MdDocument/202204192100457.jpeg"
                  data-lazy-src="https://bsat1314.cn/MdDocument/202204192100457.jpeg"
                  style="width: 100%; overflow: hidden; pointer-events: none"
                  data-ll-status="loaded"
                />
                <div class="comments-main">
                  <h3
                    class="title3"
                    style="
                      text-decoration: none;
                      color: $theme-color;
                      text-align: center;
                    "
                  >
                    来自邱同学的留言:
                  </h3>
                  <div
                    class="comments"
                    style="
                      text-align: center;
                      border-bottom: #ddd 1px solid;
                      border-left: #ddd 1px solid;
                      padding-bottom: 20px;
                      background-color: #eee;
                      margin: 15px 0;
                      padding-left: 20px;
                      padding-right: 20px;
                      border-top: #ddd 1px solid;
                      border-right: #ddd 1px solid;
                      padding-top: 20px;
                    "
                  >
                    <div>有什么想问的？</div>
                    <div>有什么想说的？</div>
                    <div>有什么想吐槽的？</div>
                    <div>哪怕是有什么想吃的，都可以告诉我哦~</div>
                  </div>
                  <div
                    class="bottomcontent"
                    style="text-align: center; margin-top: 40px"
                  >
                    <img
                      class="bottomimg no-lightbox entered loaded"
                      src="https://unpkg.zhimg.com/hexo-butterfly-envelope/lib/line.png"
                      data-lazy-src="https://unpkg.zhimg.com/hexo-butterfly-envelope/lib/line.png"
                      style="
                        width: 100%;
                        margin: 5px auto 5px auto;
                        display: block;
                        pointer-events: none;
                      "
                      data-ll-status="loaded"
                    />
                  </div>
                  <p
                    class="bottomhr"
                    style="font-size: 12px; text-align: center; color: #999"
                  >
                    自动书记人偶竭诚为您服务！
                  </p>
                </div>
              </div>
            </form>
          </div>
          <img
            class="no-lightbox entered loaded"
            id="afterimg"
            src="https://bsat1314.cn/MdDocument/202204192057355.png"
            data-lazy-src="https://bsat1314.cn/MdDocument/202204192057355.png"
            data-ll-status="loaded"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 600px) {
  #afterimg,
  #beforeimg {
    display: none !important;
  }
}
@media screen and (min-width: 600px) {
  #article-container img {
    margin: 0 auto 0;
  }
  #form-wrap {
    overflow: hidden;
    height: 447px;
    position: relative;
    top: 0;
    transition: all 1s ease-in-out 0.3s;
    z-index: 0;
  }
  #form-wrap:hover {
    height: 1050px;
    top: -200px;
  }
  #beforeimg {
    position: absolute;
    bottom: 126px;
    left: 0;
    background-repeat: no-repeat;
    width: 530px;
    height: 317px;
    z-index: -100;
    pointer-events: none;
  }
  #afterimg {
    position: absolute;
    bottom: -2px;
    left: 0;
    background-repeat: no-repeat;
    width: 530px;
    height: 259px;
    z-index: 100;
    pointer-events: none;
  }
  #envelope {
    position: relative;
    overflow: visible;
    width: 500px;
    margin: 0 auto;
    transition: all 1s ease-in-out 0.3s;
    padding-top: 200px;
  }
  #maincontent {
    width: 530px;
    margin: 20px auto 0;
  }
  .formmain {
    background: #fff;
    width: 95%;
    max-width: 800px;
    margin: auto auto;
    border-radius: 5px;
    border: 1px solid;
    overflow: hidden;
    -webkit-box-shadow: 0 0 20px 0 #000;
    box-shadow: 0 0 20px 0 #000;
  }
}
[data-theme='dark'] .formmain {
  background: #323232;
}
[data-theme='dark'] .comments {
  background: #5a5a5a !important;
}
</style>
