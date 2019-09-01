<template>
  <article class="squares-map-detail">
    <section v-if="map">
      <vue-title :title="map.title" />
      <header>
        <h3>{{ map.title }}</h3>
      </header>
      <section>
        <button @click.once="startGame">Play</button>
        <aside id="game"></aside>
      </section>
      <footer>
        <router-link :to="{ name: 'squares-map-list' }">Maps</router-link>
      </footer>
    </section>
  </article>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Cells from '../assets/js/engine'


const { mapActions, mapGetters } = createNamespacedHelpers('squares')

export default {
  name: 'SquaresMapDetails',

  data(){
    return {
      loading: true,
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
    ...mapActions({
      fetchMap: 'FETCH_MAP',
    }),

    loadMap(){
      this.map = null
      this.loading = true

      this.fetchMap(this.id)
        .then(() => { this.map = this.currentMap })
        .catch(e => {
          if(e.isAxiosError){
            const status = e.response.status
            
            if(status === 404){
              this.$router.replace({name: '404'})
            }
          } 
        })
        .finally(() => this.loading = false)
    },

    startGame(){
      const map = this.map
      const game = new Cells('#game', [map.rows, map.cols], {cellSize: 80})
      const json = JSON.parse(map.json_str)
      game.load(json)
      game.run()
    }
  },

  created(){
    this.loadMap()
  }
}
</script>

<style scoped>

</style>
