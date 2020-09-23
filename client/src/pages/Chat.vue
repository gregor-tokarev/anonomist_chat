<template>
  <div class="chat">
    <Message v-for="(message, index) in messages" :key="index" :text="message.message"></Message>
    <button @click="leaveChat">Leave Chat</button>
    <MessageInput></MessageInput>
  </div>
</template>

<script>

import Message from '../components/Message'
import connection from '../assets/js/socket'
import { mapActions, mapGetters } from 'vuex'
import MessageInput from '@/components/MessageInput'

export default {
  name: 'Chat',
  components: { MessageInput, Message },
  data: () => ({}),
  beforeRouteLeave(to, from, next) {
    connection.emit('leaveChat', { chatId: this.$route.query.chatId, first: true })
    sessionStorage.removeItem('chatId')
    this.clearMessages()
    connection.removeAllListeners('messageFormServer')
    next()
  },
  mounted() {
    sessionStorage.setItem('chatId', this.$route.query.chatId)
    this.startAddingMessages()

    connection.on('messageFormServer', data => {
      console.log(data)
      connection.emit('message', { message: data, chatId: this.$route.query.chatId, first: false })
    })

    sessionStorage.getItem('chatId') && connection.emit('requestReconnect', sessionStorage.getItem('chatId'), history => {
      this.setHistory(history)
    })

    connection.on('partnerLeave', () => {
      connection.emit('leaveChat', { chatId: this.$route.query.chatId, first: false })
      this.$router.replace({ name: 'choose' })
    })
  },
  methods: {
    ...mapActions(['startAddingMessages', 'clearMessages', 'setHistory']),
    leaveChat() {
      connection.emit('leaveChat', { chatId: this.$route.query.chatId, first: true })
      this.$router.replace({ name: 'choose' })
    }
  },
  computed: {
    ...mapGetters(['messages'])
  }
}
</script>

<style scoped>

</style>
