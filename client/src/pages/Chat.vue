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
  beforeRouteLeave(to, from, next) {
    window.onbeforeunload = undefined
    connection.emit('leaveChat', { chatId: this.$route.query.chatId, first: true })
    next()
  },
  mounted() {
    connection.on('messageFormServer', message => {
      this.messages.push(message.message)
    })

    connection.emit('requestReconnect', this.$route.query.chatId)

    connection.on('partnerLeave', () => {
      connection.emit('leaveChat', { chatId: this.$route.query.chatId, first: false })
      this.$router.replace({ name: 'choose' })
    })

    window.onbeforeunload = function() {
      connection.emit('leaveChat', { chatId: this.$route.query.chatId, first: true })
      return false
    }
  },
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
