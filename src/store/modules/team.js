import Team from '../../classes/Team';
import RoundingHelper from '../../services/roundingHelper';

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
    ADD_STEP_FOR_TEAM: (state, { id, rank, points }) => {
      const team = state.teams.find(teamToFind => teamToFind.id === id);
      team.ranks.push(rank);
      team.points.push({
        raw: points,
        rounded: RoundingHelper.roundPoints(points),
      });
    },
    INIT_NEW_STEP: (state, idsBlackList) => {
      for (let i = 0; i < state.teams.length; i++) {
        if (idsBlackList.includes(state.teams[i].id)) {
          continue;
        }

        const team = state.teams[i];
        const points = team.points[team.points.length - 1];

        team.ranks.push(team.ranks[team.ranks.length - 1]);
        team.points.push({
          raw: points.raw,
          rounded: points.rounded,
        });
      }
    },
  },
  actions: {
    initTeams: ({ commit }, teams) => {
      commit('INIT_TEAMS', normalizeTeams(teams));
    },
    makeNewStep: ({ commit }, payload) => {
      const homeTeamId = payload.home.id;
      const awayTeamId = payload.away.id;
      commit('INIT_NEW_STEP', [homeTeamId, awayTeamId]);
      commit('ADD_STEP_FOR_TEAM', payload.home);
      commit('ADD_STEP_FOR_TEAM', payload.away);
    },
  },
};
