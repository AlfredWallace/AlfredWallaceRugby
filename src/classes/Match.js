export default class Match {
  constructor() {
    this.home = {
      team: null,
      score: null,
    };
    this.away = {
      team: null,
      score: null,
    };
    this.neutralGround = false;
    this.worldCup = false;
    this.ignore = false;
  }
}
