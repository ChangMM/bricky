<template lang="html">
  <div class="articles-wrap">
    <div class="articles-header">
      作品库
      <div class="line"></div>
    </div>
    <div class="search-wrap clearfix">
      <input type="text" class="search-input" v-model="m_search_title" placeholder="输入标题文字">
      <a href="/new"><span class='button float-right'>新建作品</span></a>
    </div>
    <div class="articles-wrap">
      <template v-if="m_libs!=0">
        <div class="article-item clearfix" v-for="lib in m_libs | filterBy m_search_title in 'title'">
          <img v-bind:src="lib.images[0]?lib.images[0]:m_default_cover" v-on:click="f_preview(lib.id)" class="article-cover" alt="封面图" />
          <div class="article-info">
            <span class="article-title" v-on:click="f_preview(lib.id)">{{lib.title}}</span>
            <span class="article-intro">{{lib.digest}}</span>
          </div>
          <div class="float-right time-wrap">
            <span class="article-time">{{lib.updateTime | timeFormat}}</span>
            <p class="operation-wrap">
              <span class="edit" v-on:click="f_edit(lib.id)">编辑</span>
              <span class="cancel" v-on:click="f_cancel(lib.id)">删除</span>
            </p>
          </div>
        </div>
      </template>
      <template v-if="m_libs==0">
        <p class="no-article">暂无内容</p>
      </template>
    </div>
  </div>
  <preview v-show="m_preview" :show.sync="m_preview" :title="m_title" :time="m_time" :content="m_content"></preview>
</template>

<script>
/*global location:true*/
import Preview from '../../../components/Preview.vue'
export default {
  data () {
    return {
      m_default_cover: require('../../../assets/default.png'),
      m_search_title: '',
      m_libs: [],
      m_preview: false,
      m_title: '',
      m_abbr: '',
      m_time: '',
      m_content: ''
    }
  },
  ready () {
    this.f_get_libs()
  },
  methods: {
    f_edit: function (pid) {
      location.href = '/new?pid=' + pid
    },
    f_get_libs: function () {  // 获取素材库的图文
      this.$http.get('/api/posts/lib', {
        params: {
          limit: 100,
          offset: 0
        }
      }).then((response) => {
        let body = response.body
        if (body.error === 'ok') {
          this.m_libs = body.posts
        } else {
          this.$warn(body.msg)
        }
      })
    },
    f_cancel: function (pid) {
      let self = this
      this.$confirm().then(
        function (data) {
          self.$http.post('/api/post/lib/delete', {
            pid: pid
          }).then((response) => {
            let body = response.body
            if (body.error === 'ok') {
              self.$warn('删除文章成功')
              self.f_get_libs()
            } else {
              self.$warn(body.msg)
            }
          })
        })
    },
    f_preview: function (pid) {
      this.$http.get('/api/post', {
        params: {
          crsf: this.$cookies()['csrf'] || '',
          postId: pid
        }
      }).then((response) => {
        let body = JSON.parse(response.body)
        let post = body.post
        this.m_title = post.title
        this.m_abbr = post.digest
        this.m_content = post.words
        this.m_time = post.updateTime
        this.m_preview = true
        this.$fixBody()
      })
    }
  },
  components: {
    Preview
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../scss/base/_variable.scss";
  @import "../../../scss/componments/_button.scss";
  .articles-header{
    padding:10px 0;
    font-size:16px;
    font-weight: bolder;
    .line{
      margin-top: 16px;
      width:100px;
      height:6px;
      background-color: $main-color;
    }
  }
  .no-article{
    font-size: 16px;
    line-height: 50px;
    height:50px;
    text-align: center;
  }
  .search-wrap{
    margin-top:10px;
    .search-input{
      height:36px;
      border:1px solid #ddd;
      outline:none;
      width:300px;
      padding-left: 5px;
      padding-right: 40px;
      font-size: 14px;
      border-radius: 4px;
      &:focus{
        border-color: #ff6c74;
      }
    }
  }
  .release-button-wrap{
    margin-top: 30px;
  }
  .button{
    display: inline-block;
    width:120px;
    height:36px;
    line-height: 36px;
    border: 1px solid #ff6c74;
    cursor: pointer;
    color:#fff;
    background-color: #ff6c74;
    &:hover{
      background-color: darken(#ff6c74,5%);
    }
  }
  .articles-wrap{
    margin-top: 30px;
  }
  .article-item{
    padding:15px 0;
    border-bottom: 1px solid #eee;
    position: relative;
    .article-cover{
      height:100px;
      width:100px;
      border-radius: 2px;
      cursor: pointer;
    }
    .article-info{
      position: absolute;
      left:120px;
      top:15px;
      height:100px;
      width:200px;
      .article-title{
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        line-height: 1;
        vertical-align: top;
        cursor: pointer;
      }
      .article-intro{
        width:100%;
        display: inline-block;
        position: absolute;
        bottom:0;
        left:0;
        color:#666;
        vertical-align: text-bottom;
      }
    }
    .time-wrap{
      height:100px;
      position: relative;
      color:#999;
      min-width: 100px;
      text-align: right;
      .operation-wrap{
        position: absolute;
        bottom:0;
        right:0;
        span{
          &.cancel{
            margin-left: 20px;
          }
          cursor: pointer;
          &:hover{
            color:$main-color;
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
