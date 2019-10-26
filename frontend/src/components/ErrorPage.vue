<template>
  <main>
    <vue-title :title="`Error ${ status } - ${ statusText }`" />
    <h2>{{ status }} {{ statusText }}</h2>
    <br />
    <router-link :to="{ name: 'home' }">Home</router-link>
  </main>
</template>

<script>
export default {
  name: 'ErrorPage',
  props: {
    status: {
      type: Number,
      required: true,
    },
    statusText: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>

</style>