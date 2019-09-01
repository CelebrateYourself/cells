<script>
import { title } from '../config'

export default {
  name: 'VueTitle',
  props: {
    title: {
      type: String,
      required: true,
      default: title
    },
  },
  watch: {
    title: {
      immediate: true,
      handler(){
        document.title = this.title
      }
    }
  },
  render(){}
}
</script>
