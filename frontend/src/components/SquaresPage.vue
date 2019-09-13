<template>
  <main class="squares-page">
    <router-view></router-view>
  </main>
</template>

<script>

export default {
  name: 'SquaresPage',
  components: {},
}
</script>

<style scoped>
  .squares-page {
    margin: 2em auto;
    text-align: center;
    min-width: 400px;
    max-width: 600px;
  }
</style>
