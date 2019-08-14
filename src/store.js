import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

function roundPoints(points) {
  return Math.round((Math.round(points * 1000) / 1000) * 100) / 100;
}

export default new Vuex.Store({
  state: {
    teams: [],
    freshnessTimestamp: null,
  },
  mutations: {
    INIT_STATE: (state, payload) => {
      state.teams = payload.entries;
      state.freshnessTimestamp = payload.effective.millis;
    },
  },
  actions: {
    setTeams: ({ commit }) => {
      axios.get('http://cmsapi.pulselive.com/rugby/rankings/mru.json')
        .then((response) => {
          commit('INIT_STATE', response.data);
        });
    },
  },
  getters: {
    normalizedTeams: state => (state.teams ? state.teams.map(team => ({
      id: team.team.id,
      name: team.team.name,
      abbr: team.team.abbreviation,
      rank: team.pos,
      previousRank: team.previousPos,
      points: team.pts,
      roundedPoints: roundPoints(team.pts),
      roundedPreviousPoints: roundPoints(team.previousPts),
    })) : []),
  },
});
