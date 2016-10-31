<template lang="html">
  <div class="index-nav">
    <a href="/index">
      <h1 class="logo">砖栏作家</h1>
    </a>
    <div class="login-wrap txt-center" id="login-wrap">
      <!-- <img src="../../assets/index/loginQrcode@3x.png" class="login-qrcode" alt="扫码登陆砖家" />
      <div class="line"></div>
      <span>微信扫码登陆</span> -->
    </div>
    <div class="contact-us-wrap">
      <span class="contact-us button">联系我们</span>
      <img src="../../assets/mp_qrcode.jpeg" class="mp_qrcode" alt="砖栏公众号" />
    </div>
  </div>
</template>

<script>
/* global WxLogin:true */
/* eslint-disable no-new */
export default {
  data () {
    return {
    }
  },
  ready () {
    // 微信登陆测试
    console.log(this.$cookies())
    let uri = 'https://dev.www.bricky.cn/'
    new WxLogin({
      id: 'login-wrap',
      appid: 'wx622d0cbf6b6cafa5',
      scope: 'snsapi_login',
      redirect_uri: encodeURIComponent(uri),
      state: this.$cookies()['csrf'] || '',
      style: '',
      href: 'https://dev.www.bricky.cn/static/css/login_qrcode.css'
    })
    let iframe = document.getElementsByTagName('iframe')[0]
    iframe.width = '200'
    iframe.height = '260'
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
  overflow: hidden;
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
.contact-us-wrap{
  width:120px;
  height:40px;
  display: inline-block;
  position: absolute;
  z-index: 99;
  top:0;
  right:240px;
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
    top:50px;
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
