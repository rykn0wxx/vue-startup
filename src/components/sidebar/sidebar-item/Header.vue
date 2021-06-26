<template>
  <sidebar-content>
    <div class="sidebar_header">
      {{ item.name }}
    </div>
  </sidebar-content>
</template>

<script>
import ItemMixin from '../../../components/sidebar/sidebar-item/item-mixin'

export default {
  name: 'Header',
  components: {
    SidebarContent: () => import('../../../components/sidebar/sidebar-item/Content.vue')
  },
  mixins: [ItemMixin]
}
</script>

<style lang="scss" scoped></style>
