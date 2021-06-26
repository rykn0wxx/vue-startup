/**
 * Vue Components
 * @library
 */
// Lib imports
import Vue from 'vue'
import { forEach, chain } from 'lodash'

const requireComponent = require.context('v~/components/global/', true, /\.vue$/)
const reqCompKeys = requireComponent.keys()

forEach(reqCompKeys, fName => {
  const compConf = requireComponent(fName)
  const fileName = fName.match(/\/([^\/]+)\/?$/)[1]
  const compName = chain(fileName)
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '')
    .camelCase()
    .upperFirst()
    .value()

  Vue.component(`G${compName}`, compConf.default || compConf)
})
