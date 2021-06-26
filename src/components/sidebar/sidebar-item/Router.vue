<template>
  <sidebar-content :class="{ active: item.active }">
    <router-link :to="routeHref" custom v-slot="{ isExactActive, navigate }">
      <button @click="navigate" :class="[{ 'active-route': isExactActive }, actionClasses]" class="sidebar_action sidebar_item">
        <div class="layout-row fflex">
          <!-- <span class="pre_icon mr-3">
            <svg class="h-7 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" preserveAspectRatio="xMidYMid meet">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path fill="none" stroke="#dd4b39de" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M22 12a10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2a10 10 0 0110 10z"/>
            </svg>
          </span> -->
          <span class="pre_icon mr-3" v-html="item.svgIcon" />
          <span class="link_text action_text">{{item.name}}</span>
        </div>
      </button>
    </router-link>
  </sidebar-content>
</template>

<script>
import ItemMixin from '../../../components/sidebar/sidebar-item/item-mixin'

export default {
  name: 'Router',
  mixins: [ItemMixin],
  components: {
    SidebarContent: () => import('../../../components/sidebar/sidebar-item/Content.vue')
  },
  computed: {
    routeHref() {
      return this.item.url.startsWith('/') ? this.item.url : `/${this.item.url}`
    },
    routeActive() {
      return (this.item.url && this.$route.path.startsWith(`/${this.item.url}`)) || false
    },
    actionClasses() {
      const { depth } = this.item
      return `py-0 pr-8 pl-${depth * 8}`
    }
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler() {
        this.$nextTick(function() {
          this.item.active = this.routeActive
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
