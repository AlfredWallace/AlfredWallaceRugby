export default function ({ match, homePoints, awayPoints }) {
  const homeAdvantage = match.neutralGround ? 0 : 3;

  let pointsDifference = homePoints + homeAdvantage - awayPoints;

  if (pointsDifference < -10) {
    pointsDifference = -10;
  } else if (pointsDifference > 10) {
    pointsDifference = 10;
  }

  const scoreDifference = match.home.score - match.away.score;
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

  if (match.worldCup) {
    p *= 2;
  }

  return p;
}
