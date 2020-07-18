import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import match from './modules/match';
import team from './modules/team';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    match,
    team,
  },

  state: () => ({
    currentStep: 0,
    rankingFreshness: null,
    loading: false,
    errorMessage: null,
  }),

  getters: {
    isInitialStep: (state) => state.currentStep === 0,
    isLastStep: (state, getters) => state.currentStep === getters['match/nbSteps'],
  },

  mutations: {
    INIT_STATE_LOADING: (state) => {
      state.loading = true;
    },

    INIT_STATE_SUCCESS: (state, timestamp) => {
      state.loading = false;
      state.rankingFreshness = timestamp;
      state.errorMessage = null;
    },

    INIT_STATE_FAILURE: (state, { message }) => {
      state.loading = false;
      state.errorMessage = message;
    },

    STEP_MIN: (state) => {
      state.currentStep = 0;
    },

    STEP_UP: (state) => {
      state.currentStep += 1;
    },

    STEP_DOWN: (state) => {
      state.currentStep -= 1;
    },

    STEP_MAX: (state, maxStep) => {
      state.currentStep = maxStep;
    },
  },

  actions: {
    async initWorldRugbyData({ commit, dispatch }) {
      commit('INIT_STATE_LOADING');
      try {
        const { data } = await axios.get('https://cmsapi.pulselive.com/rugby/rankings/mru.json');

        if (!Object.prototype.hasOwnProperty.call(data, 'entries') || !Object.prototype.hasOwnProperty.call(data, 'effective') || !Object.prototype.hasOwnProperty.call(data.effective, 'millis')) {
          throw new Error('Data fetched from World Rugby is invalid');
        }

        dispatch('team/initTeams', data.entries);
        commit('INIT_STATE_SUCCESS', data.effective.millis);
      } catch (e) {
        commit('INIT_STATE_FAILURE', e);
      }
    },

    stepMin({ commit }) {
      commit('STEP_MIN');
    },

    stepUp({ commit, getters }) {
      if (!getters.isLastStep) {
        commit('STEP_UP');
      }
    },

    stepDown({ commit, getters }) {
      if (!getters.isInitialStep) {
        commit('STEP_DOWN');
      }
    },

    stepMax({ commit, getters }) {
      commit('STEP_MAX', getters['match/nbSteps']);
    },

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
  },
});

export default store;
