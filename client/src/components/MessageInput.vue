<template>
  <input type="text" v-model.trim="message" @keydown.enter="$emit('enter', message)">
</template>

<script>
export default {
  name: 'MessageInput',
  data: () => ({
    message: ''
  })
}
</script>

<style scoped>

</style>
