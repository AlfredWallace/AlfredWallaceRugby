import Match from '../../classes/Match';

export default {
  namespaced: true,
  state: {
    matches: [
      new Match(),
    ],
  },
  mutations: {
    ADD_MATCH: state => state.matches.push(new Match()),
    DELETE_MATCH: (state, index) => state.matches.splice(index, 1),
    UPDATE_NEUTRAL_GROUND: (state, { index, value }) => {
      state.matches[index].neutralGround = value;
    },
    UPDATE_WORLD_CUP: (state, { index, value }) => {
      state.matches[index].worldCup = value;
    },
    UPDATE_HOME_TEAM: (state, { index, value }) => {
      state.matches[index].home.team = value;
    },
    UPDATE_AWAY_TEAM: (state, { index, value }) => {
      state.matches[index].away.team = value;
    },
    UPDATE_HOME_SCORE: (state, { index, value }) => {
      state.matches[index].home.score = value;
    },
    UPDATE_AWAY_SCORE: (state, { index, value }) => {
      state.matches[index].away.score = value;
    },
  },
  actions: {
    addMatch: ({ commit }) => {
      commit('ADD_MATCH');
    },
    deleteMatch: ({ commit }, index) => {
      commit('DELETE_MATCH', index);
    },
    updateNeutralGround: ({ commit }, payload) => {
      commit('UPDATE_NEUTRAL_GROUND', payload);
    },
    updateWorldCup: ({ commit }, payload) => {
      commit('UPDATE_WORLD_CUP', payload);
    },
    updateHomeTeam: ({ commit }, payload) => {
      commit('UPDATE_HOME_TEAM', payload);
    },
    updateAwayTeam: ({ commit }, payload) => {
      commit('UPDATE_AWAY_TEAM', payload);
    },
    updateHomeScore: ({ commit }, payload) => {
      commit('UPDATE_HOME_SCORE', payload);
    },
    updateAwayScore: ({ commit }, payload) => {
      commit('UPDATE_AWAY_SCORE', payload);
    },
  },
  getters: {
    nbSteps: state => state.matches.filter(match => !match.ignore).length,
  },
};
