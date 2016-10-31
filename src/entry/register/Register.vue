<template>
  <!-- 注册第一步 -->
  <div v-if="step==1" class="register-panel register-panel-1">
    <div class="panel-header">
      <h3>申请成为砖栏作家</h3>
      <p>阁下尚不是砖栏作家。</p>
    </div>
    <div class="progress-wrap clearfix">
      <div class="progress-bar float-left"></div>
      <div class="progress-bar float-left"></div>
      <div class="progress-bar float-left"></div>
    </div>
    <div class="panel-main">
      <!-- 砖栏头像 -->
      <div class="input-wrap input-avatar">
        <label for="avatar">头像</label>
        <div class="input-avatar-wrap big">
          <input type="file" v-on:change="f_avatar" class="file-input" name="avatar" id="avatar">
          <img v-bind:src="m_avatar?m_avatar:m_default_avatar" v-bind:style="avatarStyle" />
        </div>
        <div class="input-avatar-wrap small">
          <img v-bind:src="m_avatar?m_avatar:m_default_avatar" v-bind:style="avatarStyle" />
        </div>
        <span>作为该砖栏头像， <span class="em">大小不大于2M的jpg、png、jpeg或者gif图片</span></span>
      </div>
      <!-- 砖栏名称 -->
      <div class="input-wrap">
        <label for="name">名称</label>
        <input type="text" name="name" id="name" v-model="m_name">
        <span>作为该砖栏名称， <span class="em">申请后不可修改</span></span>
      </div>
    </div>
    <div class="panel-footer">
      <span v-on:click="f_step(1)" class="button next">下一步</span>
    </div>
  </div>

  <!-- 注册第二步 -->
  <div v-if="step==2" class="register-panel register-panel-2">
    <div class="panel-header">
      <h3>申请成为砖栏作家</h3>
      <p>阁下尚不是砖栏作家。</p>
    </div>
    <div class="progress-wrap clearfix">
      <div class="progress-bar float-left"></div>
      <div class="progress-bar float-left"></div>
      <div class="progress-bar float-left"></div>
    </div>
    <div class="panel-main">
      <!-- 砖栏信息 -->
      <div class="input-wrap">
        <div class="input-avatar-wrap small">
          <img v-bind:src="m_avatar" v-bind:style="avatarStyle" />
        </div>
        <span>{{ m_name }}</span>
      </div>
      <!-- 砖栏简介 -->
      <div class="input-wrap">
        <label for="intro">简介</label>
        <textarea name="intro" id="intro" v-model='m_intro'></textarea>
        <span>你想通过砖栏表达什么？你更新的频率如何？</span>
        <span class="tip">{{m_intro.length}}/252</span>
      </div>

      <!-- 作品 -->
      <div class="input-wrap">
        <label for="works">作品</label>
        <input type="text" name="works" id="works" v-model="m_works">
        <span>选填，可填写作品链接、微博、公众号名称</span>
      </div>

      <!-- 邀请码 -->
      <div class="input-wrap">
        <label for="code">邀请码</label>
        <input type="text" name="code" id="code" v-model="m_code">
        <span>选填，拥有邀请码可直接通过审核</span>
      </div>

    </div>
    <div class="panel-footer">
      <span v-on:click="f_step(-1)" class="button prev">上一步</span>
      <span v-on:click="f_step(1)" class="button next">下一步</span>
    </div>
  </div>

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
        <img src="../../assets/mp_qrcode.jpeg" class="mp_qrcode" alt="公众号二维码" />
      </div>
    </div>
  </div>
</template>

<script>
/*global Image:true, FormData:true*/
export default {
  data () {
    return {
      step: 1,
      avatarStyle: {
        width: '100%',
        height: 'auto'
      },
      m_avatar: '',
      m_default_avatar: require('../../assets/default.png'),
      m_name: '',
      m_intro: '',
      m_works: '',
      m_code: ''
    }
  },
  ready () { },
  methods: {
    f_avatar: function (event) {
      let file = event.target.files[0]

      if (['gif', 'jpg', 'jpeg', 'png'].indexOf(file.type.split('/')[1].toLowerCase()) === -1) {
        return this.$warn('图片格式不对')
      }

      if (file.size / 1024 > 2048) {
        return this.$warn('图片大小过大')
      }

      // 上传图片
      this.f_upload_avatar(file).then((response) => {
        let body = response.body
        let imageUrl = body.url
        if (body.error === 'ok') {
          let image = new Image()
          let self = this
          image.onload = function () {
            let width = image.width
            let height = image.height
            if (width > height) {
              self.avatarStyle.height = '100%'
              self.avatarStyle.width = 'auto'
            } else {
              self.avatarStyle.height = 'auto'
              self.avatarStyle.width = '100%'
            }
            self.m_avatar = imageUrl
          }
          image.src = imageUrl
        } else {
          this.$warn(body.msg)
        }
      })
      // 另一种头像预览的方式
      // let self = this
      // let reader = new FileReader()
      // reader.onload = function (e) {
      //   let data = e.target.result
      //   let image = new Image()
      //   image.onload = function () {
      //     let width = image.width
      //     let height = image.height
      //     if (width > height) {
      //       self.avatarStyle.height = '100%'
      //       self.avatarStyle.width = 'auto'
      //     } else {
      //       self.avatarStyle.height = 'auto'
      //       self.avatarStyle.width = '100%'
      //     }
      //     self.m_avatar = data
      //   }
      //   image.src = data
      // }
      // reader.readAsDataURL(file)
    },
    f_step: function (dir) {
      if (this.step === 1) {
        if (this.m_avatar === '') {
          return this.$warn('请先上传砖栏头像')
        }
        if (this.m_name === '') {
          return this.$warn('请填写砖栏名称')
        }
      } else if (this.step === 2) {
        if (this.m_intro === '') {
          return this.$warn('请填写您砖栏的简介')
        } else if (this.m_intro.length > 252) {
          return this.$warn('您砖栏的简介过长')
        }
        this.f_register().then((response) => {
          console.log(response)
        }, (response) => {
          return this.$warn('上传问题出错')
        })
      }
      this.step = this.step + dir
    },
    // 发送注册请求的函数
    f_register: function () {
      return this.$http.post('/api/author/apply', {
        nickname: this.m_name,
        avatar: this.m_avatar,
        introduction: this.m_intro,
        works: this.m_works,
        inviteCode: this.m_code
      })
    },
    // 上传图片的函数
    f_upload_avatar: function (data) {
      var formData = new FormData()
      formData.append('csrf', this.$cookies()['csrf'] || '')
      formData.append('file', data)
      return this.$http.post('/api/upload', formData)
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
        border-radius: 50%;
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
          border-radius: 50%;
        }
        img{
          position: absolute;
          top:50%;
          left:50%;
          transform: translate3d(-50%,-50%,0);
          z-index: 0;
          border-radius: 50%;
        }
      }
      .qrcode-wrap{
        box-sizing: border-box;
        background: url('../../assets/back.png') center center;
        background-size: cover;
        width:320px;
        height:100px;
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
