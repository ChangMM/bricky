<template lang="html">
  <div class="articles-wrap">
    <div class="article-item clearfix" v-for="article in articles">
      <img v-bind:src="article.cover" class="article-cover" alt="封面图" />
      <div class="article-info">
        <span class="article-title">{{article.title}}</span>
        <span class="article-intro">{{article.intro}}</span>
      </div>
      <div class="float-right time-wrap">
        <span class="article-time">{{article.date}}</span>
        <span class="cancel">删除</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {},
  props: ['articles'],
  ready () {},
  attached () {},
  methods: {},
  components: {}
}
</script>
<style lang="scss" scoped>
@import '../../scss/base/_variable.scss';
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
