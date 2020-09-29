<template>
  <v-app-bar app>
    <v-icon @click="changeTheme">mdi-brightness-4</v-icon>
    <v-spacer></v-spacer>
    Online: {{ usersInfo.online }}
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('theme', this.$vuetify.theme.dark)
    }
  },
  computed: {
    ...mapGetters(['usersInfo'])
  }
}
</script>

<style scoped lang="scss">

</style>
