<template>
  <div class="message pb-1" :class="{ 'yourMessage': message.you }">
    <div
      class="px-1 message__inner"
      :class="{ 'primary': !message.you, 'teal': message.you, 'yourMessage': message.you }"
    >
      {{ message.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: Object
  }
}
</script>

<style scoped lang="scss">
.message {
  color: #fff;

  &__inner {
    min-width: 100px;
    border-radius: 5px;
    max-width: 80%;
    display: inline-block;
  }
}

.yourMessage {
  text-align: right;

  div {
    text-align: left;
  }
}
</style>
