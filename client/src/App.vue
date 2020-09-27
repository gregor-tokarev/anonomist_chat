<template>
  <v-app id="app">
    <Header></Header>
    <v-main class="content">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import Header from './components/Header'

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
.content {
  position: relative;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
