<template>
  <div class="input">
    <input type="text" v-model.trim="message" @keydown.enter="sendMessage" class="input__input">
  </div>
</template>

<script>
import connection from '@/assets/js/socket'
import setMessageToSs from '../assets/js/setMessageToSs'

export default {
  name: 'MessageInput',
  data: () => ({
    message: ''
  }),
  methods: {
    sendMessage() {
      const chatId = this.$route.query.chatId
      connection.emit('message', { message: this.message, chat: { id: chatId } })
      setMessageToSs(this.message)
      this.message = ''
    }
  }
}
</script>

<style scoped>

</style>
