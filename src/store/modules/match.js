class Match {
  constructor() {
    this.homeTeam = null;
    this.awayTeam = null;
    this.homeScore = null;
    this.awayScore = null;
    this.neutralGround = false;
    this.worldCup = false;
    this.ignore = false;
  }
}

export default {
  namespaced: true,
  state: {
    matches: [
      new Match(),
    ],
  },
};
