import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import team from './modules/team';
import match from './modules/match';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    team,
    match,
  },
  state: {
    currentStep: 0,
    rankingFreshness: null,
  },
  mutations: {
    INIT_STATE: (state, timestamp) => {
      state.rankingFreshness = timestamp;
    },
    STEP_UP: (state) => {
      state.currentStep += 1;
    },
    STEP_DOWN: (state) => {
      state.currentStep -= 1;
    },
  },
  actions: {
    initStore: ({ commit, dispatch }) => {
      axios.get('http://cmsapi.pulselive.com/rugby/rankings/mru.json')
        .then((response) => {
          dispatch('team/initTeams', response.data.entries);
          commit('INIT_STATE', response.data.effective.millis);
        });
    },
    stepUp: ({ commit }) => {
      commit('STEP_UP');
    },
    stepDown: ({ commit }) => {
      commit('STEP_DOWN');
    },
  },
});
