<template>
  <div id="app">
    <img class="logo" src="../../assets/logo.png">
    <hello></hello>
  </div>
</template>

<script>
import Hello from '../../components/Hello'

export default {
  components: {
    Hello
  }
}
</script>

<style lang="scss">
html {
  height: 100%;
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}



#app {
  color: red;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: red;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
