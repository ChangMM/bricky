<template lang="html">
  <div class="article-mask">
    <div class="choose-wrap">
      <div class="choose-header">
        作品发布
        <div class="line"></div>
        <img src="../../../assets/close.png" v-on:click='f_close' class="close" />
      </div>
      <div class="search-wrap clearfix">
        <input type="text" class="search-input" v-model="m_input" placeholder="输入标题文字">
        <a href="new.html"><span class='button float-right'>新建作品</span></a>
      </div>
      <Material :materials="materials"> </Material>
      <div class="release-button-wrap txt-center">
        <span class='button release-button'>确认发布</span>
      </div>
    </div>
  </div>
</template>

<script>
import Material from './Material'
export default {
  data () {
    return {
      m_input: '',
      materials: [
        {
          cover: require('../../../assets/cover.png'),
          title: '细心专研，深入探讨，就不愁没有新发现',
          date: '2016/09/11',
          intro: '深入研究神话思维，并揭秘这种影响不仅有利于'
        },
        {
          cover: require('../../../assets/cover.png'),
          title: '细心专研，深入探讨，就不愁没有新发现',
          date: '2016/09/11',
          intro: '深入研究神话思维，并揭秘这种影响不仅有利于'
        },
        {
          cover: require('../../../assets/cover.png'),
          title: '细心专研，深入探讨，就不愁没有新发现',
          date: '2016/09/11',
          intro: '深入研究神话思维，并揭秘这种影响不仅有利于'
        },
        {
          cover: require('../../../assets/cover.png'),
          title: '细心专研，深入探讨，就不愁没有新发现',
          date: '2016/09/11',
          intro: '深入研究神话思维，并揭秘这种影响不仅有利于'
        }
      ]
    }
  },
  props: ['show'],
  computed: {},
  ready () {},
  attached () {},
  methods: {
    f_close: function () {
      this.show = false
    }
  },
  components: {
    Material
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
  transition: background ease .6s;
  background: rgba(255, 255, 255, 0.9);
}
.choose-wrap{
  position: absolute;
  top:46%;
  left:50%;
  transform:translate(-50%, -50%);
  padding:20px 60px;
  border-radius: 2px;
  width:800px;
  height:560px;
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
      transform: rotate(90deg);
    }
  }
}
.search-wrap{
  margin-top:10px;
  .search-input{
    height:32px;
    border:1px solid #ddd;
    outline:none;
    width:300px;
    padding-left: 5px;
    padding-right: 40px;
    font-size: 14px;
    border-radius: 2px;
    &:focus{
      border-color: #ff6c74;
    }
  }
}
.release-button-wrap{
  margin-top: 30px;
}
.button{
  display: inline-block;
  width:120px;
  height:32px;
  line-height: 32px;
  border: 1px solid #ff6c74;
  cursor: pointer;
  color:#fff;
  background-color: #ff6c74;
  &:hover{
    background-color: darken(#ff6c74,5%);
  }
}
</style>
