<template>
  <div class="load-wrapper">
    <div class="loader">
      <h1 class="loader__text">Wait for opponent</h1>
      <v-progress-linear indeterminate></v-progress-linear>
      <v-btn class="mt-5" color="primary" @click="quitSearch">Stop Searching</v-btn>
    </div>
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
  text-align: center;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);

  &__text {
    text-align: center;
  }
}

.load-wrapper {

}
</style>
