import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import team from './modules/team';
import match from './modules/match';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    team,
    match,
  },
  state: {
    currentStep: 1,
    rankingFreshness: null,
  },
  mutations: {
    INIT_STATE: (state, timestamp) => {
      state.rankingFreshness = timestamp;
    },
    // RESET_STATE: (state) => {
    //   state.currentStep = 0;
    //   const initialRanking = state.rankingSteps[0];
    //   state.rankingSteps = [];
    //   state.rankingSteps.push(initialRanking);
    //   state.matches = [];
    //   state.matches.push(makeMatch());
    // },
  },
  actions: {
    initStore: ({ commit, dispatch }) => {
      axios.get('http://cmsapi.pulselive.com/rugby/rankings/mru.json')
        .then((response) => {
          dispatch('team/initTeams', response.data.entries);
          commit('INIT_STATE', response.data.effective.millis);
        });
    },
  },
});
