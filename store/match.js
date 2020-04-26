// import Match from '../classes/Match'

export const state = () => ({
  matches: []
})

export const getters = {
  nbSteps: (state) => state.matches.length
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
