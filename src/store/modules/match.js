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
    UPDATE_TEAM: (state, { index, ground, value }) => {
      state.matches[index][ground].team = value;
    },
    UPDATE_SCORE: (state, { index, ground, value }) => {
      state.matches[index][ground].score = value;
    },
  },
  actions: {
    addMatch: ({ commit }) => {
      commit('ADD_MATCH');
    },
    deleteMatch: ({ commit }, index) => {
      commit('DELETE_MATCH', index);
    },
    updateMatch: ({ commit }, { name, data }) => {
      commit(`UPDATE_${name}`, data);
    },
  },
  getters: {
    nbSteps: state => state.matches.filter(match => !match.ignore).length,
  },
};
