<template lang="html">
  <div class="articles-wrap">
    <div class="article-item clearfix" v-for="article in m_published">
      <img v-bind:src="article.images[0]?article.images[0]:m_default_cover" class="article-cover" alt="封面图" />
      <div class="article-info">
        <span class="article-title">{{article.title}}</span>
        <span class="article-intro">{{article.digest}}</span>
      </div>
      <div class="float-right time-wrap">
        <span class="article-time">{{article.updateTime | timeFormat}}</span>
        <span class="cancel" v-on:click="f_cancel(article.id)">删除</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      m_published: [],
      m_default_cover: require('../../../assets/default.png')
    }
  },
  ready () {
    this.f_get_published()
  },
  methods: {
    f_cancel: function (pid) {
      this.$http.post('/api/post/published/delete', {
        pid: pid
      }).then((response) => {
        let body = response.body
        if (body.error === 'ok') {
          this.$warn('删除文章成功')
          this.f_get_published()
        } else {
          this.$warn(body.msg)
        }
      })
    },
    f_get_published: function () {
      // 获取已经发布的图文
      this.$http.get('/api/posts/published').then((response) => {
        let body = response.body
        if (body.error === 'ok') {
          this.m_published = body.posts
        } else {
          this.$warn(body.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../scss/base/_variable.scss';
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
    text-align: right;
    min-width: 100px;
    .cancel{
      cursor: pointer;
      position: absolute;
      bottom:0;
      right:0;
      &:hover{
        color:$main-color;
        text-decoration: underline;
      }
    }
  }
}
</style>
