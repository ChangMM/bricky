<template lang="html">
  <div class="release-wrap">
    <div class="release-header">
      作品发布
      <div class="line"></div>
      <span class="tip">前三条作为砖栏试读内容，请斟酌发布</span>
    </div>
    <div class="button-wrap">
      <span class="button hollow-button">从作品库中选择</span>
      <span class="button solid-button">新建作品</span>
    </div>
    <div class="articles-wrap">
      <span>已发布</span>
      <div class="article-item clearfix">
        <img src="../../assets/cover.png" class="article-cover" alt="封面图" />
        <div class="article-info">
          <span class="article-title">我们始终使他们的一份子</span>
          <span class="article-intro">人生并非游戏，因此，我们并没有权利只凭自己的</span>
        </div>
        <div class="float-right time-wrap">
          <span class="article-time">2016/09/11</span>
          <span class="cancel">删除</span>
        </div>
      </div>
      <div class="article-item clearfix">
        <img src="../../assets/cover.png" class="article-cover" alt="封面图" />
        <div class="article-info">
          <span class="article-title">我们始终使他们的一份子</span>
          <span class="article-intro">人生并非游戏，因此，我们并没有权利只凭自己的</span>
        </div>
        <div class="float-right time-wrap">
          <span class="article-time">2016/09/11</span>
          <span class="cancel">删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
  ready () {},
  methods: {},
  components: {}
}
</script>

<style lang="scss" scoped>
@import "../../scss/base/_variable.scss";
@import "../../scss/componments/_button.scss";
.release-wrap{
  .release-header{
    padding:10px 0;
    font-size:16px;
    font-weight: bolder;
    .line{
      margin-top: 16px;
      margin-bottom: 30px;
      width:100px;
      height:6px;
      background-color: $main-color;
    }
    .tip{
      color:#999;
      font-size: 12px;
      font-weight: normal;
    }
  }
  .button-wrap{
    margin-top: 4px;
    .button{
      margin-right: 40px;
      height: 34px;
      line-height: 34px;
      width:120px;
      border:1px solid $main-color;
      cursor: pointer;
      &.hollow-button{
        color: $main-color;
        &:hover{
          color: #fff;
          background-color: darken($main-color,5%);
        }
        &:active{
          color: #fff;
          background-color: darken($main-color,10%);
        }
      }
      &.solid-button{
        color: #fff;
        background-color: $main-color;
        &:hover{
          background-color: darken($main-color,5%);
        }
        &:active{
          background-color: darken($main-color,10%);
        }
      }
    }
  }
  .articles-wrap{
    margin-top: 30px;
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
  }
}
</style>
