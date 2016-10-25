<template>
  <!-- 注册第三步 -->
  <div v-if="step==3" class="register-panel register-panel-3">
    <div class="panel-header">
      <h3>申请已提交。</h3>
      <p>请务必扫描下方二维码关注砖栏公众号，审核结果将在48小时内通过公众号告知</p>
    </div>
    <div class="progress-wrap clearfix">
      <div class="progress-bar float-left"></div>
      <div class="progress-bar float-left"></div>
      <div class="progress-bar float-left"></div>
    </div>
    <div class="panel-main">
      <!-- 砖栏头像 -->
      <div class="qrcode-wrap">
        <img src="../../assets/mp_qrcode.png" class="mp_qrcode" alt="公众号二维码" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      step: 3
    }
  }
}
</script>
<style lang="scss" scoped>
  .register-panel{
    .panel-header{
      h3{
        font-size: 20px;
      }
      p{
        font-size: 12px;
        font-weight: 100;
        color:#666;
      }
    }
    //注册进度条的样式
    .progress-wrap{
      margin-top:30px;
      margin-bottom:30px;
      .progress-bar{
        height:6px;
        width:100px;
        &:first-child{
          background-color: #ff6c74;
        }
      }
    }
    &.register-panel-1{
      .progress-bar{
        &:nth-child(2){
          background-color: #ddd;
        }
        &:nth-child(3){
          background-color: #eee;
        }
      }
    }
    &.register-panel-2{
      .progress-bar{
        &:nth-child(2){
          background-color: #ff6c74;
        }
        &:nth-child(3){
          background-color: #eee;
        }
      }
    }
    &.register-panel-3{
      .progress-bar{
        &:nth-child(2){
          background-color: #ff6c74;
        }
        &:nth-child(3){
          background-color: #ff6c74;
        }
      }
    }
    .panel-main{
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      .input-wrap{
        position: relative;
        color: #999;
        margin: 30px 0;
        label{
          text-align: right;
          color: #333;
          padding-right: 20px;
          position: absolute;
          height:34px;
          line-height: 34px;
          width:80px;
          left:-100px;
        }
        span{
          font-size: 12px;
        }
        .em{
          color: #ff6c74;
        }
        input{
          height:32px;
          border:1px solid #ddd;
          outline:none;
          width:145px;
          margin-right: 10px;
          padding-left: 5px;
          font-size: 14px;
          border-radius: 2px;
          &:focus{
            border-color: #ff6c74;
          }
        }
        textarea{
          height:100px;
          width:100%;
          box-sizing: border-box;
          padding-top:5px;
          padding-left:5px;
          outline: none;
          border-radius: 2px;
          border:1px solid #ddd;
          resize: none;
          &:focus{
            border-color: #ff6c74;
          }
        }
        .tip{
          position: absolute;
          right:5px;
          bottom:30px;
        }
        &.input-avatar{
          label{
            bottom:0;
            line-height: 1;
          }
        }
      }
      .input-avatar-wrap{
        display: inline-block;
        vertical-align: bottom;
        background-color: #eee;
        overflow: hidden;
        position: relative;
        &.big{
          width:100px;
          height:100px;
        }
        &.small{
          width:40px;
          height:40px;
          border-radius: 50%;
          margin-left: 10px;
          margin-right: 10px;
        }
        input{
          cursor: pointer;
          opacity: 0;
          position: absolute;
          z-index: 1;
          top:0;
          left:0;
          width:100%;
          height:100%;
        }
        img{
          position: absolute;
          top:50%;
          left:50%;
          transform: translate3d(-50%,-50%,0);
          z-index: 0;
        }
      }
      .qrcode-wrap{
        box-sizing: border-box;
        background: url('../../assets/back.png') center center;
        background-size: cover;
        width:300px;
        height:94px;
        padding:10px;
        .mp_qrcode{
          height: 80px;
        }
      }
    }
    .panel-footer{
      padding-top:20px;
      text-align: center;
      .button{
        display: inline-block;
        width:100px;
        height:32px;
        line-height: 32px;
        border: 1px solid #ff6c74;
        margin-left: 20px;
        margin-right: 20px;
        cursor: pointer;
        &.prev{
          color:#ff6c74;
          &:hover{
            color:#fff;
            background-color: darken(#ff6c74,5%);
          }
        }
        &.next{
          color:#fff;
          background-color: #ff6c74;
          &:hover{
            background-color: darken(#ff6c74,5%);
          }
        }
      }
    }
  }
</style>
