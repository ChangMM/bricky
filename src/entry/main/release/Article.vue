<template lang="html">
  <div class="articles-wrap">
    <template v-if="published.length!=0">
      <div class="article-item clearfix" v-for="article in published | orderBy 'updateTime' -1">
        <img v-bind:src="article.images[0]?article.images[0]:m_default_cover" v-on:click="f_preview(article.id)" class="article-cover" alt="封面图" />
        <div class="article-info">
          <span class="article-title" v-on:click="f_preview(article.id)">{{article.title}}</span>
          <span class="article-intro">{{article.digest}}</span>
        </div>
        <div class="float-right time-wrap">
          <span class="article-time">{{article.updateTime | timeFormat}}</span>
          <span class="cancel" v-on:click="f_cancel(article.id)">删除</span>
        </div>
      </div>
    </template>
    <template v-if="published.length==0">
      <p class="no-article">暂无内容</p>
    </template>
  </div>
  <preview v-show="m_preview" :show.sync="m_preview" :title="m_title" :time="m_time" :content="m_content"></preview>
</template>
<script>
import Preview from '../../../components/Preview.vue'
export default {
  data () {
    return {
      m_preview: false,
      m_title: '',
      m_abbr: '',
      m_time: '',
      m_content: '',
      m_default_cover: require('../../../assets/default.png')
    }
  },
  props: ['published', 'refresh'],
  methods: {
    f_cancel: function (pid) {
      this.$confirm().then(
        function (data) {
          this.$http.post('/api/post/published/delete', {
            pid: pid
          }).then((response) => {
            let body = response.body
            if (body.error === 'ok') {
              this.$warn('删除文章成功', function () {
                this.refresh()
              }.bind(this))
            } else {
              this.$warn(body.msg)
            }
          })
        }.bind(this))
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
@import '../../../scss/base/_variable.scss';
.no-article{
  font-size: 16px;
  line-height: 50px;
  height:50px;
  text-align: center;
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
