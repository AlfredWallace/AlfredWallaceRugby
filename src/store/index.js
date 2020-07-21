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

    nbSteps: (state, getters) => getters['match/validMatches'].length,

    isInitialStep: (state) => state.currentStep === 0,

    isLastStep: (state, getters) => state.currentStep === getters.nbSteps,

    currentRanking: (state, getters) => {
      const ranking = state.team.teams.map(({
        id, name, abbreviation, steps,
      }) => ({
        id,
        name,
        abbreviation,
        rank: steps[state.currentStep].rank,
        previousRank: getters.isInitialStep ? null : steps[state.currentStep - 1].rank,
        points: steps[state.currentStep].points,
        previousPoints: getters.isInitialStep ? null : steps[state.currentStep - 1].points,
      }));

      ranking.sort((teamA, teamB) => teamB.points - teamA.points);

      return ranking;
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

    SET_STEP: (state, step) => {
      state.currentStep = step;
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
      commit('SET_STEP', 0);
    },

    stepUp({ state, commit, getters }) {
      if (!getters.isLastStep) {
        commit('SET_STEP', state.currentStep + 1);
      }
    },

    stepDown({ state, commit, getters }) {
      if (!getters.isInitialStep) {
        commit('SET_STEP', state.currentStep - 1);
      }
    },

    stepMax({ commit, getters }) {
      commit('SET_STEP', getters.nbSteps);
    },

    calculate({
      state, getters, commit, dispatch,
    }) {
      commit('team/RESET_STEPS');

      for (let i = 0, len = getters['match/validMatches'].length; i < len; i += 1) {
        commit('team/INIT_NEW_STEP');

        const validMatch = getters['match/validMatches'][i];
        const homeTeamId = validMatch.home.team.id;
        const awayTeamId = validMatch.away.team.id;
        const homePoints = state.team.teams.find((browsedTeam) => browsedTeam.id === homeTeamId).steps[i].points;
        const awayPoints = state.team.teams.find((browsedTeam) => browsedTeam.id === awayTeamId).steps[i].points;

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
          p = (pointsDifference / 10) * (-1);
        }

        if (Math.abs(pointsDifference) > 15) {
          p *= 1.5;
        }

        if (validMatch.worldCup) {
          p *= 2;
        }

        commit('team/SET_POINTS', { teamId: homeTeamId, step: i + 1, points: homePoints + p });
        commit('team/SET_POINTS', { teamId: awayTeamId, step: i + 1, points: awayPoints - p });
        commit('team/SORT_TEAMS', i + 1);
        commit('team/SET_RANKS', i + 1);
      }

      dispatch('stepMax');
    },
  },
});

export default store;
