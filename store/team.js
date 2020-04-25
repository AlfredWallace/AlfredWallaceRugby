import roundingHelper from '../services/roundingHelper.js'

function normalizeTeams(apiTeams) {
  return apiTeams.map((apiTeam) => {
    const team = {
      id: apiTeam.team.id,
      name: apiTeam.team.name,
      abbreviation: apiTeam.team.abbreviation,
      initialRank: apiTeam.pos,
      initialPoints: apiTeam.pts,
      ranks: [],
      points: []
    }

    team.ranks.push(apiTeam.pos)
    team.points.push({
      raw: apiTeam.pts,
      rounded: roundingHelper.roundPoints(apiTeam.pts).toFixed(2)
    })

    // todo : poubelle
    team.ranks.push(apiTeam.pos)
    team.points.push({
      raw: apiTeam.pts,
      rounded: roundingHelper.roundPoints(apiTeam.pts).toFixed(2)
    })

    return team
  })
}

export const state = () => ({
  teams: []
})

export const getters = {
  teamsForCurrentStep: (state, getters, rootState, rootGetters) =>
    state.teams.map(({ id, name, abbreviation, ranks, points }) => ({
      id,
      name,
      abbreviation,
      rank: ranks[rootState.currentStep],
      points: points[rootState.currentStep].rounded,
      previousRank: rootGetters.isFirstStep ? null : ranks[rootState.currentStep - 1],
      previousPoints: rootGetters.isFirstStep ? null : points[rootState.currentStep - 1].rounded
    }))
}

export const mutations = {
  INIT_TEAMS: (state, teams) => {
    state.teams = teams
  }
  // RESET_STEPS: (state) => {
  //   state.teams.forEach((team) => {
  //     team.ranks = [team.ranks.shift()]
  //     team.points = [team.points.shift()]
  //   })
  // },
  // ADD_STEP_FOR_TEAM: (state, { id, rank, points }) => {
  //   const team = state.teams.find((teamToFind) => teamToFind.id === id)
  //   team.ranks.push(rank)
  //   team.points.push({
  //     raw: points,
  //     rounded: roundingHelper.roundPoints(points)
  //   })
  // },
  // INIT_NEW_STEP: (state, idsBlackList) => {
  //   for (let i = 0; i < state.teams.length; i++) {
  //     if (idsBlackList.includes(state.teams[i].id)) {
  //       continue
  //     }
  //
  //     const team = state.teams[i]
  //     const points = team.points[team.points.length - 1]
  //
  //     team.ranks.push(team.ranks[team.ranks.length - 1])
  //     team.points.push({
  //       raw: points.raw,
  //       rounded: points.rounded
  //     })
  //   }
  // }
}

export const actions = {
  initTeams: ({ commit }, teams) => {
    commit('INIT_TEAMS', normalizeTeams(teams))
  }
  // resetSteps: ({ commit }) => {
  //   commit('RESET_STEPS')
  // },
  // makeNewStep: ({ commit }, payload) => {
  //   commit('INIT_NEW_STEP', [payload.home.id, payload.away.id])
  //   commit('ADD_STEP_FOR_TEAM', payload.home)
  //   commit('ADD_STEP_FOR_TEAM', payload.away)
  // }
}
