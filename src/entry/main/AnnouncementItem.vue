<template lang="html">
  <ul>
    <a href="{{announcement.url}}" target="_blank" v-for="announcement in announcements">
      <li class="clearfix">
        <span class="float-left title">{{announcement.title}}</span>
        <span class="float-right date">{{announcement.date}}</span>
      </li>
    </a>
  </ul>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['announcements'],
  computed: {},
  ready () {},
  attached () {},
  methods: {},
  components: {}
}
</script>

<style lang="scss" scoped>
@import '../../scss/base/_variable.scss';
li{
  line-height: 44px;
  height:44px;
  &:hover{
    .title{
      color:$main-color;
    }
  }
  .title{
    color: #666;
  }
  .date{
    color: #999;
  }
}
</style>
