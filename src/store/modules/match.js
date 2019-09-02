import Match from '../../classes/Match';

export default {
  namespaced: true,
  state: {
    matches: [
      new Match(),
    ],
  },
  getters: {
    nbSteps: state => state.matches.filter(match => !match.ignore).length,
  },
};
