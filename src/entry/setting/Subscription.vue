<template lang="html">
  <div class="subscription-wrap">
    <div class="subscription-header">
      订阅设置
      <div class="line"></div>
    </div>
    <div class="subscription-body">
      <div class="input-wrap">
        <label for="avatar">订阅价格</label>
        <input type="text" name="name" v-model='m_price'>/月
        <span class="float-right alter">修改</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      m_price: 2
    }
  },
  methods: {
    f_alter: function () {
      // 向后台发送修改订阅价格的请求
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/base/_variable.scss";
.subscription-wrap{
  .subscription-header{
    padding:10px 0;
    font-size:16px;
    font-weight: bolder;
    .line{
      margin-top: 16px;
      width:100px;
      height:6px;
      background-color: $main-color;
    }
  }
  .subscription-body{
    .input-wrap{
      height:60px;
      line-height:60px;
      border-bottom: 1px solid #eee;
      label{
        display: inline-block;
        width:56px;
        margin-right: 20px;
        color:#666;
        text-align: right;
      }
      input{
        height:24px;
        width:40px;
        text-align: center;
        padding-left:5px;
        margin-right: 5px;
        outline: none;
        border:1px solid #ddd;
        border-radius: 2px;
        color:$main-color;
        &:focus{
          border-color: $main-color;
        }
      }
      .alter{
        cursor: pointer;
        color:#666;
        &:hover{
          color: $main-color;
        }
      }
    }
  }
}
</style>
