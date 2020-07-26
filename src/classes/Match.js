export default class Match {
  constructor(matchNumber) {
    this.number = matchNumber;
    this.associatedStep = null;
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
    this.valid = false;
  }
}
