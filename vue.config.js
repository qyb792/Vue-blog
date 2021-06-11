const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 9989,
    open: true,
    proxy: {
      '/api': {
        target: 'http://81.70.192.127:8090',
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
