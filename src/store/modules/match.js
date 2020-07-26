import Match from '../../classes/Match';

export default {
  namespaced: true,

  state: () => ({
    matches: [
      new Match(1),
    ],
  }),

  getters: {
    validMatches: (state) => state.matches.filter((match) => match.valid),

    matchMaxNumber: (state) => {
      if (state.matches.length === 0) {
        return 0;
      }

      return Math.max(...state.matches.map((match) => match.number));
    },

    // function getters
    getNeutralGround: (state) => (index) => state.matches[index].neutralGround,

    getWorldCup: (state) => (index) => state.matches[index].worldCup,

    getTeam: (state) => ({ index, ground }) => state.matches[index][ground].team,

    getScore: (state) => ({ index, ground }) => state.matches[index][ground].score,

    getFirstPreviousValidMatchStep: (state) => (matchIndex) => {
      if (matchIndex === 0) {
        return 0;
      }

      for (let i = matchIndex - 1; i >= 0; i -= 1) {
        if (state.matches[i].valid) {
          return state.matches[i].associatedStep;
        }
      }

      return 0;
    },
  },

  mutations: {
    RESET_MATCHES: (state) => {
      state.matches = [
        new Match(1),
      ];
    },

    ADD_MATCH: (state, matchNumber) => {
      state.matches.push(new Match(matchNumber));
    },

    DELETE_MATCH: (state, index) => {
      state.matches.splice(index, 1);
    },

    SET_VALID: (state, { index, value }) => {
      state.matches[index].valid = value;
    },

    SET_ASSOCIATED_STEP: (state, { index, associatedStep }) => {
      state.matches[index].associatedStep = associatedStep;
    },

    SET_NEUTRAL_GROUND: (state, { index, value }) => {
      state.matches[index].neutralGround = value;
    },

    SET_WORLD_CUP: (state, { index, value }) => {
      state.matches[index].worldCup = value;
    },

    SET_TEAM: (state, { index, ground, value }) => {
      state.matches[index][ground].team = value;
    },

    SET_SCORE: (state, { index, ground, value }) => {
      state.matches[index][ground].score = value;
    },
  },

  actions: {
    resetMatches({ commit }) {
      commit('RESET_MATCHES');
    },

    addMatch({ commit, getters }) {
      commit('ADD_MATCH', getters.matchMaxNumber + 1);
    },

    deleteMatch({ commit }, index) {
      commit('DELETE_MATCH', index);
    },

    setValid({ commit }, { index, value }) {
      commit('SET_VALID', { index, value });
    },

    setNeutralGround({ commit }, { index, value }) {
      commit('SET_NEUTRAL_GROUND', { index, value });
    },

    setWorldCup({ commit }, { index, value }) {
      commit('SET_WORLD_CUP', { index, value });
    },

    setTeam({ commit }, { index, ground, value }) {
      commit('SET_TEAM', { index, ground, value });
    },

    setScore({ commit }, { index, ground, value }) {
      commit('SET_SCORE', { index, ground, value });
    },
  },
};
