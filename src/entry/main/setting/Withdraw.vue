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
        <span class="money"><span class="num"> {{m_withdraw}} </span> 元</span>
        <span class="float-right tip">由于微信支付结算周期，收款后需要 <span class="num">7</span> 天之后才可提现</span>
      </div>
      <div class="input-wrap text-input-wrap">
        <label>提现规则</label><p class="line first">您在砖栏获得的收入将会在每天21：30统一结算，结算的金额为「可提现金额」，直接打入微信零钱包。</p>
        <p class="line">可以在你的微信中「我」-「微信」-「交易记录」查看。</p>
        <p class="line margin">由于微信平台「企业自动付款」转账额度限制，砖栏每日结算的上限是2000元。遇到当天没有结算完全的情况，我们会在之后陆续结算。</p>
        <p class="line"><a href="#">查看完整提现规则</a></p>
      </div>
      <!-- 提现按钮暂时去掉 -->
      <!-- <div class="button-wrap">
        <span class="button" v-on:click = 'f_showPanel'>提现</span>
      </div> -->
      <withdraw-panel v-show='m_showPanel' :show.sync='m_showPanel'></withdraw-panel>
    </div>
  </div>
</template>

<script>
import WithdrawPanel from './WithdrawPanel.vue'
export default {
  data () {
    return {
      m_total: 0,
      m_withdraw: 0,
      m_showPanel: false
    }
  },
  ready () {
    this.$http.get('/api/stats').then((response) => {
      let data = response.body.data
      this.m_total = data.totalIncome
      this.m_withdraw = data.availableWithdraw
    }, (response) => {
      this.$warn('数据出现问题')
    })
  },
  methods: {
    f_showPanel: function () {
      this.$warn('手动提现功能暂时未开放')
      // this.m_showPanel = true
    }
  },
  components: {
    WithdrawPanel
  }
}
</script>

<style lang="scss" scoped>
@import "../../../scss/base/_variable.scss";
@import "../../../scss/componments/_button.scss";
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
    padding:20px 0;
    border-bottom: 1px solid #eee;
    label{
      display: inline-block;
      width:66px;
      margin-right: 20px;
      color:#666;
      text-align: right;
    }
    .line{
      display: inline-block;
      color: #666;
      line-height: 1.5;
      padding-left:86px;
      &.first{
        padding-left: 0;
      }
      &.margin{
        margin-top: 10px;
        margin-bottom: 10px;
      }
      a{
        font-size: 12px;
        &:hover{
          color: $main-color;
          text-decoration: underline;
        }
      }
    }
    .money{
      color: $main-color;
    }
    .num{
      color:$main-color;
      font-weight: bold;
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
</style>
