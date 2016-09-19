<template lang="html">
  <dl class="menu">
    <dt class="menu-title">内容管理</dt>
    <dd class="menu-item">作品发布</dd>
    <dd class="menu-item">作品库</dd>
  </dl>
  <dl class="menu">
    <dt class="menu-title">设置</dt>
    <dd class="menu-item">账号设置</dd>
    <dd class="menu-item">订阅设置</dd>
    <dd class="menu-item">收益提现</dd>
  </dl>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.menu{
  .menu-title{
    height: 40px;
    line-height: 40px;
    color:#999;
  }
  .menu-item{
    padding-left: 25px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    &:hover{
      color:#ff6c74;
    }
  }
  border-bottom: 1px solid #ddd;
  &:last-child{
    border-bottom: none;
  }
}
</style>
