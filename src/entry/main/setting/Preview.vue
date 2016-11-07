<template lang="html">
  <div class="article-mask" transition="withdrawPanelIn">
    <div class="preview-mask">
      <img src="../../../assets/close.png" v-on:click='f_close' class="close" />
      <div class="preview-wrap">
        <div class="preview">
          <div id="qrcode"></div>
        </div>
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
  ready () {
  },
  props: ['show', 'url'],
  methods: {
    f_close: function () {
      this.show = false
    }
  }
}
</script>
<style lang="scss" scoped>
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
  top:120px;
  transform:translate(-50%, 0);
  padding:50px 10px;
  width:350px!important;
  text-align: center;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 1px 1px 20px rgba(0,0,0,0.05),
              -1px -1px 20px rgba(0,0,0,0.05);
}
.preview{
  margin-left: auto;
  margin-right: auto;
  border-radius: 2px;
  display: inline-block;
  width:auto!important;
}
#qrcode{
  margin:auto;
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
