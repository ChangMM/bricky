<template lang="html">
  <div class="nav-wrap" id="nav-wrap">
    <div class="nav base-width">

      <a href="/main#!/">
        <h1 class="logo">砖栏作家</h1>
      </a>
      <div class="mp-wrap">
        <a href="/main#!/account"><img v-bind:src="avatar" class="avatar" alt="砖栏头像" /></a>
        <a href="/main#!/account"><span class="name">{{ nickname }}</span></a> |
        <a href="/signout" id="logout">退出</a>
      </div>
    </div>
  </div>
</template>
<script>
/* global window:true */
export default {
  data () {
    return {
      avatar: require('../assets/default.png'),
      nickname: ''
    }
  },
  ready () {
    this.$http.get('/api/user', {
      params: {
        csrf: this.$cookies()['csrf'] || ''
      }
    }).then((response) => {
      let body = response.body
      if (body.error === 'ok') {
        this.nickname = body.user.authorNickname
        this.avatar = body.user.authorAvatar || this.avatar
      } else if (body.error === 'user:not_signin') {
        this.$warn('您尚未登录', function () {
          window.location.href = '/'
        })
      }
    }, (response) => {
      console.log(response)
    })
  },
  methods: {
    f_signout: function () {
    }
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
      &:hover{
        color:#ff6c74;
        text-decoration: underline;
      }
    }
  }
</style>
