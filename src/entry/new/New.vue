<template lang="html">
  <div class="new-wrap base-width">
    <div class="bread-header">
      <img src="../../assets/return.png" v-on:click='f_return' class="return" alt="返回上一级" /> <span v-on:click='f_return' class="prev">内容管理/</span> <span class="now">新建作品</span>
    </div>
    <div class="brick-editor-wrap">
      <div class="editor-left">
        <div class="title-wrap">
          <div class="abbr-cover-wrap">
            <img v-bind:src="m_cover" v-bind:style="coverStyle" />
          </div>
          <p class="title"> {{ m_title | ellipsis 32 }}</p>
          <p class="abbr">{{ m_abbr | ellipsis 22 }}</p>
        </div>
        <p class="cover-tip tip">封面</p>
        <div class="cover-wrap">
          <input type="file" v-on:change="f_cover" class="file-input">
          <img v-bind:src="m_cover" v-bind:style="coverStyle" />
          <p class="cover-tip" v-show="m_cover==''">点击上传封面</p>
        </div>
        <div class="abbr-cover">
          <p class="abbr-tip tip clearfix">摘要 <span class='float-right'>未填写自动抓取正文的前22个字</span></p>
          <textarea name="abbr" v-model="m_abbr" placeholder="请填写摘要" class="abbr-edit"></textarea>
          <span class="word-tip">{{ m_abbr | len }}/22</span>
        </div>
      </div>
      <div class="editor-main">
        <div class="btn-toolbar clearfix" data-role="editor-toolbar" data-target="#editor">
          <div class="btn-group">
            <a class="btn undo" data-edit="undo" title="取消(Ctrl/Cmd+Z)"></a>
            <a class="btn redo" data-edit="redo" title="重做(Ctrl/Cmd+Y)"></a>
            <a class="btn upload" title="插入图片"><input type="file" data-edit="insertImage" /></a>
          </div>
          <div class="btn-group float-right">
            <span class="button save" v-on:click='f_save($event)'>保存</span>
            <span class="button view" v-on:click='f_preview'>预览</span>
            <span class="button release" v-on:click='f_save_release'>保存并发布</span>
          </div>
        </div>
        <div class="title-wrap">
          <img src="../../assets/left.png" class="left" />
          <img src="../../assets/right.png" class="right" />
          <input type="text" class="title" v-model="m_title" placeholder="请在这里输入标题">
          <span class="word-tip">{{ m_title | len }}/32</span>
        </div>
        <div id="editor" v-on:focus="f_editor_focus" v-on:blur="f_editor_blur">这里开始正文</div>
      </div>
    </div>
  </div>
  <preview v-show="m_preview" :show.sync="m_preview" :title="m_title" :time="m_time" :content="m_content"></preview>
</template>

<script>
/* global Image:true, $:true, history:true, FormData:true, location:true */
import Preview from './Preview.vue'
import Editor from '../../js/lib/Editor.js'
import Hotkeys from '../../js/lib/jquery.hotkeys.js'
export default {
  data () {
    return {
      coverStyle: {
        width: 'auto',
        height: 'auto'
      },
      m_aid: '',
      m_cover: '',
      m_title: '',
      m_abbr: '',
      m_preview: false,
      m_time: new Date(),
      m_content: ''
    }
  },
  ready () {
    Hotkeys($)
    Editor($)
    $('#editor').wysiwyg()
    $(window).bind('beforeunload', function () {
      return '您可能有数据没有保存'
    })
    this.f_get_edit_content()
  },
  methods: {
    f_get_edit_content: function () {
      let pid = this.$parseUrl(location.href).params['pid']
      if (!pid) {
        console.log()
      } else {
        this.$http.get('/api/post', {
          params: {
            crsf: this.$cookies()['csrf'] || '',
            postId: pid
          }
        }).then((response) => {
          let body = JSON.parse(response.body)
          let post = body.post
          this.m_title = post.title
          this.m_abbr = post.digest
          this.m_content = post.words
          this.m_cover = post.images[0]
          this.m_aid = pid
          // 填充文章内容
          $('#editor').html(this.m_content)
          // 调整图片
          this.f_image(this.m_cover)
        })
      }
    },
    f_cover: function (event) {
      let file = event.target.files[0]
      // 上传图片
      this.f_upload_cover(file).then((response) => {
        let body = response.body
        let imageUrl = body.url
        if (body.error === 'ok') {
          this.f_image(imageUrl)
        } else {
          this.$warn(body.msg)
        }
      })
      // let file = event.target.files[0]
      // let self = this
      // let reader = new FileReader()
      // reader.onload = function (e) {
      //   let data = e.target.result
      //   let image = new Image()
      //   image.onload = function () {
      //     let width = image.width
      //     let height = image.height
      //     if (width > height) {
      //       self.coverStyle.height = '100%'
      //       self.coverStyle.width = 'auto'
      //     } else {
      //       self.coverStyle.height = 'auto'
      //       self.coverStyle.width = '100%'
      //     }
      //     self.m_cover = data
      //   }
      //   image.src = data
      // }
      // reader.readAsDataURL(file)
    },
    f_image: function (imageUrl) {
      let image = new Image()
      let self = this
      image.onload = function () {
        let width = image.width
        let height = image.height
        if (width > height) {
          self.coverStyle.height = '100%'
          self.coverStyle.width = 'auto'
        } else {
          self.coverStyle.height = 'auto'
          self.coverStyle.width = '100%'
        }
        self.m_cover = imageUrl
      }
      image.src = imageUrl
    },
    // 上传图片的函数
    f_upload_cover: function (data) {
      var formData = new FormData()
      formData.append('csrf', this.$cookies()['csrf'] || '')
      formData.append('file', data)
      return this.$http.post('/api/upload', formData)
    },
    f_return: function () {
      history.back()
    },
    f_editor_focus: function () {
      if ($('#editor').html() === '这里开始正文') {
        $('#editor').html('')
      }
    },
    f_editor_blur: function () {
      if ($('#editor').html() === '') {
        $('#editor').html('这里开始正文')
      }
    },
    f_save: function (event) {
      this.m_content = $('#editor').html()
      let currentTarget = event.currentTarget
      if (currentTarget.classList.contains('disable')) {
        return
      } else {
        currentTarget.classList.add('disable')
        currentTarget.innerHTML = '正在保存'
        this.$http.post('/api/post', {
          aid: this.m_aid,
          csrf: this.$cookies()['csrf'] || '',
          title: this.m_title,
          digest: this.m_abbr,
          words: this.m_content,
          cover: this.m_cover
        }).then((response) => {
          let body = JSON.parse(response.body)
          if (body.error === 'ok') {
            this.$warn('保存成功')
            currentTarget.innerHTML = '保存'
          } else {
            this.$warn('保存失败')
            currentTarget.innerHTML = '请重试'
          }
          currentTarget.classList.remove('disable')
        })
      }
    },
    f_save_release: function (event) {
      this.m_content = $('#editor').html()
      let currentTarget = event.currentTarget
      if (currentTarget.classList.contains('disable')) {
        return
      } else {
        currentTarget.classList.add('disable')
        currentTarget.innerHTML = '正在发布'
        this.$http.post('/api/post', {
          aid: this.m_aid,
          csrf: this.$cookies()['csrf'] || '',
          title: this.m_title,
          digest: this.m_abbr,
          words: this.m_content,
          cover: this.m_cover
        }).then((response) => {
          let body = JSON.parse(response.body)
          if (body.error === 'ok') {
            this.f_release(body.post.id)
            currentTarget.innerHTML = '保存并发布'
          } else {
            this.$warn('发布失败')
            currentTarget.innerHTML = '请重试'
          }
          currentTarget.classList.remove('disable')
        })
      }
    },
    f_release: function (pid) {
      this.$http.post('/api/publish/post', {
        pid: pid
      }).then((response) => {
        let body = response.body
        if (body.error === 'ok') {
          this.$warn('发布文章成功')
        } else {
          this.$warn('发布失败')
          this.$warn(body.msg)
        }
      })
    },
    f_preview: function () {
      this.m_content = $('#editor').html()
      this.m_preview = true
    }
  },
  components: {
    Preview
  }
}
</script>

<style lang="scss">
  @import '../../scss/base/_mixin.scss';
  @import '../../scss/base/_variable.scss';
  @import '../../scss/componments/_button.scss';
  @import '../../scss/componments/_preview.scss';
  //新建文章的页面样式控制
  .new-wrap{
    margin:0 auto;
  }
  //面包导航
  .bread-header{
    margin-top: 30px;
    img.return{
      height:20px;
      vertical-align: middle;
      cursor: pointer;
    }
    span{
      &.prev{
        color: #666;
        cursor: pointer;
      }
      &.now{
        color:#000;
      }
    }
  }

  //编辑器主体样式
  .brick-editor-wrap{
    margin-top: 20px;
    padding-left: 300px;
    position: relative;
  }
  .editor-left{
    width:300px;
    position: absolute;
    top:0;
    left:0;
    .title-wrap{
      position: relative;
      height:100px;
      .abbr-cover-wrap{
        position: absolute;
        height:100px;
        width:100px;
        top:0;
        left:0;
        background: url('../../assets/editBack.png') center center;
        background-size: cover;
        overflow: hidden;
        img{
          position: absolute;
          top:50%;
          left:50%;
          transform: translate3d(-50%,-50%,0);
          z-index: 0;
        }
      }
      .title{
        width:190px;
        position: absolute;
        top:-2px;
        left:110px;
        height: 63px;
      }
      .abbr{
        width:190px;
        position: absolute !important;
        color: #999;
        font-size: 12px;
        bottom:-4px;
        left:110px;
        height:36px;
      }
    }
    .tip{
      margin-top: 20px;
      font-weight: bold;
      span{
        font-size: 12px;
        color:#999;
        position: relative;
        top:4px;
      }
    }
    .cover-wrap{
      position: relative;
      height:300px;
      width:300px;
      background: url('../../assets/editBack.png') center center;
      background-size: cover;
      overflow: hidden;
      .cover-tip{
        width:100px;
        color: #999;
        height:20px;
        font-size: 12px;
        position: absolute;
        z-index: 1;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin: auto;
      }
      input{
        cursor: pointer;
        opacity: 0;
        position: absolute;
        z-index: 2;
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
    .abbr-wrap{
      position: relative;
    }
    // 摘要输入框
    .abbr-edit{
      margin-top: 4px;
      padding:5px;
      color:#666;
      height:60px;
      width:100%;
      box-sizing: border-box;
      border-radius: 2px;
      outline: none;
      resize: none;
      border:1px solid #ddd;
    }
    .word-tip{
      position: absolute;
      font-size: 12px;
      color:#999;
      right:2px;
      bottom:6px;
    }
  }
  .editor-main{
    padding:0 40px;
    div[data-role="editor-toolbar"] {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .btn-toolbar{
      padding:6px;
      border-bottom:1px solid #ddd;
      .btn-group{
        display: inline-block;
        .button{
          display: inline-block;
          width:100px;
          height:30px;
          font-size: 12px;
          line-height: 30px;
          border: 1px solid #ff6c74;
          margin-left: 12px;
          &.firt-child{
            margin-left: 0;
          }
          &.save{
            color:#ff6c74;
            &:hover{
              color:#fff;
              background-color: darken(#ff6c74,5%);
            }
          }
          &.release,&.view{
            color:#fff;
            background-color: #ff6c74;
            &:hover{
              background-color: darken(#ff6c74,5%);
            }
          }
          &.disable{
            color: #fff;
            background-color: lighten(#ff6c74,10%);
            border-color: lighten(#ff6c74,10%);
          }
        }
        .btn{
          display: inline-block;
          height:30px;
          line-height: 30px;
          text-align: center;
          width:30px;
          border-radius: 2px;
          cursor: pointer;
          background-size: 16px;
          background-position: center;
          background-repeat: no-repeat;
          &:hover{
            background-color: #ddd;
          }
          &.undo{
            background-image:url('../../assets/undo.png');
          }
          &.redo{
            background-image: url('../../assets/redo.png');
          }
          &.upload{
            background-image: url('../../assets/upload.png');
            position: relative;
            input{
              cursor: pointer;
              position: absolute;
              opacity: 0;
              top:0;
              left:0;
              width:100%;
              height:100%;
            }
          }
        }
      }
    }
    .title-wrap{
      width:90%;
      margin: 30px auto 0;
      position: relative;
      .left{
        position: absolute;
        top:-8px;
        left:-16px;
      }
      .right{
        position: absolute;
        top:-8px;
        right:-16px;
      }
      .title{
        border:none;
        outline:none;
        width:100%;
        height:50px;
        font-size: 16px;
        color:#666;
        border-bottom: 1px solid #ddd;
        background-color: transparent;
      }
      .word-tip{
        position: absolute;
        bottom:16px;
        right:6px;
        color: #aaa;
        font-size: 12px;
      }
    }
    #editor {
      width:90%;
      margin: 10px auto 0;
    	max-height: 600px;
    	height: 500px;
    	padding: 4px;
      color:#333;
    	box-sizing: border-box;
    	overflow-y: scroll;
    	outline: none;
      img{
        max-width:100%;
      }
    }
    #editor::-webkit-scrollbar {
      width: 6px;
    }
    #editor::-webkit-scrollbar-thumb {
      background-color: #ddd;
    }
    #editor::-webkit-scrollbar-track {
      border:1px solid #eee;
    }
  }
</style>
