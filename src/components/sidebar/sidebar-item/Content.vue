<script>
export default {
  name: 'Content',
  render(h) {
    return h('div', { staticClass: 'sidebar_content relative' }, this.$slots.default)
  }
}
</script>

<style lang="scss" scoped></style>
