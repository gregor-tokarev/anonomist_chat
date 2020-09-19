<template>
  <div class="chat">
    <Message v-for="(message, index) in messages" :key="index" :text="message.message"></Message>
    <Input @enter="sendMessage" />
  </div>
</template>

<script>

import Message from '../components/Message'
import connection from '../assets/js/socket'
import Input from '../components/MessageInput'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Chat',
  components: { Input, Message },
  data: () => ({
  }),
  beforeRouteLeave(to, from, next) {
    connection.emit('leaveChat', { chatId: this.$route.query.chatId, first: true })
    next()
  },
  mounted() {
    this.startChat()

    connection.emit('requestReconnect', this.$route.query.chatId)

    connection.on('partnerLeave', () => {
      connection.emit('leaveChat', { chatId: this.$route.query.chatId, first: false })
      this.$router.replace({ name: 'choose' })
    })
  },
  computed: {
    ...mapGetters(['messages'])
  },
  methods: {
    ...mapActions(['startChat']),
    sendMessage(value) {
      const chatId = this.$route.query.chatId
      connection.emit('message', { message: value, chat: { id: chatId } })
      this.message = ''
    }
  }
}
</script>

<style scoped>

</style>
