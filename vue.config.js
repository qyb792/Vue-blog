const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // lintOnSave: false,
  devServer: {
    port: 9989,
    open: true,
    proxy: {
      '/api': {
        target: 'http://124.221.154.248:8090',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    disableHostCheck: true
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
