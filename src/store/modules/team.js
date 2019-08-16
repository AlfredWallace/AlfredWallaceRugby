function roundPoints(points) {
  return Math.round((Math.round(points * 1000) / 1000) * 100) / 100;
}

class Team {
  constructor(id, name, abbreviation, rank, points) {
    this.id = id;
    this.name = name;
    this.abbreviation = abbreviation;
    this.initialRank = rank;
    this.initialPoints = points;
    this.ranks = [];
    this.ranks.push(rank);
    this.points = [];
    this.points.push({
      raw: points,
      rounded: roundPoints(points),
    });
  }
}

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
