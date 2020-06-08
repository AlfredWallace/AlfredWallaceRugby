export default {
  state: () => ({
    teams: [],
  }),

  getters: {
    // teamsForCurrentStep: (state, getters, rootState, rootGetters) =>
    //   state.teams.map(({ id, name, abbreviation, ranks, points }) => ({
    //     id,
    //     name,
    //     abbreviation,
    //     rank: ranks[rootState.currentStep],
    //     points: points[rootState.currentStep].rounded,
    //     previousRank: rootGetters.isInitialStep ? null : ranks[rootState.currentStep - 1],
    //     previousPoints: rootGetters.isInitialStep ? null : points[rootState.currentStep - 1].rounded
    //   }))
  },

  mutations: {
    INIT_TEAMS: (state, teams) => {
      state.teams = teams;
    },
  },

  actions: {
    initTeams: ({ commit }, teams) => {
      const normalizedTeams = teams.map((team) => ({
        id: team.team.id,
        name: team.team.name,
        abbreviation: team.team.abbreviation,
        rank: team.pos,
        points: team.pts,
        previousRank: null,
        previousPoints: null,
      }));

      commit('INIT_TEAMS', normalizedTeams);
    },

  },
};
