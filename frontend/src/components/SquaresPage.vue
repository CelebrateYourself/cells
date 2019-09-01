<template>
  <main class="squares-page">
    <vue-title title="Squares" />
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
    max-width: 500px;
    min-width: 300px;
  }
</style>
