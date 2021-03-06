// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
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
           Cookie: 'bks=s%3AxsPsHmaPKHi210L-Wke9DYbxLRymfYa1.XaDv5wiquAQ9mD1p7eL8yrbmH%2Ba%2BELSdSLsJagevwdI;'
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
      },
      '/debug': {
         target: 'https://dev.www.bricky.cn',
         changeOrigin: true,
         pathRewrite: {
           '^/debug': '/debug'
         }
       },
      '/signout': {
         target: 'https://dev.www.bricky.cn',
         changeOrigin: true,
         pathRewrite: {
           '^/signout': '/signout'
         }
       }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
