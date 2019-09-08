<template>
  <article class="squares-map-item">
    <span class="item-field">{{ `${ cols }/${ rows }` }}</span>
    <span class="item-field">&#10066;&nbsp;{{ size }}</span>
    <span class="item-field">
      <router-link :to="{ name: 'squares-map-detail', params: { slug } }">
        {{ title }}
      </router-link>
    </span>
    <span class="item-field">{{ authorName }}</span>
  </article>
</template>

<script>
export default {
  name: 'SquaresMapItem',
  props: {
    slug: {
      type: String,
      required: true,
    },
    cols: {
      type: Number,
      required: true,
    },
    rows: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Number,
      required: true,
    },
    authorName: {
      type: String,
      required: true
    }
  },
}
</script>

<style scoped>
  .squares-map-item {
      border-bottom: 0.1em solid #bbb;
      display: table-row;
  }

  .squares-map-item:hover {
      background: #eee;
  }

  .item-field {
      display: table-cell;
      padding: 1em;
  }

  .map-item-square {
    font-family: serif;
  }

</style>
