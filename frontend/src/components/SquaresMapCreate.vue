<template>
  <article>
    <header>
      <h3>Create map</h3>
      <router-link :to="{ name: 'squares-map-list' }">Maps</router-link>
    </header>
    <section>
      <button class="button" @click="this.build">Create</button>
    </section>
    <footer>
      <section v-if="draft">{{ draft }}</section>
    </footer>
  </article>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { MAKE_DRAFT } from '../store/actions/squares'
import { CellsBuilder, Cells } from '../assets/js/engine'

const { mapActions, mapGetters } = createNamespacedHelpers('squares')

export default {
  name: 'SquaresMapCreate',

  data(){
    return {
      loading: false,
    }
  },

  computed: {
    ...mapGetters({'draft': 'myDraft'}),
  },

  methods: {

    ...mapActions([MAKE_DRAFT]),

    _load(){
      if(this.draft){
        const size = [this.draft.rows, this.draft.cols],
              map = this.draft.map,
              game = new Cells(size, { cellSize: 80 })

        const backRoute = ((router, action) => {
          return () => {
            action(null)
            router.replace({ name: 'squares-map-list' })
          }
        })(this.$router, this[MAKE_DRAFT])

        game.load(map)
        game.onclose = backRoute

        this.$router.push({ name: 'screen', params: { game } })
      }
    },

    build(){
      const backRoute = ((router) => {
        return () => router.replace({ name: 'squares-map-create' })
      })(this.$router)

      const game = new CellsBuilder(null, { cellSize: 80 })
      game.load()

      game.onclose = backRoute
      game.onsave = ((action) => {
         return (data) => { action(data) }
      })(this[MAKE_DRAFT])

      game.onwarning = warns => confirm(`${ warns.join('\n') }\n\nСоздать карту?`)
      game.onerror = errors => alert(`${ errors.join('\n') }`)

      this.$router.push({ name: 'screen', params: { game } })
    },

  },  // methods

  mounted(){
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

  header {
    margin-bottom: 2em;
  }
</style>