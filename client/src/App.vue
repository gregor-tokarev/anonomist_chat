<template>
  <div id="app">
    <v-app-bar></v-app-bar>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['setUsersInfo'])
  },
  mounted() {
    this.setUsersInfo()
  }
}
</script>

<style lang="scss">
#app {
  background-color: #ffefef;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
