import axios from 'axios'

export const state = () => ({
  currentStep: 0,
  rankingFreshness: null
})

export const mutations = {
  INIT_STATE: (state, timestamp) => {
    state.rankingFreshness = timestamp
  },
  STEP_UP: (state) => {
    state.currentStep += 1
  },
  STEP_DOWN: (state) => {
    state.currentStep -= 1
  }
}

export const actions = {
  initStore: ({ commit, dispatch }) => {
    axios
      .get('http://cmsapi.pulselive.com/rugby/rankings/mru.json')
      .then((response) => {
        dispatch('team/initTeams', response.data.entries)
        commit('INIT_STATE', response.data.effective.millis)
      })
  },
  stepUp: ({ commit }) => {
    commit('STEP_UP')
  },
  stepDown: ({ commit }) => {
    commit('STEP_DOWN')
  },
  calculate: ({ dispatch }) => {
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
  }
}
