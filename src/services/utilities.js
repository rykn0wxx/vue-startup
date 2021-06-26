import Vue from 'vue'
import raf from 'raf'
// waitForReadyState
async function waitForReadyState() {
  if (typeof document !== 'undefined' && document.readyState !== 'complete') {
    await new Promise(resolve => {
      const cb = () => {
        window.requestAnimationFrame(resolve)
        window.removeEventListener('load', cb)
      }
      window.addEventListener('load', cb)
    })
  }
}
// scrollBehavior
async function scrollBehavior(to, from, savedPosition) {
  await waitForReadyState()
  if (savedPosition) {
    return savedPosition
  }
  if (to.hash) {
    return { selector: to.hash }
  }
  return { x: 0, y: 0 }
}
// mdUuid
function mdUuid() {
  return Math.random()
    .toString(36)
    .slice(4)
}
function genUuId(baseStr) {
  let strTemplate = [1e7] + -9e3 + -4e3 + -8e3 + -3e11
  if (baseStr) strTemplate = baseStr
  return strTemplate.replace(/[013489]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16))
}
// fn noop: A function that performs no operations
function noop() {}
// routeGenerator
let routeIndex = 0
function routeGenerator(pathObj) {
  const { name, path } = pathObj
  const routes = {
    name,
    path,
    meta: pathObj.meta ? pathObj.meta : { isPublic: false },
    component: resolve => import('v~/' + pathObj.view + '.vue').then(resolve)
  }
  routes.meta.pathIndex = routeIndex++
  if (pathObj.redirect) routes.redirect = pathObj.redirect
  if (pathObj.children) routes.children = pathObj.children.map(path => routeGenerator(path))
  return routes
}
// observeEvent
function observeEvent(el, eventName, observerFn, options) {
  function killObserver() {
    el.removeEventListener(eventName, observerFn)
  }
  eventName && eventName.indexOf('click') >= 0 && /iP/i.test(navigator.userAgent) && (el.style.cursor = 'pointer')
  el.addEventListener(eventName, observerFn, options || false)
  return {
    destroy: killObserver
  }
}
// resizeObserver
function resizeObserver(el = window, observerFn) {
  const observer = observeEvent(
    el,
    'resize',
    () => {
      raf(observerFn)
    },
    { passive: true }
  )
  return {
    destroy: observer.destroy
  }
}
// email regex checker
function isEmail(email) {
  // const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  const ExEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:)*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:)+)\])/
  return ExEmail.test(email)
}
// jQuery: $.siblings()
function getSiblings(el, filter) {
  const siblings = []
  el = el.parentNode.firstChild
  do {
    if (!filter || filter(el)) {
      siblings.push(el)
    }
  } while ((el = el.nextSibling))
  return siblings
}
function reactive(data) {
  const Instance = {}
  Vue.util.defineReactive(Instance, 'reactive', data)
  return Instance.reactive
}
function debouncer(func, wait, nowait) {
  let timeout
  return () => {
    const context = this
    const args = arguments
    const later = () => {
      timeout = null
      if (nowait) func.apply(context, args)
    }
    const callNow = nowait && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

export { debouncer, noop, isEmail, waitForReadyState, scrollBehavior, mdUuid, genUuId, routeGenerator, observeEvent, resizeObserver, getSiblings, reactive }
