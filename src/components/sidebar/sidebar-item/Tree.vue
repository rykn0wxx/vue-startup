<template>
  <sidebar-content :class="{ open: item.open, active: item.active }" :id="`${groupId}-${item.id}`">
    <!-- <div class="sidebar_treeview--toggler"> -->
      <button @click.prevent="treeToggle" :class="actionClasses" class="sidebar_item sidebar_action sidebar_treeview-toggler-btn">
        <div class="layout-row fflex">
          <!-- <span class="pre_icon mr-3">
            <svg class="h-7 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" preserveAspectRatio="xMidYMid meet">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path fill="none" stroke="#dd4b39de" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M22 12a10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2a10 10 0 0110 10z"/>
            </svg>
          </span> -->
          <span class="pre_icon mr-3" v-html="item.svgIcon" />
          <span class="tree_text action_text">{{item.name}}</span>
          <span class="fflex"></span>
          <span class="toggle_icon">
            <svg class="h-7 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" preserveAspectRatio="xMidYMid meet">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </button>
    <!-- </div> -->
    <template v-if="hasChildren">
      <transition name="tree" v-bind:css="false" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave">
        <nav v-show="item.open" :aria-expanded="item.open" class="sidebar_submenu sidebar_treeview--menu">
          <SidebarItem v-for="(sub, ii) in item.children" :item="sub" :key="`${ii}-${sub.id}`" />
        </nav>
      </transition>
    </template>
  </sidebar-content>
</template>

<script>
import { filter, forEach } from 'lodash'
import { gsap } from 'gsap'

import ItemMixin from 'v~/components/sidebar/sidebar-item/item-mixin'

export default {
  name: 'Tree',
  mixins: [ItemMixin],
  inject: ['Sidebar'],
  components: {
    SidebarContent: () => import('../../../components/sidebar/sidebar-item/Content.vue'),
    SidebarItem: () => import('../../../components/sidebar/sidebar-item/Item.vue')
  },
  props: {
    groupId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      menuHeight: 0
    }
  },
  computed: {
    hasChildren() {
      return !!(this.item.children && this.item.children.length > 0)
    },
    hasActiveChild() {
      return (this.item.children && !!this.item.children.find((itm) => this.$route.path.startsWith(`/${itm.url}`))) || false
    },
    actionClasses() {
      const { depth } = this.item
      return `py-0 pr-8 pl-${depth * 8}`
    }
  },
  watch: {
    hasActiveChild: {
      deep: true,
      immediate: true,
      handler(val) {
        this.item.active = val
      }
    }
  },
  methods: {
    treeToggle(evt) {
      const isOpen = this.item.open
      if (isOpen) {
        this.collapse(this.$parent)
      } else {
        this.expand(this.$parent.$parent)
      }
    },
    expand(parent) {
      const openMenu = filter(parent.$children, child => Object.prototype.hasOwnProperty.call(child.item, 'open'))
      forEach(openMenu, menu => {
        if (menu.item.id === this.item.id) {
          menu.item.open = true
        } else {
          menu.item.open = false
          const childMenus = filter(menu.item.children, child => Object.prototype.hasOwnProperty.call(child, 'open'))
          forEach(childMenus, child => {
            child.open = false
          })
        }
      })
    },
    collapse(parent) {
      const openMenu = filter(parent.$children, child => Object.prototype.hasOwnProperty.call(child.item, 'open'))
      forEach(openMenu, menu => {
        if (menu.item.id === this.item.id) {
          menu.item.open = false
          const childMenus = filter(menu.item.children, child => Object.prototype.hasOwnProperty.call(child, 'open'))
          forEach(childMenus, child => {
            child.open = false
          })
        }
      })
    },
    beforeEnter(el) {
      el.style.height = 0
    },
    enter(el, done) {
      el.style.height = 'auto'
      el.style.height = getComputedStyle(el).height
      gsap.fromTo(el, {
        height: 0,
        opacity: 0
      }, {
        opacity: 1,
        height: getComputedStyle(el).height,
        duration: 0.5,
        ease: 'sine.out',
        onComplete: done
      })
    },
    afterEnter(el) {
      el.style.height = 'auto'
      this.menuHeight = getComputedStyle(el).height
    },
    beforeLeave(el) {
      el.style.height = 'auto'
    },
    leave(el, done) {
      el.style.height = getComputedStyle(el).height
      gsap.fromTo(el, {
        height: this.menuHeight,
        opacity: 1
      }, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'sine.out',
        onComplete: done
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
