
import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import blog from './modules/blog'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    blog

  },
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})

export default store
