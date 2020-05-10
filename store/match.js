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
    },
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
  validMatches: (state) => state.matches.filter((match) => match.valid),
  getNeutralGround: (state) => (index) => state.matches[index].neutralGround,
  getWorldCup: (state) => (index) => state.matches[index].worldCup,
  getTeam: (state) => ({ index, ground }) => state.matches[index][ground].team,
  getScore: (state) => ({ index, ground }) => state.matches[index][ground].score
}

export const mutations = {
  SET_MATCHES: (state, matches) => {
    state.matches = matches
  },
  DELETE_MATCH: (state, index) => {
    state.matches.splice(index, 1)
  },
  SET_NEUTRAL_GROUND: (state, { index, value }) => {
    state.matches[index].neutralGround = value
  },
  SET_WORLD_CUP: (state, { index, value }) => {
    state.matches[index].worldCup = value
  },
  SET_TEAM: (state, { index, ground, value }) => {
    state.matches[index][ground].team = value
  },
  SET_SCORE: (state, { index, ground, value }) => {
    state.matches[index][ground].score = value
  }
}

export const actions = {
  setMatches({ commit }, matches) {
    commit('SET_MATCHES', matches)
  },
  deleteMatch({ commit }, index) {
    commit('DELETE_MATCH', index)
  },
  setNeutralGround({ commit }, { index, value }) {
    commit('SET_NEUTRAL_GROUND', { index, value })
  },
  setWorldCup({ commit }, { index, value }) {
    commit('SET_WORLD_CUP', { index, value })
  },
  setTeam({ commit }, { index, ground, value }) {
    commit('SET_TEAM', { index, ground, value })
  },
  setScore({ commit }, { index, ground, value }) {
    commit('SET_SCORE', { index, ground, value })
  }
}
