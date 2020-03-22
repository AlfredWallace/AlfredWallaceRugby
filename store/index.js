export const state = () => ({
  currentStep: 0,
  rankingFreshness: null,
  loading: false,
  errorMessage: null
})

export const mutations = {
  INIT_STATE_LOADING: (state) => {
    state.loading = true
  },
  INIT_STATE_SUCCESS: (state, timestamp) => {
    state.loading = false
    state.rankingFreshness = timestamp
    state.errorMessage = null
  },
  INIT_STATE_FAILURE: (state, { message }) => {
    state.loading = false
    state.errorMessage = message
  }
  // STEP_UP: (state) => {
  //   state.currentStep += 1
  // },
  // STEP_DOWN: (state) => {
  //   state.currentStep -= 1
  // }
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    commit('INIT_STATE_LOADING')
    try {
      const worldRugbyData = await this.$axios.$get(
        'https://cmsapi.pulselive.com/rugby/rankings/mru.json'
      )

      if (
        !worldRugbyData.hasOwnProperty('entries') ||
        !worldRugbyData.hasOwnProperty('effective') ||
        !worldRugbyData.effective.hasOwnProperty('millis')
      ) {
        throw new Error('Data fetched from World Rugby is invalid')
      }

      dispatch('team/initTeams', worldRugbyData.entries)
      commit('INIT_STATE_SUCCESS', worldRugbyData.effective.millis)
    } catch (e) {
      commit('INIT_STATE_FAILURE', e)
    }
  }
  // stepUp({ commit }) {
  //   commit('STEP_UP')
  // },
  // stepDown({ commit }) {
  //   commit('STEP_DOWN')
  // },
  // calculate({ dispatch }) {
  // if (!this.$refs.matchForm.validate()) {
  //   return;
  // }
  //
  // const match = this.matches[this.index];
  // const homeAdvantage = match.neutralGround ? 0 : 3;
  // const homePoints = match.home.team.points[this.currentStep].raw;
  // const awayPoints = match.away.team.points[this.currentStep].raw;
  //
  // let pointsDifference = homePoints + homeAdvantage - awayPoints;
  // if (pointsDifference < -10) {
  //   pointsDifference = -10;
  // } else if (pointsDifference > 10) {
  //   pointsDifference = 10;
  // }
  //
  // const scoreDifference = match.home.score - match.away.score;
  // let p;
  // if (scoreDifference > 0) {
  //   p = (-10 - scoreDifference) / 10;
  // } else if (scoreDifference < 0) {
  //   p = (10 - scoreDifference) / 10;
  // } else {
  //   p = (-scoreDifference) / 10;
  // }
  //
  // if (Math.abs(scoreDifference) > 15) {
  //   p *= 1.5;
  // }
  //
  // if (match.worldCup) {
  //   p *= 2;
  // }
  // const homeTeam = match.home.team;
  // const awayTeam = match.away.team;
  //
  // this.makeNewStep({
  //   home: { id: homeTeam.id, rank: homeTeam.rank, points: homePoints + p },
  //   away: { id: awayTeam.id, rank: awayTeam.rank, points: awayPoints - p },
  // });
  // }
}
