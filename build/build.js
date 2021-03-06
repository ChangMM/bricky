// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

console.log(
  '  提示:\n' +
  '  暂时可以直接打开html文件来观看网页效果'
  // '  Built files are not meant to be served over an HTTP server.\n' +
  // '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)

// cp('-R','constant/login_qrcode.css',path.join(assetsPath,'/css/login_qrcode.css'))

// var constantPath = path.join(config.build.assetsRoot,'constant')
// rm('-rf', constantPath)
// mkdir('-p', constantPath)
// cp('-R', 'constant/announcement', constantPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
