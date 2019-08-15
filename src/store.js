import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

function roundPoints(points) {
  return Math.round((Math.round(points * 1000) / 1000) * 100) / 100;
}

export default new Vuex.Store({
  state: {
    currentStep: 0,
    rankingSteps: [],
    rankingFreshness: null,
  },
  mutations: {
    INIT_STATE: (state, { teams, timestamp }) => {
      state.rankingSteps.push(teams);
      state.rankingFreshness = timestamp;
    },
    RESET_STATE: (state) => {
      state.currentStep = 0;
      const initialRanking = state.rankingSteps[0];
      state.rankingSteps = [];
      state.rankingSteps.push(initialRanking);
    },
  },
  actions: {
    setTeams: ({ commit }) => {
      axios.get('http://cmsapi.pulselive.com/rugby/rankings/mru.json')
        .then((response) => {
          const normalizedTeams = response.data.entries.map(team => ({
            id: team.team.id,
            name: team.team.name,
            abbr: team.team.abbreviation,
            rank: team.pos,
            previousRank: team.previousPos,
            points: team.pts,
            previousPoints: team.previousPts,
            roundedPoints: roundPoints(team.pts),
            roundedPreviousPoints: roundPoints(team.previousPts),
          }));

          commit('INIT_STATE', {
            teams: normalizedTeams,
            timestamp: response.data.effective.millis,
          });
        });
    },
  },
  getters: {
    currentTeams: state => state.rankingSteps[state.currentStep] || [],
  },
});
