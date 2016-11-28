<template lang="html">
  <div class="release-wrap">
    <div class="release-header">
      作品发布
      <div class="line"></div>
      <span v-show="m_tip_show" class="tip">前三条作为砖栏试读内容，请斟酌发布</span>
    </div>
    <div class="button-wrap">
      <span class="button hollow-button" v-on:click="f_choose">从作品库中选择</span>
      <a href="/new"><span class="button solid-button">新建作品</span></a>
    </div>
    <p class="sub-title">已发布</p>
    <Articles :refresh='f_get_published' :author='m_author' :published.sync='m_published'></Articles>
    <Choose v-show="m_choose_show" :refresh='f_get_published' :show.sync="m_choose_show"></Choose>
  </div>
</template>

<script>
import Articles from './Article.vue'
import Choose from './ChoosePanel.vue'
export default {
  data () {
    return {
      m_choose_show: false,
      m_tip_show: true,
      m_published: [],
      m_author: ''
    }
  },
  ready () {
    this.f_get_published()
    this.f_get_user_info()
  },
  methods: {
    f_choose: function () {
      this.m_choose_show = true
      this.$fixBody()
    },
    f_get_user_info: function () {
      this.$http.get('/api/user').then((response) => {
        let body = response.body
        if (body.error === 'ok') {
          this.m_author = body.user.authorNickname
        }
      })
    },
    f_get_published: function () {
      // 获取已经发布的图文
      this.$http.get('/api/posts/published').then((response) => {
        let body = response.body
        if (body.error === 'ok') {
          this.m_published = body.posts
          this.m_tip_show = (this.m_published.length <= 3)
        } else {
          this.$warn(body.msg)
        }
      })
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
