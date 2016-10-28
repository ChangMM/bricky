<template lang="html">
  <div class="subscription-wrap">
    <div class="subscription-header">
      订阅设置
      <div class="line"></div>
    </div>
    <div class="subscription-body">
      <div class="input-wrap">
        <label for="avatar">订阅价格</label>
        <input type="text" name="name" v-model='m_price'>/年（￥）
        <span class="tip">一年后方可再次修改订阅价格</span>
        <span class="float-right alter" v-on:click = 'f_alter'>修改</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      m_price: 0
    }
  },
  ready () {
    this.$http.get('/api/subsprice').then((response) => {
      let body = response.body
      if (body.error === 'subsinfo:missing') {
        this.m_price = '-'
      } else {
        this.m_price = body.price / 100
      }
    })
  },
  methods: {
    f_alter: function () {
      let self = this
      this.$confirm().then(
        function (data) {
          self.$http.post('api/subsprice', {
            csrf: self.$cookies()['csrf'] || '',
            price: self.m_price * 100
          }).then((response) => {
            let body = JSON.parse(response.body)
            if (body.error === 'ok') {
              self.$warn('订阅价格修改成功')
            } else if (body.error === 'update:too_often') {
              self.$warn('一年之后方可重新修改订阅价格')
            }
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../scss/base/_variable.scss";
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
        padding:20px 0;
        border-bottom: 1px solid #eee;
        label{
          display: inline-block;
          width:66px;
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
        .tip{
          font-size: 12px;
          color: #666;
          margin-top: 10px;
          margin-left: 20px;
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
