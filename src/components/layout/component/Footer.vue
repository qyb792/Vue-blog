<template>
  <footer id="footer" data-type="color">
    <div class="footer-wrap">
      <div class="copyright">©2020 - {{ new Date().getFullYear() }} By zytqyb</div>
      <div class="framework-info">
        <p>
          <a
            style="margin-inline: 5px"
            target="_blank"
            href="https://cn.vuejs.org/"
          ><img
            src="https://img.shields.io/badge/Frame-Vue-blue?style=flat&logo=Vue"
            title="博客框架为 Vue"
            alt="Vue"
          ></a>
          <!-- <a
            style="margin-inline: 5px"
            target="_blank"
            href="https://butterfly.js.org/"
          ><img
            src="https://img.shields.io/badge/Theme-Butterfly-6513df?style=flat&logo=bitdefender"
            title="主题采用 Butterfly"
            alt="Butterfly"
          ></a> -->
          <a
            style="margin-inline: 5px"
            target="_blank"
            href="https://www.jsdelivr.com/"
          ><img
            src="https://img.shields.io/badge/CDN-jsDelivr-orange?style=flat&logo=jsDelivr"
            title="本站使用 Jsdelivr 为静态资源提供CDN加速"
            alt="Jsdelivr"
          ></a><a
            style="margin-inline: 5px"
            target="_blank"
            href="https://github.com/zytqyb"
          ><img
            src="https://img.shields.io/badge/Source-Github-d021d6?style=flat&logo=GitHub"
            title="GitHub 仓库地址"
            alt="GitHub"
          ></a><a
            style="margin-inline: 5px"
            target="_blank"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          ><img
            src="https://img.shields.io/badge/Copyright-BY--NC--SA%204.0-d42328?style=flat&logo=Claris"
            alt="img"
            title="本站采用知识共享署名-非商业性使用-相同方式共享4.0国际许可协议进行许可"
          ></a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
#footer {
  position: relative;
  /* background: #49b1f5; */
  background-attachment: local;
  background-position: bottom;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

#footer a {
  color: #eee;

}

#footer a:hover {
  color: #49b1f5;
}

#footer .footer-separator {
  margin: 0 4px;
}

#footer .footer-wrap {
  position: relative;
  padding: 40px 20px;
  color: #eee;
  text-align: center;
}

#footer .footer-wrap .copyright {
  color: #4c4948;
}
.framework-info {
  margin: 14px 0 0 0;
}
</style>
