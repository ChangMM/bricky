<template>
  <div class="warn-wrap txt-center" transition="warnIn">
    <p class="msg-wrap">{{ msg }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang='scss' scoped>
    .warn-wrap{
      position: fixed;
      width:400px;
      left:0;
      right:0;
      margin:auto;
      top:0;
      z-index: 9999;
      .msg-wrap{
        display: inline-block;
        padding:0 20px;
        border-radius: 1px;
        line-height: 36px;
        height:36px;
        background-color:red;
        font-size:14px;
        color: #fff;
      }
    }
    /* 必需 */
    .warnIn-transition {
      transition: top .3s ease;
      top:0;
    }
    .warnIn-enter, .warnIn-leave {
      top:-120px
    }
</style>
