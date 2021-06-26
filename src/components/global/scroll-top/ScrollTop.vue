<template>
  <button @click="handleScrollTop" :class="{ scrolled: isScrolling }" class="scroll-top scroll-top--btn">
    <div class="scroll-top--content">
      <svg class="scroll-top--svg w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ScrollTop',
  data() {
    return {
      isScrolling: false,
      scrollParent: null
    }
  },
  methods: {
    initListeners() {
      this.scrollParent = document.querySelector('.main-view.content')
      this.updateState()
      this.scrollParent.addEventListener('scroll', this.updateState)
    },
    updateState() {
      const newState = this.scrollParent.scrollTop !== 0
      this.isScrolling = newState
    },
    cleanListeners() {
      this.scrollParent.removeEventListener('scroll', this.updateState, true)
      this.scrollParent = null
      this.isScrolling = false
    },
    handleScrollTop($e) {
      const scrollContentEl = document.querySelector('.main-view.content')
      scrollContentEl.scrollTo(0, 0)
    }
  },
  mounted() {
    this.initListeners()
  },
  beforeDestroy() {
    this.cleanListeners()
  }
}
</script>

<style lang="scss" scoped>
.scroll-top {
  transform: scale(0);
  &--btn {
    white-space: nowrap;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
    font-style: inherit;
    font-variant: inherit;
    font-family: inherit;
    text-decoration: none;

    user-select: none;
    outline: none;
    border: 0;
    padding: 0 8px;
    margin: 6px 8px;
    background: transparent;
    align-items: center;
    text-align: center;
    display: inline-block;
    min-height: 36px;

    top: auto;
    right: 20px;
    bottom: 20px;
    left: auto;
    position: fixed;
    transition-property: transform, background-color;
    transition-duration: 300ms;

    z-index: 20;
    line-height: 56px;
    min-width: 0;
    width: 56px;
    height: 56px;
    vertical-align: middle;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 26%);
    border-radius: 50%;
    background-clip: padding-box;
    overflow: hidden;

    background-color: rgb(255, 82, 82);
    color: rgba(0, 0, 0, 0.87);
    &:hover {
      background-color: rgb(213, 0, 0);
    }
    &:active {
      box-shadow: 0 4px 8px 0 rgb(0 0 0 / 40%);
    }
  }
  &--content {
    display: block;
    margin: auto;
    background-repeat: no-repeat;
    fill: currentColor;
    height: 24px;
    width: 24px;
    min-height: 24px;
    min-width: 24px;
    color: rgba(0, 0, 0, 0.87);
  }
  &--svg {
    pointer-events: none;
    display: block;
  }
  &.scrolled {
    transform: scale(1);
  }
}
</style>
