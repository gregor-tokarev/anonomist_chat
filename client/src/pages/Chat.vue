<template>
  <div class="chat">
    <Message v-for="(message, index) in messages" :key="index" :text="message.message"></Message>
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
  data: () => ({
  }),
  beforeRouteLeave(to, from, next) {
    connection.emit('leaveChat', { chatId: this.$route.query.chatId, first: true })
    this.clearMessages()
    next()
  },
  mounted() {
    sessionStorage.setItem('chatId', this.$route.query.chatId)

    this.startAddingMessages()

    sessionStorage.getItem('chatId') && connection.emit('requestReconnect', this.$route.query.chatId)

    connection.on('partnerLeave', () => {
      connection.emit('leaveChat', { chatId: this.$route.query.chatId, first: false })
      this.$router.replace({ name: 'choose' })
    })
  },
  methods: {
    ...mapActions(['startAddingMessages', 'clearMessages'])
  },
  computed: {
    ...mapGetters(['messages'])
  }
}
</script>

<style scoped>

</style>
