export default {
  namespaced: true,

  state: () => ({
    matches: [
      {
        home: {
          team: null,
          score: null,
        },
        away: {
          team: null,
          score: null,
        },
        neutralGround: false,
        worldCup: false,
        valid: false,
      },
    ],
  }),

  getters: {
    validMatches: (state) => state.matches.filter((match) => match.valid),

    // function getters
    getNeutralGround: (state) => (index) => state.matches[index].neutralGround,

    getWorldCup: (state) => (index) => state.matches[index].worldCup,

    getTeam: (state) => ({ index, ground }) => state.matches[index][ground].team,

    getScore: (state) => ({ index, ground }) => state.matches[index][ground].score,
  },

  mutations: {
    RESET_MATCHES: (state) => {
      state.matches = [
        {
          home: {
            team: null,
            score: null,
          },
          away: {
            team: null,
            score: null,
          },
          neutralGround: false,
          worldCup: false,
          valid: false,
        },
      ];
    },

    ADD_MATCH: (state) => {
      state.matches.push({
        home: {
          team: null,
          score: null,
        },
        away: {
          team: null,
          score: null,
        },
        neutralGround: false,
        worldCup: false,
        valid: false,
      });
    },

    DELETE_MATCH: (state, index) => {
      state.matches.splice(index, 1);
    },

    SET_VALID: (state, { index, value }) => {
      state.matches[index].valid = value;
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

    addMatch({ commit }) {
      commit('ADD_MATCH');
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
