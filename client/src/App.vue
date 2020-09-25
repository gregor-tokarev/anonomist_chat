<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Header from '@/components/Header'

export default {
  components: { Header },
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
