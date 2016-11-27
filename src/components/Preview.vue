<template lang="html">
  <div class="article-mask" transition="withdrawPanelIn">
    <div class="preview-mask">
      <img src="../assets/close.png" v-on:click='f_close' class="close" />
      <div class="preview-wrap">
        <div class="preview">
          <p class="preview-header">砖栏</p>
          <div class="preview-article">
            <p class="article-title">{{ title?title:'这里是标题' }}</p>
            <div class="title-line"></div>
            <div class="info-wrap">
              <span class="time">{{ time | timeFormat }}</span><span class="author">{{author}}</span>
            </div>
            <div id="article-content"> {{{ content?content:'这里是正文' }}} </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      m_input: ''
    }
  },
  props: ['show', 'title', 'content', 'time', 'author'],
  methods: {
    f_close: function () {
      this.show = false
      this.$fixNoBody()
    }
  }
}
</script>
<style lang="scss">
@import '../scss/componments/_preview.scss';
// 文章展示页面的样式
.article-mask{
  position: fixed;
  z-index:9999;
  top:0;
  left:0;
  width:100%;
  height:100%;
  transition: background ease .6s;
  background: rgba(255, 255, 255, 0.9);
}
.preview-mask{
  width:1100px;
  position: relative;
  margin: 0 auto;
  .close{
    height:20px;
    cursor: pointer;
    position: absolute;
    top:30px;
    right:0;
  }
}
.preview-wrap{
  position: absolute;
  left:50%;
  top:30px;
  transform:translate(-50%, 0);
  padding:50px 10px;
  border-radius: 2px;
  width:400px;
  background-color: #fff;
  box-shadow: 1px 1px 20px rgba(0,0,0,0.05),
              -1px -1px 20px rgba(0,0,0,0.05);
}
.preview{
  margin-left: auto;
  margin-right: auto;
  width:350px;
  box-sizing: border-box;
  border:4px solid #000;
  border-radius: 2px;
  .preview-header{
    height:46px;
    line-height: 46px;
    font-size: 18px;
    background-color: #000;
    text-align: center;
    color: #fff;
  }
  .preview-article{
    height:500px;
    overflow-y: scroll;
    padding:40px 30px 10px;
    color:#363636;
  }
  .preview-article::-webkit-scrollbar {
    width: 6px;
  }
  .preview-article::-webkit-scrollbar-thumb {
    background-color: #ddd;
  }
  .preview-article::-webkit-scrollbar-track {
    border:1px solid #eee;
  }
  .article-title{
    font-family: 'PingFangSC Semibold';
    font-size: 20px;
    font-weight: bold;
  }
  .title-line{
    width:25px;
    height:4px;
    margin-top: 4px;
    margin-bottom: 4px;
    background-color: #ff6c74;
  }
  .info-wrap{
    margin-bottom: 20px;
    .author{
      padding-left: 6px;
      color: #ff6c74;
    }
  }
}
.withdrawPanelIn-transition{
  transition: all .2s ease;
}
.withdrawPanelIn-transition .choose-wrap{
  transition: all .2s ease;
}
.withdrawPanelIn-enter, .withdrawPanelIn-leave {
  opacity: 0;
}
.withdrawPanelIn-enter .choose-wrap, .withdrawPanelIn-leave .choose-wrap{
  transform:translate(-50%, -50%) scale(1.1);
}
</style>
