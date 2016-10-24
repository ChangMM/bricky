<template lang="html">
  <div class="nav-wrap" id="nav-wrap">
    <div class="nav base-width">

      <a v-link="{path: '/'}">
        <h1 class="logo">砖栏作家</h1>
      </a>
      <div class="mp-wrap">
        <img v-bind:src="avatar" class="avatar" alt="砖栏头像" />
        <span class="name">{{ nickname }}</span> |
        <a href="javascript:void(0);" id="logout">退出</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      avatar: 'hahah',
      nickname: '用户名'
    }
  },
  ready () {
    this.$http.get('/api/user').then((response) => {
      let user = response.body.user
      this.nickname = user.nickname
      this.avatar = user.avatar
    })
  }
}
</script>

<style lang="scss" scoped>
//顶部导航栏样式
.nav-wrap{
  border-bottom: 1px solid #ddd;
}
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
.mp-wrap{
  float: right;
  .avatar{
    vertical-align: middle;
    margin-right: 4px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
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
