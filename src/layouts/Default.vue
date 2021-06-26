<template>
  <div class="relative h-full max-w-full max-h-full default layout-row">
    <!-- Sidebar -->
    <Sidebar v-if="showSidebar" :items="sidebarItems" />

    <main class="default_main layout-column fflex">
      <!-- TopBar -->
      <TopNav v-if="showTopNav" />

      <!-- Content -->
      <MainView />
      <!-- Content -->
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import MainView from 'v~/components/main-view/MainView.vue'
import TopNav from 'v~/components/top-nav/TopNav.vue'
import Sidebar from 'v~/components/sidebar/Sidebar.vue'

export default {
  name: 'Default',
  components: {
    MainView,
    TopNav,
    Sidebar
  },
  data() {
    return {
      isShow: false,
      showSidebar: true,
      showTopNav: true
    }
  },
  computed: {
    ...mapGetters({
      sidebarItems: 'sidebarItems'
    })
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler: 'handleRouteChange'
    }
  },
  methods: {
    handleRouteChange(rt) {
      const { sidebar, topnav } = rt.meta
      this.showSidebar = (!sidebar && sidebar === undefined) ? true : sidebar
      this.showTopNav = (!topnav && topnav === undefined) ? true : topnav
    }
  }
}
</script>

<style lang="scss" scoped>
.default_main {
  background-color: #F4F5F7;
  color: #273142;
}
</style>
