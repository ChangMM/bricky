<template lang="html">
  <div class="main">
    <div class="menu-wrap">
      <dl class="menu">
        <dt class="menu-title">内容管理</dt>
        <dd class="menu-item"><a v-link="{ path: '/release'}">作品发布</a></dd>
        <dd class="menu-item"><a v-link="{ path: '/articles'}">作品库</a></dd>
      </dl>
      <dl class="menu">
        <dt class="menu-title">设置</dt>
        <dd class="menu-item"><a v-link="{ path: '/account'}">账号设置</a></dd>
        <dd class="menu-item new"><a v-link="{ path: '/subscription'}">订阅设置</a></dd>
        <dd class="menu-item"><a v-link="{ path: '/withdraw'}">收益提现</a></dd>
      </dl>
    </div>
      <div class="body-wrap">
        <!-- 路由外链 -->
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  ready () {},
  methods: {},
  components: {}
}
</script>

<style lang="scss" scoped>
//左边导航栏
.menu-wrap{
  position: absolute;
  top:0;
  left:0;
  width:140px;
  padding-right:20px;
}
.menu{
  .menu-title{
    height: 40px;
    line-height: 40px;
    color:#999;
  }
  .menu-item{
    position: relative;
    padding-left: 25px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    &.new:after{
      position: absolute;
      content: " ";
      top:17px;
      right:3px;
      height:6px;
      width:6px;
      border-radius: 50%;
      background-color:#ff6c74;
    }
    a{
      &:hover,&.v-link-active{
        color:#ff6c74;
      }
    }
  }
  border-bottom: 1px solid #ddd;
  &:last-child{
    border-bottom: none;
  }
}
</style>
