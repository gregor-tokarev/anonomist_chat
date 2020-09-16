<template>
  <div class="chat">
    <Message v-for="(message, index) in messages" :key="index" :text="message"></Message>
    <input type="text" v-model.trim="message" @keydown.enter="sendMessage">
  </div>
</template>

<script>

import Message from '../components/Message'
import connection from '../assets/js/socket'

export default {
  name: 'Chat',
  components: { Message },
  data: () => ({
    messages: [],
    message: ''
  }),
  mounted() {
    connection.on('messageFormServer', message => {
      this.messages.push(message.message)
    })
    connection.emit('requestReconnect', this.$route.query.chatId)

    connection.on('partnerLeave', () => {
      console.log('leave')
      connection.emit('leaveChat', this.$route.query.chatId)
    })
  },
  methods: {
    sendMessage() {
      const chatId = this.$route.query.chatId
      connection.emit('message', { message: this.message, chat: { id: chatId } })
    }
  }
}
</script>

<style scoped>

</style>
