export const countryFlagMixin = {
  methods: {
    flagPath(team) {
      try {
        return require(`../assets/${team.abbreviation.toLowerCase()}.svg`);
      } catch (e) {
        return require('../assets/nzl.svg');
      }
    },
  },
};
