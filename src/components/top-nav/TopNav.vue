<template>
  <header :class="{ 'nav-open': show }" class="topnav layout-row flex-wrap items-center content-center justify-center w-full min-h-28 left-0 right-0 z-50">
    <div class="topnav-row w-full layout items-center content-center self-start min-h-auto px-8">
      <div class="topnav-section--start layout items-center fflex justify-start order-0">
        <h3 class="md-title overflow-hidden overflow-ellipsis whitespace-nowrap align-top h-25 min-w-25 layout items-center mr-8 py-5">TopNav</h3>
      </div>
      <div class="topnav-section--end layout items-center fflex justify-end order-10">
        <button @click="toggleNavbar" :class="{ toggled: show }" class="topnav-toggler btn icon-btn">
          <span class="block m-auto bg-no-repeat align-middle fill-current h-12 w-12 min-h-12 min-w-12">
            <svg class="w-12 h-12 pointer-events-none block" fill="none" stroke="currentColor" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" preserveAspectRatio="xMidYMid meet">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </span>
        </button>
        <div class="topnav-collapse justify-end w-full layout">
          <div class="topnav-collapse--wrapper">
            <ul class="topnav-list relative layout">
              <li v-for="(page, index) in pages" :key="index" class="topnav-item z-2 h-auto relative inline-block">
                <router-link :to="`/${page}`" custom v-slot="{ isExactActive, navigate }">
                  <button @click="navigate" :class="{ 'active-route': isExactActive }" class="topnav-item--btn btn mt-0 mb-0 min-w-0 text-center items-center relative uppercase hover:bg-gray-300">
                    <div class="topnav-item--content justify-center items-center layout min-h-24 overflow-hidden">{{ page }}</div>
                  </button>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import mediaMixin from '../../mixins/media'

export default {
  name: 'TopNav',
  mixins: [mediaMixin],
  data() {
    return {
      pages: ['home', 'contact', 'blog', 'dashboard', 'admin'],
      show: false
    }
  },
  computed: {
    showNavs: {
      get() {
        return this.show || this.mq.gtsm
      },
      set(val) {
        this.show = val
      }
    }
  },
  watch: {
    'mq.gtsm': {
      deep: true,
      immediate: true,
      handler: 'mediaQueryHandler'
    }
  },
  methods: {
    toggleNavbar() {
      this.showNavs = !this.showNavs
    },
    mediaQueryHandler(newVal, oldVal) {
      if (oldVal !== undefined) {
        if (newVal) {
          this.showNavs = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.topnav {
  box-shadow: 0 0 1px 1px rgb(0 0 0 / 14%), 0 0 2px 2px rgb(0 0 0 / 10%), 0 0 5px 1px rgb(0 0 0 / 8%);
  .md-title {
    line-height: 26px;
    font-size: 18px;
  }
  .topnav-item--btn {
    margin-top: 0;
    margin-bottom: 0;
  }
  .topnav-toggler, .topnav-item--btn {
    line-height: 56px;
  }
  @media (min-width: 768px) {
    .topnav-toggler {
      display: none;
    }
  }
  @media (max-width: 767px) {
    .topnav-row {
      will-change: auto;
      transition-property: none;
    }
    .topnav-collapse {
      position: fixed;
      display: block;
      top: 0;
      height: 100vh;
      width: 230px !important;
      right: 0;
      left: auto;
      z-index: 1032;
      visibility: visible;
      background-color: #9a9a9a;
      overflow-y: visible;
      border-top: none;
      text-align: left;
      padding-right: 0px;
      padding-left: 0;
      transform: translate3d(230px, 0, 0);
      transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
      transition-timing-function: cubic-bezier(0.4, 0.58, 0.57, 1);
      box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
      &::before {
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        position: absolute;
        display: block;
        background-color: #ffffff;
        content: '';
        z-index: 1;
      }
    }
    .topnav-collapse--wrapper {
      height: calc(100vh - 61px);
    }
    .topnav-toggler {
      transition: all 330ms cubic-bezier(0.685, 0.0473, 0.346, 1);
      transition-timing-function: cubic-bezier(0.4, 0.58, 0.57, 1);
      &.toggled {
        transform: translate3d(-230px, 0, 0);
      }
    }
    .topnav-list {
      display: flex;
      flex-flow: column;
    }
    .topnav-item {
      &::after {
        width: calc(100% - 30px);
        content: '';
        display: block;
        height: 1px;
        margin-left: 16px;
        background-color: #e5e5e5;
      }
    }
    .topnav-item--btn {
      width: auto;
      margin: 0 16px;
    }
    .topnav-item--content {
      width: 100%;
      justify-content: flex-start;
    }
    &.nav-open {
      .topnav-collapse {
        transform: translate3d(0, 0, 0);
      }
    }
  }
}
</style>
