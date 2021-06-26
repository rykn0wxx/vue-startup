<template>
  <component :is="itemNode" v-bind="[{ ...itemProps }]">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'Item',
  components: {
    SidebarDefault: () => import('../../../components/sidebar/sidebar-item/Default.vue'),
    SidebarHeader: () => import('../../../components/sidebar/sidebar-item/Header.vue'),
    SidebarRouter: () => import('../../../components/sidebar/sidebar-item/Router.vue'),
    SidebarTree: () => import('../../../components/sidebar/sidebar-item/Tree.vue')
  },
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      itemNode: 'SidebarDefault',
      itemProps: {
        item: this.item
      }
    }
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler: 'getItemNode'
    }
  },
  methods: {
    getItemNode() {
      switch (this.item.type) {
        case 'header':
          this.itemNode = 'SidebarHeader'
          break
        case 'link':
          this.itemNode = 'SidebarRouter'
          break
        case 'toggle':
          this.itemProps.groupId = Math.random().toString(36).slice(4)
          this.itemNode = 'SidebarTree'
          break
        default:
          this.itemNode = 'SidebarDefault'
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
