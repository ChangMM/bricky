<template lang="html">
  <div class="article-mask">
    <div class="choose-wrap">
      <div class="choose-header">
        作品发布
        <div class="line"></div>
        <img src="../../../assets/close.png" v-on:click='f_close' class="close" />
      </div>
      <div class="search-wrap clearfix">
        <input type="text" class="search-input" v-model="m_search_title" placeholder="输入标题文字">
        <a href="/new"><span class='button float-right'>新建作品</span></a>
      </div>
      <Material :filter="m_search_title" :pid.sync="m_pid"></Material>
      <div class="release-button-wrap txt-center">
        <span class='button release-button' v-on:click='f_release'>确认发布</span>
      </div>
    </div>
  </div>
</template>

<script>
import Material from './Material'
export default {
  data () {
    return {
      m_search_title: '',
      m_pid: '',
      materials: []
    }
  },
  props: ['show', 'refresh'],
  ready () {},
  methods: {
    f_close: function () {
      this.$fixNoBody()
      this.show = false
    },
    f_release: function () {
      if (this.m_pid === '') {
        this.$warn('请选择要发布的文章')
      } else {
        this.$confirm().then(
          function (data) {
            this.$http.post('/api/publish/post', {
              pid: this.m_pid
            }).then((response) => {
              let body = response.body
              if (body.error === 'ok') {
                this.$warn('发布文章成功', function () {
                  this.f_close()
                  this.refresh()
                }.bind(this))
              } else {
                this.$warn('发布失败')
                this.$warn(body.msg)
              }
            })
          }.bind(this))
      }
    }
  },
  components: {
    Material
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../scss/base/_variable.scss';
  @import '../../../scss/componments/_button.scss';
  .article-mask{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    transition: background ease .6s;
    background: rgba(255, 255, 255, 0.9);
    z-index: 9997;
  }
  .choose-wrap{
    position: absolute;
    top:46%;
    left:50%;
    transform:translate(-50%, -50%);
    padding:20px 60px;
    border-radius: 2px;
    width:800px;
    height:560px;
    background-color: #fff;
    box-shadow: 1px 1px 20px rgba(0,0,0,0.05),
                -1px -1px 20px rgba(0,0,0,0.05);
  }
  .choose-header{
    padding:10px 0;
    font-size:16px;
    font-weight: bolder;
    position:relative;
    .line{
      margin-top: 16px;
      width:100px;
      height:6px;
      background-color: $main-color;
    }
    .close{
      position: absolute;
      top:0;
      right:-30px;
      height:20px;
      cursor: pointer;
      transition: transform ease 0.4s;
      &:hover{
      }
    }
  }
  .search-wrap{
    margin-top:10px;
    .search-input{
      height:32px;
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
    height:32px;
    line-height: 32px;
    border: 1px solid #ff6c74;
    cursor: pointer;
    color:#fff;
    background-color: #ff6c74;
    &:hover{
      background-color: darken(#ff6c74,5%);
    }
  }
</style>
