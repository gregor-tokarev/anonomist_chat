<template functional>
  <header class="header">
    <div class="header__inner">
      <div class="logo">
        AName
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped lang="scss">
.header {
  padding: 15px;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
