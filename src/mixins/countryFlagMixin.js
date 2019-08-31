export const countryFlagMixin = {
  methods: {
    flagPath(countryCode) {
      try {
        return require(`../assets/${countryCode.toLowerCase()}.svg`);
      } catch (e) {
        return require('../assets/nzl.svg');
      }
    },
  },
};
