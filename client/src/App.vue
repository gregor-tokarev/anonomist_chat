<template>
  <v-app id="app">
    <v-app-bar app>
      <v-icon @click="changeTheme">mdi-brightness-4</v-icon>
    </v-app-bar>
    <v-main class="content">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['setUsersInfo']),
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('theme', this.$vuetify.theme.dark)
    }
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
