<template>
  <article>  
    <vue-title  title="Maps" />
    <section v-if="loading">
      <vue-loading />
    </section>
    <section v-else class="squares-map-list">
      <header class="panel" @click.stop="sortBy($event)">
        <span class="panel-field">
          <span class="panel-button" :[ATTR]="COLS">W</span>
          <span>/</span>
          <span class="panel-button" :[ATTR]="ROWS">H</span>
        </span>
        <span class="panel-field panel-button" :[ATTR]="SIZE">Size</span>
        <span class="panel-field panel-button" :[ATTR]="TITLE">Title</span>
        <span class="panel-field panel-button" :[ATTR]="AUTHOR">Author</span>
      </header>
      <div v-if="!maps.length" class="empty">
        There are not maps yet
      </div>
      <template v-else>
        <SquaresMapItem
          v-for="map in maps"
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
import { LOAD_MAP_LIST } from '../store/actions/squares'
import SquaresMapItem from './SquaresMapItem'

const { mapActions, mapGetters } = createNamespacedHelpers('squares')

export default {
  name: 'SquaresMapList',

  components: {
    SquaresMapItem
  },

  data(){
    return {
      AUTHOR: 'author_name',
      SIZE: 'board_size',
      TITLE: 'title',
      COLS: 'cols',
      ROWS: 'rows',

      ATTR: 'data-field',
      activeColumnElement: null,

      maps: [],
      loading: false,
    }
  },

  computed: {
    ...mapGetters(['mapList'])
  },

  methods: {
    ...mapActions([LOAD_MAP_LIST]),

    _load(){
      this.loading = true
      this.maps = []

      this[LOAD_MAP_LIST]()
        .then(() => { this.maps = this.mapList.slice() })
        .finally(() => { this.loading = false })
    },

    sortBy(e){
      const elt = e.target

      if(!elt.classList.contains('panel-button') && !elt.hasAttribute(this.ATTR)){
        return      
      }

      if(this.activeColumnElement){
        this.activeColumnElement.click()
      }
      this.activeColumnElement = elt

      const MAX_LENGTH = 5

      const self = this,
            field = elt.getAttribute(this.ATTR),
            title = elt.textContent,
            input = document.createElement('input')

      const oninput = function(e){
        const allMaps = self.mapList.slice()
        self.maps = input.value 
          ? allMaps.filter((map) => String(map[field])
            .toLowerCase()
            .indexOf(input.value) >= 0)
          : allMaps
      }

      const reset = function(e){
        // to stop event recursion (panel click)
        if(event && event.cancelBubble){
          event.cancelBubble()
        }
        e.stopPropagation()

        input.removeEventListener('input', oninput)
        elt.removeEventListener('click', reset)

        elt.textContent = title
        self.activeColumnElement = null
        self.maps = self.mapList.slice()
      }

      input.placeholder = title
      input.maxLength = MAX_LENGTH
      input.style.cssText = '' +
        'width: ' + (title.length > 1 ? title.length : 2) + 'ex; padding: 0em;' +
        'margin: 0em; background: transparent;' + 
        'color: #333; text-align: center; text-decoration: underline;'

      elt.textContent = ''
      elt.appendChild(input)

      input.focus()
      input.addEventListener('input', oninput)
      elt.addEventListener('click', reset)
    },
  },

  created(){
    this._load()
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
        background: #777;
        color: #eee;
        font-weight: 900;
    }

    .panel-field {
        display: table-cell;
        padding: 1em;
    }

    .panel-field:hover {
      background: #888;
    }

    .panel-button {
      cursor: pointer;
    }

    .panel-button:hover {
        color: #444;
    }

</style>
