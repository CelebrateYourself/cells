<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {}
}
</script>

<style>
#app {
  font-family: 'Montserrat', 'Helvetica', 'sans-serif';
  color: #333;
}

a,
a:visited {
  color: #25a;
}

a:hover {
  text-decoration: underline;
}

.button {
    background: #eee;
    color: #666;
    padding: 0.5em 1.5em;
    cursor: pointer;
    border: 0.1em solid #aaa;
    border-radius: 0.3em;
    box-shadow: 0.1em 0.1em 0.2em #aaa;
}

.button:hover {
    box-shadow: inset 0em 0em 0.2em #aaa;
}

</style>
