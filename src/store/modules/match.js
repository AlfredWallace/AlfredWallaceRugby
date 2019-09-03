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
  },
  actions: {
    addMatch: ({ commit }) => {
      commit('ADD_MATCH');
    },
    deleteMatch: ({ commit }, index) => {
      commit('DELETE_MATCH', index);
    },
  },
  getters: {
    nbSteps: state => state.matches.filter(match => !match.ignore).length,
  },
};
