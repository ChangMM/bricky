<template lang="html">
  <div class="account-wrap">
    <div class="account-header">
      账号设置
      <div class="line"></div>
    </div>
    <div class="account-body">
      <div class="input-wrap">
        <label for="avatar">头像</label>
        <img src="../../../assets/avatar.png" class="avatar-img" alt="头像" />
        <span class="float-right alter">修改</span>
      </div>
      <div class="input-wrap">
        <label for="avatar">名称</label>
        <span>{{m_name}}<span/>
        <span class="float-right tip">不可修改</span>
      </div>
      <div class="input-wrap textarea-wrap">
        <label for="avatar">简介</label>
        <textarea name="name" class="intro" v-model="m_intro"></textarea>
        <span class="float-right alter">修改</span>
      </div>
      <div class="input-wrap">
        <label for="avatar">邀请码</label>
        <span>{{m_code?m_code:"无"}}<span/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      m_avatar: '',
      m_name: '节度使',
      m_intro: '这是简介',
      m_code: ''
    }
  },
  computed: {},
  ready () {
  },
  attached () {},
  methods: {},
  components: {}
}
</script>

<style lang="scss" scoped>
@import "../../../scss/base/_variable.scss";
.account-wrap{
  .account-header{
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
  .account-body{
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
      &.textarea-wrap{
        label{
          vertical-align: top;
        }
      }
      .avatar-img{
        vertical-align: middle;
        height:40px;
        width:40px;
        border-radius: 50%;
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
      textarea{
        height:100px;
        width:600px;
        padding:5px;
        outline:none;
        border:1px solid #ddd;
        border-radius: 2px;
        resize: none;
        &:focus{
          border-color: $main-color;
        }
      }
      .tip{
        color:#999;
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
