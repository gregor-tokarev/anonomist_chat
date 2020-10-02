<template>
  <div class="input">
    <v-text-field
      label="Message"
      type="text"
      append-icon="mdi-send"
      v-model.trim="message"
      @click:append="sendMessage"
      @keydown.enter="sendMessage"
      class="input__input"></v-text-field>
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
      if (!this.message) return
      const chatId = this.$route.query.chatId
      connection.emit('message', { message: this.message, chat: { id: chatId } })
      this.message = ''
    }
  }
}
</script>

<style scoped lang="scss">
.input::v-deep {
  .v-input__icon {
    cursor: pointer;
  }
}
</style>
