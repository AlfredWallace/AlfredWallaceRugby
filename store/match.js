export const state = () => ({
  matches: [
    {
      home: {
        team: null,
        score: null
      },
      away: {
        team: null,
        score: null
      },
      neutralGround: false,
      worldCup: false,
      valid: false
    }
  ]
})

export const getters = {
  nbSteps: (state) => state.matches.length,
  validMatches: (state) => state.matches.filter((match) => match.valid)
}

export const mutations = {
  SET_MATCHES: (state, matches) => {
    state.matches = matches
  }
}

export const actions = {
  setMatches({ commit }, matches) {
    commit('SET_MATCHES', matches)
  }
}
