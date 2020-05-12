export const state = () => ({
  teams: []
})

export const getters = {
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
}

export const mutations = {
  INIT_TEAMS: (state, teams) => {
    state.teams = teams
  }
}

export const actions = {
  initTeams: ({ commit }, teams) => {
    const normalizedTeams = teams.map((team) => {
      return {
        id: team.team.id,
        name: team.team.name,
        abbreviation: team.team.abbreviation,
        rank: team.pos,
        points: team.pts,
        previousRank: null,
        previousPoints: null
      }
    })

    commit('INIT_TEAMS', normalizedTeams)
  }
}
