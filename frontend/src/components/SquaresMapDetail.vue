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
        <button @click="startGame" id="play-button" class="button">Play</button>
      </section>
      <footer>
        <small class="info">Переместите фишки в соответствующие ячейки</small>
      </footer>
    </section>
  </article>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { LOAD_MAP } from '../store/actions/squares'
import Cells from '../assets/js/engine'

const { mapActions, mapGetters } = createNamespacedHelpers('squares')

export default {
  name: 'SquaresMapDetails',

  data(){
    return {
      CELL_SIZE: 80,

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

    _load(){
      this.map = null
      this.loading = true

      this[LOAD_MAP](this.id)
        .then(() => { this.map = this.currentMap })
        .finally(() => { this.loading = false })
    },

    startGame(){

      const screen = document.createElement('aside');
      screen.id = 'screen'
      screen.style.cssText = 'position: absolute; width: 100%; height: 100%;' + 
        'top: 0em; bottom: 0em; left: 0em; right: 0em; z-index: 3;' + 
        ' background: #fff; text-align: center;';

      document.body.appendChild(screen)

      const button = document.querySelector('#play-button')
      const map = this.map
      const game = new Cells('#screen', [map.rows, map.cols], {cellSize: this.CELL_SIZE})
      const json = JSON.parse(map.json_str)

      game.load(json)
      game.onopen = function(){
        button.disabled = true
      }
      game.onclose = function(){
        button.disabled = false
        screen.parentNode.removeChild(screen)
      }
      game.run()
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
