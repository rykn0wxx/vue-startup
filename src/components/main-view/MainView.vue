<template>
  <g-content class="main-view">
    <transition @beforeEnter="beforeEnter" @enter="enter" @leave="leave" v-bind:css="false" mode="out-in" appear>
      <RouterView class="page_view" />
    </transition>

    <!-- ScrollTop -->
    <GScrollTop />
    <!-- ScrollTop -->
  </g-content>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'MainView',
  data() {
    return {
      pageIndex: null,
      prevIndex: null,
      pageTransition: 'zoom'
    }
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler: 'handleRouteChange'
    }
  },
  methods: {
    handleRouteChange(newIndex) {
      if (this.pageIndex) {
        this.pageTransition = this.pageIndex < newIndex.meta.pathIndex ? 'right' : 'left'
      }
      this.prevIndex = this.pageIndex
      this.pageIndex = newIndex.meta.pathIndex
    },
    beforeEnter(el) {
      const transLoc = this.pageTransition === 'right' ? window.innerWidth * 1.5 : -(window.innerWidth * 1.5)
      el.style.transform = `translate3d(${transLoc}px, 0, 0)`
      el.style.opacity = 0
    },
    enter(el, done) {
      gsap.to(el, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'sine.inOut',
        onComplete: done
      })
    },
    leave(el, done) {
      gsap.fromTo(el, {
        autoAlpha: 1,
        x: 0
      }, {
        duration: 1,
        x: this.pageTransition === 'right' ? -(window.innerWidth * 1.5) : window.innerWidth * 1.5,
        autoAlpha: 0,
        ease: 'sine.inOut',
        onComplete: done
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page_view {
  transition-property: opacity, transform, visibility, height;
  transition-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);
}
</style>
