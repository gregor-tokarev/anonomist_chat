<template>
  <div class="messages">
    <Message v-for="(message, index) in messages" :key="index" :text="message.message"></Message>
  </div>
</template>

<script>
import Message from './Message'

export default {
  name: 'MessageContainer',
  components: { Message },
  props: {
    messages: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.messages {
  background-color: gray;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  flex-grow: 1;
}
</style>
