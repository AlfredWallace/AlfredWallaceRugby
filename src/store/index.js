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
    steps: [],
    rankingFreshness: null,
    loading: false,
    errorMessage: null,
  }),

  getters: {
    isInitialStep: (state) => state.currentStep === 0,

    isLastStep: (state) => state.currentStep === state.steps.length - 1,

    currentRanking: (state, getters) => {
      const enrichedTeams = state.team.teams.map((teamToEnrich) => {
        const enrichedTeam = { ...teamToEnrich };

        if (getters.isInitialStep || !Object.prototype.hasOwnProperty.call(state.steps[state.currentStep], teamToEnrich.id)) {
          enrichedTeam.points = state.steps[0][teamToEnrich.id];
          enrichedTeam.previousPoints = null;
        } else {
          enrichedTeam.points = state.steps[state.currentStep][teamToEnrich.id];
          enrichedTeam.previousPoints = state.steps[state.currentStep - 1][teamToEnrich.id];
        }

        return enrichedTeam;
      });

      enrichedTeams.sort((teamA, teamB) => teamB.points - teamA.points);

      return enrichedTeams;
    },
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
      if (state.currentStep >= state.steps.length - 1) {
        throw new Error('Trying to STEP_UP outside of bounds.');
      }
      state.currentStep += 1;
    },

    STEP_DOWN: (state) => {
      if (state.currentStep <= 0) {
        throw new Error('Trying to STEP_DOWN outside of bounds.');
      }

      state.currentStep -= 1;
    },

    STEP_MAX: (state) => {
      state.currentStep = state.steps.length - 1;
    },

    SET_STEPS: (state, steps) => {
      state.steps = steps;
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

    stepUp({ commit }) {
      commit('STEP_UP');
    },

    stepDown({ commit }) {
      commit('STEP_DOWN');
    },

    stepMax({ commit }) {
      commit('STEP_MAX');
    },

    setSteps({ commit }, steps) {
      commit('SET_STEPS', steps);
    },

    calculate({ state, getters, commit }) {
      commit('STEP_MIN');
      commit('SET_STEPS', [].concat(state.steps[0]));

      for (let i = 0, len = getters['match/validMatches'].length; i < len; i += 1) {
        const validMatch = getters['match/validMatches'][i];
        const homeTeamId = validMatch.home.team.id;
        const awayTeamId = validMatch.away.team.id;
        const homePoints = getters.currentRanking.find((t) => t.id === homeTeamId).points;
        const awayPoints = getters.currentRanking.find((t) => t.id === awayTeamId).points;

        const homeAdvantage = validMatch.neutralGround ? 0 : 3;

        let pointsDifference = homePoints + homeAdvantage - awayPoints;

        if (pointsDifference < -10) {
          pointsDifference = -10;
        } else if (pointsDifference > 10) {
          pointsDifference = 10;
        }

        const scoreDifference = validMatch.home.score - validMatch.away.score;
        let p;

        if (scoreDifference > 0) {
          p = 1 - (pointsDifference / 10);
        } else if (scoreDifference < 0) {
          p = (1 + (pointsDifference / 10)) * (-1);
        } else {
          p = (scoreDifference / 10) * (-1);
        }

        if (Math.abs(scoreDifference) > 15) {
          p *= 1.5;
        }

        if (validMatch.worldCup) {
          p *= 2;
        }

        const newStep = getters.isInitialStep ? {} : { ...state.steps[state.currentStep] };
        newStep[homeTeamId] = homePoints + p;
        newStep[awayTeamId] = awayPoints - p;

        commit('SET_STEPS', state.steps.concat(newStep));
        commit('STEP_MAX');
      }
    },
  },
});

export default store;
