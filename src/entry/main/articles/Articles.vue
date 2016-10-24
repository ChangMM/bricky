<template lang="html">
  <div class="articles-wrap">
    <div class="articles-header">
      作品库
      <div class="line"></div>
    </div>
    <div class="search-wrap clearfix">
      <input type="text" class="search-input" v-model="m_search_title" placeholder="输入标题文字">
      <a href="new.html"><span class='button float-right'>新建作品</span></a>
    </div>
    <div class="articles-wrap">
      <div class="article-item clearfix" v-for="lib in m_libs | filterBy m_search_title in 'title'">
        <img v-bind:src="lib.cover" class="article-cover" alt="封面图" />
        <div class="article-info">
          <span class="article-title">{{lib.title}}</span>
          <span class="article-intro">{{lib.intro}}</span>
        </div>
        <div class="float-right time-wrap">
          <span class="article-time">{{lib.time}}</span>
          <p class="operation-wrap">
            <span class="edit" v-on:click="f_edit">编辑</span>
            <span class="cancel" v-on:click="f_cancel()">删除</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      m_search_title: '',
      m_libs: [
        {
          title: '标题1',
          intro: '简介1',
          time: '2016/09/11',
          cover: require('../../../assets/cover.png')
        },
        {
          title: '标题1',
          intro: '简介1',
          time: '2016/09/11',
          cover: require('../../../assets/cover.png')
        },
        {
          title: '标题2',
          intro: '简介2',
          time: '2016/09/11',
          cover: require('../../../assets/cover.png')
        },
        {
          title: '标题3',
          intro: '简介3',
          time: '2016/09/11',
          cover: require('../../../assets/cover.png')
        }
      ]
    }
  },
  ready () {
    this.$http.get('/api/posts/lib').then((response) => {
      let body = response.body
      if (body.error === 'ok') {
        // this.m_libs = body.posts
      } else {
        this.$warn(body.msg)
      }
    })
  },
  methods: {
    f_edit: function () {
      this.$warn('编辑按钮')
    },
    f_cancel: function (pid) {
      this.$warn(pid)
    }
  },
  components: {}
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
      border-radius: 2px;
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
