<template lang="html">
  <div class="material-wrap">
      <div class="material-item" v-for = 'material in materials'>
        <img v-bind:src="material.cover" class="cover" alt="封面图片" />
        <p class="title">{{material.title}}</p>
        <p class="date">{{material.date}}</p>
        <p class="intro">{{material.intro}}</p>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: ['materials'],
  computed: {},
  ready () {},
  attached () {},
  methods: {},
  components: {}
}
</script>

<style lang="scss" scoped>
.material-wrap{
  margin-top: 30px;
  padding:0 20px;
  height:340px;
  overflow-y: scroll;
  font-size: 0;
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
      border-bottom: 1px solid #eee;
    }
    &:nth-child(odd){
      border-bottom: 1px solid #eee;
      border-right: 1px solid #eee;
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
