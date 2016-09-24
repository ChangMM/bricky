<template>
  <div class="slogan-wrap txt-center absolute-center">
    <p class="slogan">有价值的内容和读者</p>
    <div class="line"></div>
    <p>每个作品都有价值</p>
    <p>每个作者都有真正支持自己的读者</p>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="scss">
@import '../../scss/base/_variable.scss';
.slogan-wrap{
  width:400px;
  height:200px;
  color:#fff;
  font-size: 18px;
  .slogan{
    font-size: 38px;
    font-family: "PingFangSC-Semibold"
  }
  .line{
    margin: 40px auto;
    background-color: $main-color;
    height:6px;
    width:128px;
  }
}
</style>
