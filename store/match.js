import Match from '../classes/Match'

export const state = () => ({
  matches: []
})

export const mutations = {
  RESET_MATCHES: (state) => {
    state.matches = [new Match()]
  },
  ADD_MATCH: (state) => {
    state.matches.push(new Match())
  },
  DELETE_MATCH: (state, index) => {
    state.matches.splice(index, 1)
  },
  UPDATE_NEUTRAL_GROUND: (state, { index, value }) => {
    state.matches[index].neutralGround = value
  },
  UPDATE_WORLD_CUP: (state, { index, value }) => {
    state.matches[index].worldCup = value
  },
  UPDATE_TEAM: (state, { index, ground, value }) => {
    state.matches[index][ground].team = value
  },
  UPDATE_SCORE: (state, { index, ground, value }) => {
    state.matches[index][ground].score = value
  },
  UPDATE_VALID: (state, { index, value }) => {
    state.matches[index].valid = value
  }
}

export const actions = {
  addMatch: ({ commit }) => {
    commit('ADD_MATCH')
  },
  deleteMatch: ({ commit }, index) => {
    commit('DELETE_MATCH', index)
  },
  updateMatch: ({ commit }, { name, data }) => {
    commit(`UPDATE_${name}`, data)
  },
  resetMatches: ({ commit }) => {
    commit('RESET_MATCHES')
  }
}

export const getters = {
  nbSteps: (state) => state.matches.filter((match) => match.valid).length
}
