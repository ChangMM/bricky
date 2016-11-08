<template lang="html">
  <div class="account-wrap">
    <div class="account-header">
      账号设置
      <div class="line"></div>
    </div>
    <div class="account-body">
      <div class="input-wrap">
        <label for="avatar">头像</label>
        <!-- <div class="input-avatar-wrap">
          <input type="file" id="avatar-input" class="file-input" name="avatar" id="avatar">
          <img v-bind:src="m_avatar?m_avatar:m_default_avatar" v-bind:style="avatarStyle" />
        </div> -->
        <img v-bind:src="m_avatar" class="avatar-img" />
        <span class="float-right alter" v-on:click="f_alter_avatar">修改</span>
      </div>
      <div class="input-wrap">
        <label for="avatar">名称</label>
        <span>{{m_name}}<span/>
        <span class="float-right tip">不可修改</span>
      </div>
      <div class="input-wrap textarea-wrap">
        <label for="avatar">砖栏简介</label>
        <span class="mult-line">{{m_intro}}</span>
        <!-- <textarea name="name" class="intro" v-model="m_intro"></textarea> -->
        <span class="float-right alter" v-on:click="f_alter_intro(m_intro)">修改</span>
      </div>
      <div class="input-wrap textarea-wrap">
        <label for="avatar">个人介绍及作品</label>
        <span class="mult-line">{{m_works}}</span>
        <!-- <textarea name="name" class="intro" v-model="m_works"></textarea> -->
        <span class="float-right alter" v-on:click="f_alter_works(m_works)">修改</span>
      </div>
      <div class="input-wrap">
        <label for="avatar">邀请码</label>
        <span>{{m_code?m_code:"无"}}<span/>
      </div>
    </div>
  </div>
  <avatar-panel v-show='m_showAvatarPanel' :refresh='f_get_info' :content='m_avatar' :avatar-style='avatarStyle' :show.sync='m_showAvatarPanel'></avatar-panel>
  <intro-panel v-show='m_showIntroPanel' :refresh='f_get_info' :content='m_intro' :show.sync='m_showIntroPanel'></intro-panel>
  <work-panel v-show='m_showWorksPanel' :refresh='f_get_info' :content='m_works' :show.sync='m_showWorksPanel'></work-panel>
</template>

<script>
/*global Image:true*/
import IntroPanel from './IntroPanel.vue'
import WorkPanel from './WorksPanel.vue'
import AvatarPanel from './AvatarPanel.vue'
export default {
  data () {
    return {
      m_default_avatar: require('../../../assets/default.png'),
      m_avatar: this.m_default_avatar,
      m_name: '',
      m_intro: '',
      m_works: '',
      m_code: '',
      avatarStyle: {
        width: '100%',
        height: 'auto'
      },
      m_showWorksPanel: false,
      m_showIntroPanel: false,
      m_showAvatarPanel: false
    }
  },
  ready () {
    this.f_get_info()
  },
  methods: {
    f_get_info: function () {
      this.$http.get('/api/user').then((response) => {
        let body = response.body
        if (body.error === 'ok') {
          this.m_name = body.user.authorNickname
          this.m_avatar = body.user.authorAvatar || this.m_avatar
          this.m_intro = body.user.authorIntroduction
          this.m_works = body.user.works
          this.m_code = body.user.invitecode || ''
          this.f_init_avatar_panel()
        } else {
          this.$warn('获取个人信息错误')
        }
      })
    },
    f_init_avatar_panel: function () {
      // 初始化头像
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
      }
      image.src = this.m_avatar
    },
    f_alter_intro: function (intro) {
      this.m_showIntroPanel = true
    },
    f_alter_works: function (works) {
      this.m_showWorksPanel = true
    },
    f_alter_avatar: function () {
      console.log(this.avatarStyle.height)
      this.m_showAvatarPanel = true
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
  },
  components: {
    IntroPanel, WorkPanel, AvatarPanel
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
        .mult-line{
          display: inline-block;
          width: 600px;
        }
        // .input-avatar-wrap{
        //   display: inline-block;
        //   vertical-align: middle;
        //   overflow: hidden;
        //   position: relative;
        //   border-radius: 50%;
        //   background-color: #eee;
        //   width:40px;
        //   height:40px;
        //   input{
        //     cursor: pointer;
        //     opacity: 0;
        //     position: absolute;
        //     z-index: 1;
        //     top:0;
        //     left:0;
        //     width:100%;
        //     height:100%;
        //     border-radius: 50%;
        //   }
        //   img{
        //     position: absolute;
        //     top:50%;
        //     left:50%;
        //     border-radius: 50%;
        //     transform: translate3d(-50%,-50%,0);
        //     z-index: 0;
        //   }
        // }
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
