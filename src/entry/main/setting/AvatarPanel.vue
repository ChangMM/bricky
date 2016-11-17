<template lang="html">
  <div class="article-mask" transition="withdrawPanelIn">
    <div class="choose-wrap">
      <div class="choose-header">
        头像修改
        <div class="line"></div>
        <img src="../../../assets/close.png" v-on:click='f_close' class="close" />
      </div>
      <div class="search-wrap">
        <div class="input-avatar-wrap">
          <input type="file" v-on:change="f_avatar" id="avatar-input" class="file-input" name="avatar" id="avatar">
          <img v-bind:src="content" v-bind:style="avatarStyle" />
        </div>
        <p class="tip">点击头像上传新的小于2M的jpg、png、jpeg或者gif图片</p>
      </div>
      <div class="release-button-wrap txt-center">
        <span class='button release-button' v-on:click = 'f_alter_avatar'>确认修改</span>
      </div>
    </div>
  </div>
</template>

<script>
/*global Image:true, FormData:true, location:true*/
export default {
  data () {
    return {
    }
  },
  props: ['show', 'content', 'refresh', 'avatarStyle'],
  ready () {},
  methods: {
    f_close: function () {
      this.show = false
    },
    f_avatar: function (event) {
      let file = event.target.files[0]
      if (['gif', 'jpg', 'jpeg', 'png'].indexOf(file.type.split('/')[1].toLowerCase()) === -1) {
        return this.$warn('图片格式不对')
      }
      console.log(file.size)
      if (file.size / 1024 > 2048) {
        return this.$warn('图片大小过大')
      }
      this.$warn('图片上传中')
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
            self.content = imageUrl
          }
          image.src = imageUrl
        } else {
          this.$warn(body.msg)
        }
      })
    },
    f_alter_avatar: function () {
      this.$confirm().then(function () {
        this.$http.post('/api/user/avatar', {
          csrf: this.$cookies()['csrf'] || '',
          avatar: this.content
        }).then((response) => {
          let body = response.body
          if (body.error === 'ok') {
            this.$warn('修改成功', function () {
              this.f_close()
              location.reload()
              // this.refresh()
            }.bind(this))
          } else {
            this.$warn('修改失败，请重试')
          }
        })
      }.bind(this))
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
@import '../../../scss/base/_variable.scss';
@import '../../../scss/componments/_button.scss';
.article-mask{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index:9997;
  transition: background ease .6s;
  background: rgba(255, 255, 255, 0.9);
}
.choose-wrap{
  position: absolute;
  top:40%;
  left:50%;
  transform:translate(-50%, -50%);
  padding:30px 60px;
  border-radius: 2px;
  width:500px;
  background-color: #fff;
  box-shadow: 1px 1px 20px rgba(0,0,0,0.05),
              -1px -1px 20px rgba(0,0,0,0.05);
}
.choose-header{
  padding:10px 0;
  font-size:16px;
  font-weight: bolder;
  position:relative;
  .line{
    margin-top: 16px;
    width:100px;
    height:6px;
    background-color: $main-color;
  }
  .close{
    position: absolute;
    top:0;
    right:-30px;
    height:20px;
    cursor: pointer;
    transition: transform ease 0.4s;
    &:hover{
    }
  }
}
.search-wrap{
  margin-top:10px;
  text-align: center;
  .tip{
    font-size: 12px;
    color: #666;
    margin-top: 10px;
  }
  .input-avatar-wrap{
    display: inline-block;
    vertical-align: middle;
    background-color: #eee;
    width:100px;
    height:100px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    // 解决一个bug http://stackoverflow.com/questions/27296900/webkit-overflow-issue-on-border-radius-and-transform
    -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
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
      // border-radius: 50%;
      transform: translate3d(-50%,-50%,0);
      z-index: 0;
    }
  }
}
.release-button-wrap{
  margin-top: 30px;
}
.button{
  display: inline-block;
  width:120px;
  height:36px;
  line-height: 36px;
  border: 1px solid #ff6c74;
  cursor: pointer;
  color:#fff;
  background-color: #ff6c74;
  &:hover{
    background-color: darken(#ff6c74,5%);
  }
}
.withdrawPanelIn-transition{
  transition: all .2s ease;
}
.withdrawPanelIn-transition .choose-wrap{
  transition: all .2s ease;
}
.withdrawPanelIn-enter, .withdrawPanelIn-leave {
  opacity: 0;
}
.withdrawPanelIn-enter .choose-wrap, .withdrawPanelIn-leave .choose-wrap{
  transform:translate(-50%, -50%) scale(1.1);
}
</style>
