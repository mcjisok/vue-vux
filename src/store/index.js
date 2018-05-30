import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import state from './rootState';


Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})

export default store;