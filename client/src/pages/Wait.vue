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
    // window.onbeforeunload = function() {
    //   const xhr = new XMLHttpRequest()
    //   xhr.open('GET', process.env.VUE_APP_SOCKET_SERVER_URL + '/conn', false)
    //   xhr.send()
    //   return false
    // }

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
      // const xhr = new XMLHttpRequest()
      // xhr.open('GET', process.env.VUE_APP_SOCKET_SERVER_URL + '/conn', true)
      // xhr.send()
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
