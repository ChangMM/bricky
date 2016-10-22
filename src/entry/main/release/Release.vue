<template lang="html">
  <div class="release-wrap">
    <div class="release-header">
      作品发布
      <div class="line"></div>
      <span class="tip">前三条作为砖栏试读内容，请斟酌发布</span>
    </div>
    <div class="button-wrap">
      <span class="button hollow-button" v-on:click="f_choose">从作品库中选择</span>
      <a href="new.html"><span class="button solid-button">新建作品</span></a>
    </div>
    <p class="sub-title">已发布</p>
    <Articles :articles = "releasedArticles"> </Articles>
    <Choose v-show="m_choose" :show.sync="m_choose"></Choose>
  </div>
</template>

<script>
import Articles from './Article.vue'
import Choose from './ChoosePanel.vue'
export default {
  data () {
    return {
      m_choose: false,
      releasedArticles: [
        {
          cover: require('../../../assets/cover.png'),
          title: '我们始终使他们的一份子',
          intro: '人生并非游戏，因此，我们并没有权利只凭自己的',
          date: '2016/09/11'
        },
        {
          cover: require('../../../assets/cover.png'),
          title: '我们始终使他们的一份子',
          intro: '人生并非游戏，因此，我们并没有权利只凭自己的',
          date: '2016/09/11'
        },
        {
          cover: require('../../../assets/cover.png'),
          title: '我们始终使他们的一份子',
          intro: '人生并非游戏，因此，我们并没有权利只凭自己的',
          date: '2016/09/11'
        }
      ]
    }
  },
  computed: {},
  ready () {},
  methods: {
    f_choose: function () {
      this.m_choose = true
    },
    f_get_released_articles: function (offset) {
      this.$http.get('/api/posts/published', {})
    }
  },
  components: {
    Articles, Choose
  }
}
</script>

<style lang="scss" scoped>
@import "../../../scss/base/_variable.scss";
@import "../../../scss/componments/_button.scss";
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
    margin-right: 60px;
    height: 34px;
    line-height: 34px;
    width:140px;
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
.sub-title{
  margin-top: 30px;
}
</style>
