<template lang="html">
  <div class="account-wrap">
    <div class="account-header">
      账号设置
      <div class="line"></div>
    </div>
    <div class="account-body">
      <div class="input-wrap">
        <label for="avatar">头像</label>
        <div class="input-avatar-wrap">
          <input type="file" v-on:change="f_avatar" id="avatar-input" class="file-input" name="avatar" id="avatar">
          <img v-bind:src="m_avatar?m_avatar:m_default_avatar" v-bind:style="avatarStyle" />
        </div>
        <!-- <img v-bind:src="m_avatar" class="avatar-img" alt="头像" /> -->
        <span class="float-right alter" v-on:click="f_alter_avatar">修改</span>
      </div>
      <div class="input-wrap">
        <label for="avatar">名称</label>
        <span>{{m_name}}<span/>
        <span class="float-right tip">不可修改</span>
      </div>
      <div class="input-wrap textarea-wrap">
        <label for="avatar">简介</label>
        <textarea name="name" class="intro" v-model="m_intro"></textarea>
        <span class="float-right alter" v-on:click="f_alter_intro(m_intro)">修改</span>
      </div>
      <div class="input-wrap">
        <label for="avatar">邀请码</label>
        <span>{{m_code?m_code:"无"}}<span/>
      </div>
    </div>
  </div>
</template>

<script>
/*global Image:true, FormData:true*/
export default {
  data () {
    return {
      m_avatar: '',
      m_default_avatar: require('../../../assets/default.png'),
      m_name: '',
      m_intro: '',
      avatarStyle: {
        width: '100%',
        height: 'auto'
      },
      m_code: ''
    }
  },
  ready () {
    this.$http.get('/api/user').then((response) => {
      let body = response.body
      if (body.error === 'ok') {
        this.m_name = body.user.authorNickname
        this.m_avatar = body.user.authorAvatar || this.m_avatar
        this.m_intro = body.user.authorIntroduction
        this.m_code = body.user.invitecode || ''
      } else {
        this.$warn('获取个人信息错误')
      }
    })
  },
  methods: {
    f_avatar: function (event) {
      console.log(event)
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
    },
    f_alter_intro: function (intro) {
      this.$http.post('/api/user/introduction', {
        csrf: this.$cookies()['csrf'] || '',
        introduction: intro
      }).then((response) => {
        console.log(response)
      })
    },
    f_alter_avatar: function () {
      this.$http.post('/api/user/avatar', {
        csrf: this.$cookies()['csrf'] || '',
        avatar: this.m_avatar
      }).then((response) => {
        console.log(response)
      })
      // this.f_triggerEvent(document.getElementById('avatar-input'), 'change')
    },
    // 上传图片的函数
    f_upload_avatar: function (data) {
      var formData = new FormData()
      formData.append('csrf', this.$cookies()['csrf'] || '')
      formData.append('file', data)
      return this.$http.post('/api/upload', formData)
    },
    f_triggerEvent: function (element, type) {
      let event
      if (document.createEventObject) {
        event = document.createEventObject()
        return element.fireEvent('on' + type, event)
      } else {
        event = document.createEvent('HTMLEvents')
        event.eventName = type
        event.initEvent(type, true, true)
        return !element.dispatchEvent(event)
      }
    }
  }
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
        .input-avatar-wrap{
          display: inline-block;
          vertical-align: middle;
          overflow: hidden;
          position: relative;
          border-radius: 50%;
          background-color: #eee;
          width:40px;
          height:40px;
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
            border-radius: 50%;
            transform: translate3d(-50%,-50%,0);
            z-index: 0;
          }
        }
        // .avatar-img{
        //   vertical-align: middle;
        //   height:40px;
        //   width:40px;
        //   border-radius: 50%;
        // }
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
