<template lang="html">
  <div class="nav base-width">
    <a href="/">
      <h1 class="logo">砖栏作家</h1>
    </a>
    <div class="contact-us-wrap">
      <span class="contact-us button">联系我们</span>
      <img src="../../assets/mp_qrcode.jpeg" class="mp_qrcode" alt="砖栏公众号" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/base/_variable.scss";
.nav{
  position: relative;
  margin:0 auto;
  height:80px;
  line-height: 80px;
}
.logo{
  position: absolute;
  top:28px;
  left:0;
  height:34px;
  width:173px;
  text-indent: -9999px;
  background-image: url("../../assets/logoblack@3x.png");
  background-size: cover;
}
.contact-us-wrap{
  width:120px;
  height:40px;
  display: inline-block;
  position: absolute;
  z-index: 99;
  top:0;
  right:0;
  text-align: center;
  .contact-us{
    height: 40px;
    line-height: 40px;
    width:120px;
    color: $main-color;
    border:1px solid $main-color;
    cursor: pointer;
    &:hover{
      background-color: lighten($main-color,0);
      border-color:transparent;
      color: #fff;
    }
  }
  .mp_qrcode{
    position: absolute;
    top:70px;
    left:-30px;
    width:180px;
    display: none;
  }
  &:hover{
    .mp_qrcode{
      display: inline-block;
    }
  }
}
</style>
