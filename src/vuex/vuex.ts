/*
 * @Author: AI
 * @Date: 2017-10-11 21:03:11
 * @Last Modified by: AI
 * @Last Modified time: 2017-11-13 11:31:47
 * @describe
 */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import LocalVuex from './localvuex'
import AppVuex from './appvuex'

export default new Vuex.Store({
  modules: {
    LocalVuex,
    AppVuex
  }
})
