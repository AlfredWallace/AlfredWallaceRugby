export default function ({ match, homePoints, awayPoints }) {
  const homeAdvantage = match.neutralGround ? 0 : 3;

  let weightedPointsDifference = homePoints + homeAdvantage - awayPoints;

  if (weightedPointsDifference < -10) {
    weightedPointsDifference = -10;
  } else if (weightedPointsDifference > 10) {
    weightedPointsDifference = 10;
  }

  const scoreDifference = match.home.score - match.away.score;
  let p;

  if (scoreDifference > 0) {
    p = 1 - (weightedPointsDifference / 10);
  } else if (scoreDifference < 0) {
    p = (1 + (weightedPointsDifference / 10)) * (-1);
  } else {
    p = (weightedPointsDifference / 10) * (-1);
  }

  if (Math.abs(scoreDifference) > 15) {
    p *= 1.5;
  }

  if (match.worldCup) {
    p *= 2;
  }

  if (Object.is(p, -0)) {
    p = 0;
  }

  return p;
}
