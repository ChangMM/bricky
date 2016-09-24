<template lang="html">
  <div class="body-header">
    <div class="header-item">
      <p class="tip">新增订阅</p>
      <p class="num">100</p>
    </div>
    <div class="header-item">
      <p class="tip">总订阅</p>
      <p class="num">108</p>
    </div>
    <div class="header-item last-item">
      <p class="tip">未提现收入（￥）</p>
      <p class="num">208</p>
    </div>
  </div>
  <div class="announcement-wrap">
      <div class="announcement-header">
        公告
        <div class="line"></div>
      </div>
      <div class="announcement-body">
        <item :announcements = "announcements"></item>
      </div>
  </div>
</template>

<script>
import announcementItem from './AnnouncementItem.vue'

export default {
  data () {
    return {
      announcements: [
        {
          url: '#',
          title: '订阅者管理功能升级',
          date: '2016/09/11'
        },
        {
          url: '#',
          title: '砖栏作家1.2.2版本的更新功能',
          date: '2016/09/11'
        },
        {
          url: '#',
          title: '《砖栏平台服务协议》',
          date: '2016/09/11'
        }
      ]
    }
  },
  computed: {},
  ready () {},
  methods: {},
  components: {
    item: announcementItem
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base/_variable.scss';
//主体样式控制
.body-header{
  .header-item{
    width:32%;
    box-sizing: border-box;
    padding: 15px 8px;
    display: inline-block;
    .tip{
      color:#666;
    }
    &.last-item{
      .num{
        border-right: none;
      }
    }
    .num{
      color:#ff6c74;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 40px;
      font-weight: bolder;
      border-right: 1px solid #ddd;
    }
  }
}
.announcement-header{
  padding:10px 0;
  .line{
    margin-top: 8px;
    width:100px;
    height:6px;
    background-color: $main-color;
  }
}
</style>
