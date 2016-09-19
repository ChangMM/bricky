<template lang="html">
  <div class="withdraw-wrap">
    <div class="withdraw-header">
      收益提现
      <div class="line"></div>
    </div>
    <div class="withdraw-body">
      <div class="input-wrap">
        <label>总金额</label>
        <span class="money"><span class="num"> {{m_total}} </span> 元</span>
      </div>
      <div class="input-wrap">
        <label>可提现额</label>
        <span class="money"><span class="num"> {{m_with}} </span> 元</span>
        <span class="float-right tip">由于微信支付结算周期，收款后需要7天之后才可提现</span>
      </div>
      <div class="button-wrap">
        <span class="button">提现</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      m_total: 2500,
      m_with: 500
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
@import "../../scss/componments/_button.scss";
.withdraw-wrap{
  .withdraw-header{
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
  .withdraw-body{
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
      .money{
        color:$main-color;
        font-weight: bold;
      }
      .num{
        font-size: 18px;
      }
      .tip{
        color:#999;
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
    .button-wrap{
      text-align: center;
      margin-top: 40px;
      .button{
        height: 36px;
        line-height: 36px;
        width:120px;
        color: #fff;
        background-color: $main-color;
        border:1px solid $main-color;
        cursor: pointer;
        &:hover{
          background-color: darken($main-color,5%);
          color: #fff;
        }
        &:active{
          background-color: darken($main-color,10%);
          color: #fff;
        }
      }
    }
  }
}
</style>
