<template>
  <article>  
    <vue-title  title="Maps" />
    <section class="squares-map-list">
      <header class="panel">
          <span class="panel-field">W/H</span>
          <span class="panel-field">Size</span>
          <span class="panel-field">Title</span>
          <span class="panel-field">Author</span>
      </header>
      <div v-if="!mapList.length" class="empty">
        There are not maps yet
      </div>
      <template v-else>
        <SquaresMapItem
          v-for="map in mapList"
          :key="map.slug"
          :slug="map.slug"
          :cols="map.cols"
          :rows="map.rows"
          :size="map.board_size"
          :title="map.title"
          :author="map.author"
          :authorName="map.author_name"
        />
      </template>
    </section>
  </article>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import SquaresMapItem from './SquaresMapItem'

const { mapActions, mapGetters } = createNamespacedHelpers('squares')

export default {
  name: 'SquaresMapList',

  components: {
    SquaresMapItem
  },

  computed: {
    ...mapGetters(['mapList'])
  },

  methods: {
    ...mapActions({
      loadMapList: 'FETCH_MAPS',
    }),
  },

  created(){
    this.loadMapList()
  }
}
</script>

<style scoped>

    .squares-map-list {
        text-align: center;
        display: table;
        width: 100%;
        border-collapse: collapse;
    }

    .empty {
      display: table-caption;
      caption-side: bottom;
      text-align: center;
      padding: 1em;
      border-bottom: 0.1em solid #aaa;
    }

    .panel {
        display: table-row;
    }

    .panel {
        background: #777;
        color: #eee;
        font-weight: 900;
    }

    .panel-field {
        display: table-cell;
        padding: 1em;
    }
</style>
