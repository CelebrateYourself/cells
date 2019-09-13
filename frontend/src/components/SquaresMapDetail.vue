<template>
  <article class="squares-map-detail">
    <section v-if="loading">
      <vue-loading />
    </section>
    <section v-else>
      <vue-title :title="map.title" />
      <header>
        <h3>{{ map.title }}</h3>
        <router-link :to="{ name: 'squares-map-list' }">Карты</router-link>
      </header>
      <section class="map-section">
        <button @click.once="startGame" id="play-button">Play</button>
        <article id="game"></article>
      </section>
    </section>
  </article>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { LOAD_MAP, LOAD_MAP_LIST } from '../store/actions/squares'
import Cells from '../assets/js/engine'

const { mapActions, mapGetters } = createNamespacedHelpers('squares')

export default {
  name: 'SquaresMapDetails',

  data(){
    return {
      loading: false,
      map: null,
    }
  },

  computed: {
    ...mapGetters(['currentMap']),

    id(){
      return this.$route.params.slug
    },
  },

  watch: {
    '$route.params.slug': 'loadMap',
  },

  methods: {
    ...mapActions([LOAD_MAP]),

    loadMap(){
      this.map = null
      this.loading = true

      this[LOAD_MAP](this.id)
        .then(() => { this.map = this.currentMap })
        .finally(() => { this.loading = false })
    },

    startGame(){
      this.fadeButton()

      const map = this.map
      const game = new Cells('#game', [map.rows, map.cols], {cellSize: 80})
      const json = JSON.parse(map.json_str)
      game.load(json)
      game.run()
    },

    fadeButton(){
      const button = document.querySelector('#play-button')
      button.style.display = 'none'
    }
  },

  created(){
    this.loadMap()
  }
}
</script>

<style scoped>

  header {
    margin-bottom: 1em;
  }

  h3 {
    font-size: 180%;
    font-weight: 900;
    margin-bottom: 0.5em;
  }

  #play-button {
    margin-top: 1em;
    padding: 1em 3em;
    cursor: pointer;
  }

</style>
