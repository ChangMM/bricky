<template lang="html">
  <div class="new-wrap base-width">
    <div class="bread-header">
      <img src="../../assets/return.png" class="return" alt="返回上一级" /> <span class="prev">内容管理/</span> <span class="now">新建作品</span>
    </div>
    <div class="brick-editor-wrap">
      <div class="editor-left">
        <div class="title-wrap">
          <div class="abbr-cover-wrap">
            <input type="file" v-on:change="f_abbr_cover" class="file-input">
            <img v-bind:src="m_abbr_cover" v-bind:style="abbrCoverStyle" />
          </div>
          <p class="title"> {{ m_title | ellipsis 22 }}</p>
          <p class="abbr">{{ m_abbr | ellipsis 22 }}</p>
        </div>
        <p class="cover-tip tip">封面</p>
        <div class="cover-wrap">
          <input type="file" v-on:change="f_cover" class="file-input">
          <img v-bind:src="m_cover" v-bind:style="coverStyle" />
        </div>
        <div class="abbr-cover">
          <p class="abbr-tip tip clearfix">摘要 <span class='float-right'>未填写自动抓取正文的前22个字</span></p>
          <textarea name="abbr" v-model="m_abbr" class="abbr-edit"></textarea>
          <span class="word-tip">{{ m_abbr | len }}/22</span>
        </div>
      </div>
      <div class="editor-main">

      </div>
    </div>
  </div>
</template>

<script>
/*global FileReader:true, Image:true*/
export default {
  data () {
    return {
      abbrCoverStyle: {
        width: 'auto',
        height: 'auto'
      },
      coverStyle: {
        width: 'auto',
        height: 'auto'
      },
      m_cover: '',
      m_abbr_cover: '',
      m_title: '这是标题',
      m_abbr: '这是摘要'
    }
  },
  methods: {
    f_abbr_cover: function (event) {
      let file = event.target.files[0]
      let self = this
      let reader = new FileReader()
      reader.onload = function (e) {
        let data = e.target.result
        let image = new Image()
        image.onload = function () {
          let width = image.width
          let height = image.height
          if (width > height) {
            self.abbrCoverStyle.height = '100%'
            self.abbrCoverStyle.width = 'auto'
          } else {
            self.abbrCoverStyle.height = 'auto'
            self.abbrCoverStyle.width = '100%'
          }
          self.m_abbr_cover = data
        }
        image.src = data
      }
      reader.readAsDataURL(file)
    },
    f_cover: function (event) {
      let file = event.target.files[0]
      let self = this
      let reader = new FileReader()
      reader.onload = function (e) {
        let data = e.target.result
        let image = new Image()
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
          self.m_cover = data
        }
        image.src = data
      }
      reader.readAsDataURL(file)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import '../../scss/base/_mixin.scss';
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
    .title{
      width:190px;
      position: absolute;
      top:-2px;
      left:110px;
      height: 42px;
      // @include multi-ellipsis;
    }
    .abbr{
      width:190px;
      position: absolute !important;
      color: #999;
      font-size: 12px;
      bottom:-4px;
      left:110px;
      height:36px;
      // @include multi-ellipsis(#999);
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

</style>
