<script>
import { title } from '../config'

export default {
  name: 'VueTitle',
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
  },
  watch: {
    title: {
      immediate: true,
      handler(){
        document.title = `${ this.title ? `${this.title} | ${ title }` : title }`
      }
    }
  },
  render(){}
}
</script>
