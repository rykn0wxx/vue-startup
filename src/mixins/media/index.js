/**
 * Media Mexin
 * @library
 */
// Lib imports
import { forEach, debounce } from 'lodash'

const breakpoints = {
  xs: 576,
  sm: 768,
  md: 960,
  lg: 1140,
  xl: 1320
}
const media_queries = {
  xs: `(max-width: ${breakpoints.xs - 0.2}px)`,
  gtxs: `(min-width: ${breakpoints.xs}px)`,
  sm: `(min-width: ${breakpoints.xs}px) and (max-width: ${breakpoints.sm - 0.2}px)`,
  gtsm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 0.2}px)`,
  gtmd: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 0.2}px)`,
  gtlg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 0.2}px)`,
  gtxl: `(min-width: ${breakpoints.xl}px)`
}

const mediaMixin = {
  data() {
    return {
      mq: {
        xs: false,
        gtxs: false,
        sm: false,
        gtsm: false,
        md: false,
        gtmd: false,
        lg: false,
        gtlg: false,
        xl: false,
        gtxl: false
      },
      mql: {
        vmq: {}
      }
    }
  },
  methods: {
    setupMediaHandlers(toAdd) {
      forEach(media_queries, (vl, ky) => {
        const mql = window.matchMedia(vl)
        const debCallBack = debounce(({ matches }) => {
          this.mq[ky] = matches
        }, 66)
        this.mql.vmq[ky] = mql
        if (toAdd) {
          mql.addEventListener('change', debCallBack.bind(this), { passive: true })
          debCallBack(mql)
        } else {
          mql.addEventListener('change', debCallBack.bind(this), { passive: true })
        }
      })
    }
  },
  created() {
    this.setupMediaHandlers(true)
  },
  beforeDestroy() {
    this.setupMediaHandlers(false)
  }
}
export default mediaMixin
