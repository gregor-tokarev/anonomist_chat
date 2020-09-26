<template>
  <div class="input">
    <v-text-field label="Message" type="text" v-model.trim="message" @keydown.enter="sendMessage" class="input__input"></v-text-field>
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
