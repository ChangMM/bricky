# bricky项目前端文档
> the project is created by (vue-cli)[https://vuejs.org.cn/guide/installation.html]

## 运行方法

``` bash
# 安装npm依赖（首先保证机器上已经安装node环境）
npm install

# serve with hot reload at localhost:9001, 开发环境的命令
npm run dev

# build for production, 生产环境的命令
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 注意事项
* 项目使用的`vue`版本是`1.0`，其他的`vue-resource`, `vue-router`之类的插件也要格外注意下版本的问题
* 项目的html文件配置入口在`build/webpack.dev.conf.js`, `build/webpack.prod.conf.js`, js文件的配置入口在`build/webpack.base.conf.js`, css文件入口均写在js文件里
* 代理的配置在 `config/index.js` 是用的是 `node-http-proxy` 模块
* `src` 目录是项目的主要工作目录
  * `assets` 里面存放的是图片资源
  * `components` 是一些项目通用的 `vue` 插件或者 `vue` 组件
  * `entry`下面又有很多目录，基本每个目录名称是与每个`html`文件相对应，即为每个页面的的入口`js`文件，里面目录在下面的目录的话即为前端控制的子路由的入口vue组件
* `js`目录下面是一些引用的全局库文件，或者是一些全局配置文件`Config.js`, `vue`的全局过滤函数文件`Filter.js`, 一些全局的工具函数 `Util.js`
