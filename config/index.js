// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 9001,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
         target: 'https://dev.www.bricky.cn',
         changeOrigin: true,
         headers: {
           Cookie: 'bks=s%3A1DYr8qRIb6O99bogHD8f_jpIEnE3SBaD.LNXRKoshkjMVcr5wiXKpLTrA0xfS4rTsuX7w%2Bhbx3so;'
         },
         pathRewrite: {
           '^/api': '/api'
         }
      },
     '/upload': {
        target: 'https://dev.www.bricky.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/upload': '/upload'
        }
      }
      // '^/main$': {
      //    target: 'https://dev.www.bricky.cn',
      //    changeOrigin: true,
      //    pathRewrite: {
      //      '^/main$': '/main'
      //    }
      //  }
      //  '/register': {
      //     target: 'https://dev.www.bricky.cn',
      //     changeOrigin: true,
      //     pathRewrite: {
      //       '^/register.html': '/register'
      //     }
      //   },
      //   '/new': {
      //      target: 'https://dev.www.bricky.cn',
      //      changeOrigin: true,
      //      pathRewrite: {
      //        '^/new.html': '/new'
      //      }
      //    }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
