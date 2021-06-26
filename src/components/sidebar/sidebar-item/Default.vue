<script>
import ItemMixin from '../../../components/sidebar/sidebar-item/item-mixin'
import Content from '../../../components/sidebar/sidebar-item/Content.vue'

export default {
  name: 'Default',
  components: {
    Content
  },
  mixins: [ItemMixin],
  render(h) {
    return h(Content, [
      h('div', { staticClass: 'sidebar-default sidebar_item' }, this.$slots.default)
    ])
  }
}
</script>

<style lang="scss" scoped></style>
