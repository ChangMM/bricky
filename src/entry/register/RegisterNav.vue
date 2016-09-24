<template lang="html">
  <div class="nav base-width">
    <a href="#">
      <h1 class="logo">砖栏作家</h1>
    </a>
    <span class="contact-us button">联系我们</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {},
  ready () {},
  attached () {},
  methods: {},
  components: {}
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
.contact-us{
  position: absolute;
  top:20px;
  right: 0;
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
