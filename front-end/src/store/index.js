import Vue from 'vue'
import Vuex from 'vuex'
// import projectStore from './modules/projectStore.js'
import aoiStore from './modules/aoiStore'
import projectStore from './modules/projectStore'

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    project:projectStore,
    aoi:aoiStore
  },

  plugins:[    
    createPersistedState({
      paths:['aoi' , 'project']
    }),
  ]
})
