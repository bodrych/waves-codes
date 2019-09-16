import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
	storage: window.localStorage
})

export default new Vuex.Store({
	state: {
		codes: []
	},
	mutations: {
		addCode (state, item) {
			state.codes.push(item)
		},
		deleteCode (state, item) {
			const index = state.codes.indexOf(item)
			state.codes.splice(index, 1)
		},
	},
	actions: {

	},
	plugins: [vuexLocal.plugin]
})
