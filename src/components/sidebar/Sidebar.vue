<template>
  <aside :class="sidebarClasses" v-bind="$attrs" class="sidebar dark">
    <section class="sidebar_section">
      <nav :id="mainId" class="sidebar_menu">
        <SidebarItem v-for="(item, i) in Sidebar.items" :item="item" :key="`${i}-${item.id}`" />
      </nav>
    </section>
  </aside>
</template>

<script>
import { forEach, cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  components: {
    SidebarItem: () => import('../../components/sidebar/sidebar-item/Item.vue')
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    mainId: {
      type: String,
      default: Math.random().toString(36).slice(4)
    }
  },
  data() {
    return {
      Sidebar: {
        items: []
      }
    }
  },
  computed: {
    ...mapGetters({
      sidebarCollapse: 'isSidebarCollapse'
    }),
    sidebarClasses() {
      return {
        sidebar_collapse: this.sidebarCollapse
      }
    }
  },
  provide() {
    const sidebar = {}
    Object.defineProperty(sidebar, 'data', {
      enumerable: true,
      get: () => this.Sidebar
    })
    return {
      Sidebar: sidebar.data
    }
  },
  watch: {
    items: {
      deep: true,
      immediate: true,
      handler(val) {
        this.Sidebar.items = cloneDeep(val)
      }
    }
  },
  methods: {
    itemCollapse(parentId) {
      forEach(this.items, item => {
        console.log(item, parentId)
      })
    },
    handleMedia($evt) {
      console.log($evt, this)
    }
  }
}
</script>

<style lang="scss" scoped></style>
