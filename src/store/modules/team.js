export default {
  namespaced: true,

  state: () => ({
    teams: [],
  }),

  getters: {
  },

  mutations: {
    INIT_TEAMS: (state, teams) => {
      state.teams = teams;
    },
  },

  actions: {
    initTeams({ commit, dispatch }, teams) {
      const normalizedTeams = teams.map((team) => ({
        id: team.team.id,
        name: team.team.name,
        abbreviation: team.team.abbreviation,
      }));

      const initialStep = teams.reduce((acc, team) => {
        acc[team.team.id] = team.pts;
        return acc;
      }, {});

      commit('INIT_TEAMS', normalizedTeams);
      dispatch('setSteps', [initialStep], { root: true });
    },
  },
};
