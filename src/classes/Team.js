function roundPoints(points) {
  return Math.round((Math.round(points * 1000) / 1000) * 100) / 100;
}

export default class Team {
  constructor(id, name, abbreviation, rank, points) {
    this.id = id;
    this.name = name;
    this.abbreviation = abbreviation;
    this.initialRank = rank;
    this.initialPoints = points;
    this.ranks = [];
    this.points = [];

    this.ranks.push(rank);
    this.ranks.push(rank);
    this.points.push({
      raw: points,
      rounded: roundPoints(points).toFixed(2),
    });
    this.points.push({
      raw: points,
      rounded: roundPoints(points).toFixed(2),
    });
  }
}
