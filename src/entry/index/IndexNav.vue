<template lang="html">
  <div class="index-nav">
    <a href="#">
      <h1 class="logo">砖栏作家</h1>
    </a>
    <div class="login-wrap txt-center">
      <img src="../../assets/index/loginQrcode@3x.png" class="login-qrcode" alt="扫码登陆砖家" />
      <div class="line"></div>
      <span>微信扫码登陆</span>
    </div>
    <span class="contact-us button">联系我们</span>
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
.logo{
  position: absolute;
  top:0;
  left:0;
  height:34px;
  width:173px;
  text-indent: -9999px;
  background-image: url("../../assets/logowhite@3x.png");
  background-size: cover;
}
.login-wrap{
  position: absolute;
  top:0;
  right:0;
  width:120px;
  padding-top:10px;
  padding-bottom: 10px;
  background-color: #fff;
  border-radius: 2px;
  font-size:14px;
  color:#363636;
  .login-qrcode{
    width: 94px;
  }
  .line{
    margin: 10px auto;
    background-color: $main-color;
    height:5px;
    width:24px;
  }
}
.contact-us{
  position: absolute;
  top:0;
  right:150px;
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
</style>
