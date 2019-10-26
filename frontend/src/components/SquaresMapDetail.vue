<template>
  <article class="squares-map-detail">
    <section v-if="loading">
      <vue-loading />
    </section>
    <section v-else>
      <vue-title :title="map.title" />
      <header>
        <h3>{{ map.title }}</h3>
        <router-link :to="{ name: 'squares-map-list' }">Maps</router-link>
      </header>
      <section class="map-section">
        <button @click="startGame" id="play-button" class="button">Play</button>
      </section>
      <footer>
        <small class="info">Move the tiles to their cells</small>
      </footer>
    </section>
  </article>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { LOAD_MAP } from '../store/actions/squares'
import { Cells } from '../assets/js/engine'

const { mapActions, mapGetters } = createNamespacedHelpers('squares')

export default {
  name: 'SquaresMapDetails',

  data(){
    return {
      CELL_SIZE: 80,

      loading: false,
      map: null,
      game: null,
    }
  },

  computed: {
    ...mapGetters(['currentMap']),

    id(){
      return this.$route.params.slug
    },
  },

  watch: {
    '$route.params.slug': '_load',
  },

  methods: {
    ...mapActions([LOAD_MAP]),

    _load(){
      this.map = null
      this.loading = true

      this[LOAD_MAP](this.id)
        .then(() => { this.map = this.currentMap })
        .finally(() => { this.loading = false })
    },

    startGame(){
      const map = this.map,
            game = new Cells([map.rows, map.cols], {cellSize: this.CELL_SIZE}),
            json = JSON.parse(map.json_str)
      
      this.game = game

      game.load(json)

      // event handlers
      game.onclose = ((router, slug) => {
        return () => {
          router.replace({
            name: 'squares-map-detail',
            params: { slug }
          })
        }
      })(this.$router, this.map.slug)

      // go to Game page
      this.$router.push({
        name: 'screen', params: { game },
      })
    },
  },

  created(){
    this._load()
  }
}
</script>

<style scoped>

  h3 {
    font-size: 180%;
    font-weight: 900;
    margin-bottom: 0.5em;
  }

  .map-section {
    margin: 1em auto 2em;
  }

  .info {
    border-left: 0.5em solid #999;
    padding: 0.5em;
    color: #888;
  }

  #play-button {
    margin-top: 1em;
    padding: 1em 3em;
  }


</style>
