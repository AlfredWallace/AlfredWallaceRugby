export default {
  namespaced: true,

  state: () => ({
    teams: [],
  }),

  getters: {
    maxStep: (state) => state.teams[0].steps.length - 1,
  },

  mutations: {
    INIT_TEAMS: (state, teams) => {
      state.teams = teams;
    },

    RESET_STEPS: (state) => {
      for (let i = 0, len = state.teams.length; i < len; i += 1) {
        const team = state.teams[i];
        team.steps = [].concat(team.steps[0]);
      }
    },

    INIT_NEW_STEP: (state) => {
      let lastStepIndex;
      for (let i = 0, len = state.teams.length; i < len; i += 1) {
        const team = state.teams[i];
        if (i === 0) {
          lastStepIndex = team.steps.length - 1;
        }

        team.steps.push({
          rank: team.steps[lastStepIndex].rank,
          points: team.steps[lastStepIndex].points,
        });
      }
    },

    SET_POINTS: (state, { teamId, step, points }) => {
      const team = state.teams.find((browsedTeam) => browsedTeam.id === teamId);
      team.steps[step].points = points;
    },

    SET_RANKS: (state, step) => {
      for (let i = 0, len = state.teams.length; i < len; i += 1) {
        state.teams[i].steps[step].rank = i + 1;
      }
    },

    SORT_TEAMS: (state, step) => {
      state.teams.sort((teamA, teamB) => teamB.steps[step].points - teamA.steps[step].points);
    },
  },

  actions: {
    initTeams({ commit }, teams) {
      const normalizedTeams = teams.map((team) => ({
        id: team.team.id,
        name: team.team.name,
        abbreviation: team.team.abbreviation,
        steps: [
          {
            rank: team.pos,
            points: team.pts,
          },
        ],
      }));

      commit('INIT_TEAMS', normalizedTeams);
    },
  },
};
