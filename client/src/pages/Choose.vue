<template>
  <div class="choose">
    Age <input type="number" v-model="age" class="input">
    preferAge min <input type="number" v-model.number="preferAge.min" class="input">
    preferAge max<input type="number" v-model.number="preferAge.max" class="input">
    gender <input type="text" v-model="gender" class="input">
    preferGender <input type="text" v-model="preferGender" class="input">
    <button @click="joinSearch">start</button>
  </div>
</template>

<script>
import connection from '../assets/js/socket'

export default {
  name: 'Choose',
  data: () => ({
    age: 15,
    preferAge: {
      min: 12,
      max: 18
    },
    gender: 'both',
    preferGender: 'both'
  }),
  mounted() {
    connection.on('chatFound', chat => {
      connection.emit('joinChat', chat, () => {
        this.$router.push({ name: 'chat', query: { chatId: chat.id } })
      })
    })
  },
  methods: {
    joinSearch() {
      connection.emit('joinSearch', {
        age: this.age,
        preferAge: this.preferAge,
        gender: this.gender,
        preferGender: this.preferGender
      })
    }
  }
}
</script>

<style scoped lang="scss">
.choose {
  min-height: 100vh;

  .input {
    display: block;
    margin: 0 0 10px;
  }
}

</style>
