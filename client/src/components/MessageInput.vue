<template>
  <div class="input">
    <input type="text" v-model="message" @keydown.enter="sendMessage" class="input__input">
  </div>
</template>

<script>
import connection from '@/assets/js/socket'

export default {
  name: 'MessageInput',
  data: () => ({
    message: ''
  }),
  methods: {
    sendMessage() {
      const chatId = this.$route.query.chatId
      connection.emit('message', { message: this.message, chat: { id: chatId } })
      this.message = ''
    }
  }
}
</script>

<style scoped>

</style>
