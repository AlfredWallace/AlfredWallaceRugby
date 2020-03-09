import roundingHelper from '../services/roundingHelper'

export default class Team {
  constructor(id, name, abbreviation, rank, points) {
    this.id = id
    this.name = name
    this.abbreviation = abbreviation
    this.initialRank = rank
    this.initialPoints = points
    this.ranks = []
    this.points = []

    this.ranks.push(rank)
    this.points.push({
      raw: points,
      rounded: roundingHelper.roundPoints(points).toFixed(2)
    })
  }
}
