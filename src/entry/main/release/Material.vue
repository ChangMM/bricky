<template lang="html">
  <div class="material-wrap">
    <template v-if="m_libs.length !=0">
      <div class="material-item" v-on:click="f_choose(material.id,$event)" v-for = "material in m_libs | filterBy filter in 'title' | orderBy 'updateTime' -1 ">
        <img v-bind:src="material.images[0]?material.images[0]:m_default_cover" class="cover" alt="封面图片" />
        <p class="title">{{material.title | ellipsis 25}}</p>
        <p class="date">{{material.updateTime | timeFormat}}</p>
        <p class="intro">{{material.digest | ellipsis 22}}</p>
      </div>
    </template>
    <template v-if="m_libs.length ==0">
      <p class="no-article">暂无内容</p>
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      m_libs: [],
      m_default_cover: require('../../../assets/default.png')
    }
  },
  props: ['filter', 'pid'],
  ready () {
    this.f_get_libs()
  },
  methods: {
    f_get_libs: function () {  // 获取素材库的图文
      this.$http.get('/api/posts/lib', {
        params: {
          limit: 100,
          offset: 0
        }
      }).then((response) => {
        let body = response.body
        if (body.error === 'ok') {
          this.m_libs = body.posts
        } else {
          this.$warn(body.msg)
        }
      })
    },
    f_choose: function (pid, e) {
      // 并没有采用事件委托的方式
      // let currentTarget = e.currentTarget
      // let target = e.target
      // while (target !== currentTarget) {
      //   target = target.parentNode
      //   console.log(target)
      // }
      // 应该采用事件委托的方式效率会高点
      // 这一段代码可以改进 效率不够高

      let currentTarget = e.currentTarget
      if (currentTarget && currentTarget.classList.contains('material-item')) {
        if (currentTarget.classList.contains('active')) {
          this.pid = ''
          currentTarget.classList.remove('active')
        } else {
          this.pid = pid
          if (document.querySelector('.material-wrap .material-item.active')) {
            document.querySelector('.material-wrap .material-item.active').classList.remove('active')
          }
          currentTarget.classList.add('active')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .material-wrap{
    margin-top: 30px;
    padding:0 20px;
    height:340px;
    overflow-y: scroll;
    font-size: 0;
    .no-article{
      font-size: 16px;
      line-height: 50px;
      height:50px;
      text-align: center;
    }
    .material-item{
      cursor: pointer;
      display: inline-block;
      padding:20px;
      padding-left:130px;
      position: relative;
      height:140px;
      width:50%;
      box-sizing: border-box;
      vertical-align: bottom;
      .cover{
        height:100px;
        width:100px;
        position: absolute;
        top:20px;
        left:20px;
      }
      .title{
        font-size: 16px;
        font-weight: bold;
        line-height: 1.2;
        height:40px;
        position: relative;
        top:-2px;
      }
      .date{
        font-size:12px;
        line-height: 1.5;
        color:#999;
      }
      .intro{
        position: relative;
        top:5px;
        font-size:14px;
        line-height: 1.5;
        color:#666;
        height:42px;
      }
      &:nth-child(even){
        border:1px solid #FFF;
        border-bottom: 1px solid #eee;
      }
      &:nth-child(odd){
        border:1px solid #FFF;
        border-bottom: 1px solid #eee;
        border-right: 1px solid #eee;
      }
      &.active{
        border-color:#ff6c74;
      }
    }
  }
  .material-wrap::-webkit-scrollbar {
    width: 6px;
  }
  .material-wrap::-webkit-scrollbar-thumb {
    background-color: #ddd;
  }
  .material-wrap::-webkit-scrollbar-track {
    border:1px solid #eee;
  }
</style>
