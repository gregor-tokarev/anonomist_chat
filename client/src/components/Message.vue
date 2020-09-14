<template>
 <div class="message">
   {{ text }}
 </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    text: String
  }
}
</script>

<style scoped>

</style>
