<template lang="html">
  <div class="body-header">
    <div class="header-item">
      <p class="tip">新增订阅</p>
      <p class="num">{{ mp_data.dailyNewSubsNum}}</p>
    </div>
    <div class="header-item">
      <p class="tip">总订阅</p>
      <p class="num">{{ mp_data.subsNum }}</p>
    </div>
    <div class="header-item last-item">
      <p class="tip">未提现收入（￥）</p>
      <p class="num">{{ ((mp_data.totalIncome - mp_data.availableWithdraw) / 100).toFixed(2)  }}</p>
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
  <setting-panel v-show='m_show_setting_panel' :show.sync='m_show_setting_panel'></setting-panel>
</template>

<script>
/* global */
import announcementItem from './AnnouncementItem.vue'
import SettingPanel from './SettingPanel.vue'
export default {
  data () {
    return {
      m_show_setting_panel: false,
      mp_data: {
        availableWithdraw: 0,
        dailyNewSubsNum: 0,
        subsNum: 0,
        totalIncome: 0
      },
      announcements: [
        {
          url: '/annoucement#!/rule',
          title: '提现及定价规则',
          date: '2016/10/31'
        },
        {
          url: '/annoucement#!/protocol',
          title: '《砖栏用户协议》',
          date: '2016/10/31'
        }
      ]
    }
  },
  ready () {
    this.f_mp_data()
    this.f_check_sub()
  },
  methods: {
    // 获取订阅数以及未提现金额的有关数据
    f_mp_data: function () {
      this.$http.get('/api/stats', {
        params: {
          csrf: this.$cookies()['csrf'] || ''
        }
      }).then((response) => {
        this.mp_data = response.body.data
        this.mp_data.availableWithdraw = this.mp_data.availableWithdraw
      }, (response) => {
        console.log(response)
      })
    },
    // 检查是否设置年费
    f_check_sub: function () {
      // if (!localStorage.getItem('is_priced')) {
      //   this.$http.get('/api/subsprice').then((response) => {
      //     let body = response.body
      //     localStorage.setItem('is_priced', true)
      //     if (body.error === 'subsinfo:missing') {
      //       let self = this
      //       setTimeout(function () {
      //         self.m_show_setting_panel = true
      //       }, 1000)
      //     }
      //   }, (response) => {
      //     //  nihao
      //   })
      // }
      this.$http.get('/api/subsprice', {
        params: {
          csrf: this.$cookies()['csrf'] || ''
        }
      }).then((response) => {
        let body = response.body
        if (body.error === 'subsinfo:missing') {
          let self = this
          setTimeout(function () {
            self.m_show_setting_panel = true
          }, 1000)
        }
      }, (response) => {
        //  nihao
      })
    }
  },
  components: {
    SettingPanel,
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
