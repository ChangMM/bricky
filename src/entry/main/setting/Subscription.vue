<template lang="html">
  <div class="subscription-wrap">
    <div class="subscription-header">
      订阅设置
      <div class="line"></div>
    </div>
    <div class="subscription-body">
      <div class="input-wrap">
        <label for="price">订阅价格</label>
        <!-- <input type="text" name="name" v-model='m_price'> -->
        <span class="price">{{m_price}}</span>/年（￥）
        <span class="tip">订阅价格一年中之内修改一次</span>
        <span class="float-right alter" v-on:click = 'f_alter'>修改</span>
      </div>
      <div class="input-wrap">
        <label for="avatar">我的主页</label>
        <span class="url">{{ m_url }}</span>
        <span class="float-right self" v-on:click= 'f_preview'>{{ m_url_active?'预览个人主页':'设置订阅价格后有效' }}</span>
      </div>
    </div>
  </div>
  <preview v-show="m_preview" :show.sync="m_preview" :url="m_url"></preview>
  <sub-panel v-show='m_showSubPanel' :refresh='f_get_price' :content='m_price' :show.sync='m_showSubPanel'></sub-panel>
</template>

<script>
/*global QRCode:true */
/* eslint-disable no-new */
import SubPanel from './SubscripPanel.vue'
import Preview from './Preview.vue'
export default {
  data () {
    return {
      m_price: 0,
      m_preview: false,
      m_showSubPanel: false,
      m_url: '',
      m_url_active: false
    }
  },
  ready () {
    this.f_get_price()
    this.f_get_url()
  },
  methods: {
    f_preview: function () {
      if (!this.m_url_active) {
        return this.$warn('请先设置订阅价格')
      }
      this.m_preview = true
    },
    f_get_price: function () {
      // 获取订阅价格
      this.$http.get('/api/subsprice').then((response) => {
        let body = response.body
        if (body.error === 'subsinfo:missing') {
          this.m_price = '-'
        } else {
          this.m_price = body.price / 100
          this.m_url_active = true
        }
      })
    },
    f_get_url: function () {
      // 获取个人主页的链接
      this.$http.get('/api/user').then((response) => {
        let body = response.body
        if (body.error === 'ok') {
          this.m_url = body.user.url
          new QRCode(document.getElementById('qrcode'), body.user.url)
        } else if (body.error === 'user:not_signin') {
          this.$warn('您尚未登录', function () {
            window.location.href = '/'
          })
        }
      }, (response) => {
        console.log(response)
      })
    },
    f_alter: function () {
      this.m_showSubPanel = true
    }
  },
  components: {
    Preview, SubPanel
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
        .price{
          color:$main-color;
        }
        .tip{
          font-size: 12px;
          color: #666;
          margin-top: 10px;
          margin-left: 20px;
        }
        .url{
          display: inline-block;
          vertical-align: middle;
          max-width:500px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .alter,.self{
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
