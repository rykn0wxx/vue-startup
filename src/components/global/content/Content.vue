<script>
import deepmerge from 'deepmerge'

function CoreComponent(newComponent) {
  const defaults = {}
  return deepmerge(defaults, newComponent)
}

export default new CoreComponent({
  name: 'Content',
  props: {
    elTag: {
      type: String,
      default: 'div'
    }
  },
  render(h) {
    const contentView = h('div', {
      staticClass: 'content_view p-6 flex-shrink-0 relative'
    }, this.$slots.default)
    return h(this.elTag, {
      staticClass: 'content',
      class: 'fflex overflow-y-auto overflow-x-hidden',
      attrs: this.$attrs,
      on: this.$listeners,
      ref: 'contentRef'
    }, [contentView])
  }
})
</script>

<style lang="scss" scoped>
.content_view {
  flex: 1 0 auto;
}
</style>
