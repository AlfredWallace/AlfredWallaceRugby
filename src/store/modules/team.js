import Team from '../../classes/Team';

function normalizeTeams(apiTeams) {
  return apiTeams.map(
    team => new Team(
      team.team.id,
      team.team.name,
      team.team.abbreviation,
      team.pos,
      team.pts,
    ),
  );
}

export default {
  namespaced: true,
  state: {
    teams: [],
  },
  mutations: {
    INIT_TEAMS: (state, teams) => {
      state.teams = teams;
    },
  },
  actions: {
    initTeams: ({ commit }, teams) => commit('INIT_TEAMS', normalizeTeams(teams)),
  },
  // getters: {
  //   currentTeams: state => state.rankingSteps[state.currentStep] || [],
  // },
};
