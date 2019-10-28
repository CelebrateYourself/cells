<template>
    <main id='screen'></main>
</template>

<script>
export default {
  name: 'ScreenPage',


  props: {
    game: Object,
  },

  mounted(){
    if(this.game){
      this.game.mount('#screen')
      this.game.run()
    } else {
      this.$router.push({ name: 'error', params: { status: 403, statusText: 'Forbidden' }})
    }
  },
}
</script>

<style>
    #screen {
        text-align: center;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 3;
    }
</style>