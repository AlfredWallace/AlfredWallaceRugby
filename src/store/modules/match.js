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
  },
  actions: {
    addMatch: ({ commit }) => {
      commit('ADD_MATCH');
    },
  },
  getters: {
    nbSteps: state => state.matches.filter(match => !match.ignore).length,
  }
  ,
};
