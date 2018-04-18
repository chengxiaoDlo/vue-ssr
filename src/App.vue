<template>
  <div id="app">
    <loading v-if="loading"></loading>
    <router-view/>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Loading
  },
  computed: mapState([
    'loading'
  ])
}
</script>

<style type="text/scss" lang="scss">
@import "../node_modules/iview/dist/styles/iview.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
