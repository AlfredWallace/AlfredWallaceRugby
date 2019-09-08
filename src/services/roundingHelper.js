export default {
  roundPoints(points) {
    return Math.round((Math.round(points * 1000) / 1000) * 100) / 100;
  },
};
