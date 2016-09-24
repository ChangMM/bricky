<template lang="html">
  <div class="copyright txt-center">
    Copyright © {{m_year}} 笔阁科技 . All Rights Reserved.
  </div>
</template>

<script>
export default {
  data () {
    return {
      m_year: new Date().getYear() + 1900
    }
  }
}
</script>

<style lang="scss" scoped>
.copyright{
  width:100%;
  color:#999;
  font-size: 12px;
  position: absolute;
  bottom:6px;
}
</style>
