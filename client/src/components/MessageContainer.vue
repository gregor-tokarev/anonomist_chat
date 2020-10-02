<template>
  <div ref="container" class="messages px-3">
    <Message v-for="(message, index) in messages" :key="index" :message="message"></Message>
  </div>
</template>

<script>
import Message from './Message'
import connection from '@/assets/js/socket'

export default {
  name: 'MessageContainer',
  components: { Message },
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  mounted() {
    connection.on('messageFormServer', () => {
      this.$refs.container.scrollBy(0, 50)
    })
  }
}
</script>

<style scoped lang="scss">
.messages {
  overflow-y: auto;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-grow: 1;
}
</style>
