<template lang="html">
  <div class="nav base-width">
    <a href="#">
      <h1 class="logo">砖栏作家</h1>
    </a>
    <div class="account-wrap">
      <img src="../../src/assets/avatar.png" class="avatar" alt="砖栏头像" />
      <span class="name">节度使</span> |
      <a href="javascript:void(0);" id="logout">退出</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
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
  background-image: url("../assets/logoblack@3x.png");
  background-size: cover;
}
.account-wrap{
  float: right;
  .avatar{
    vertical-align: middle;
    margin-right: 4px;
  }
  .name{
    margin-right: 6px;
    vertical-align: middle;
  }
  #logout{
    margin-left: 6px;
    font-size: 12px;
    color:#999;
  }
}
</style>
