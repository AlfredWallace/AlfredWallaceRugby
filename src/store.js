import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    teams: null,
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
      points: team.pts,
      roundedPoints: Math.round((Math.round(team.pts * 1000) / 1000) * 100) / 100,
    })) : []),
  },
});
