<template>
  <div class="load-wrapper">
    <v-btn @click="quitSearch">Disconnect</v-btn>
    <v-progress-linear indeterminate class="loader"></v-progress-linear>
  </div>
</template>

<script>
import connection from '../assets/js/socket'

export default {
  name: 'Wait',
  props: {
    waitFor: {
      type: Promise
    },
    destiny: {
      type: [String, Object]
    }
  },
  data: () => ({
    user: {}
  }),
  mounted() {
    connection.on('chatFound', chat => {
      connection.emit('joinChat', chat, () => {
        this.$router.push({ name: 'chat', query: { chatId: chat.id } })
      })
    })

    const { age, gender, preferGender, preferAgeMin, preferAgeMax } = this.$route.query

    this.$route.query.age && connection.emit('joinSearch', {
      age,
      preferAge: {
        min: preferAgeMin,
        max: preferAgeMax
      },
      gender,
      preferGender
    }, user => {
      this.user = user
    })
  },
  methods: {
    quitSearch() {
      connection.emit('quitSearch', this.user.id, () => {
        this.$router.replace({ name: 'choose' })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.loader {
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.load-wrapper {

}
</style>
