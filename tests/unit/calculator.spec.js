import Match from '../../src/classes/Match';
import calculateCoeff from '../../src/services/calculateCoeff';

function makeTestMatch({
  homeScore, awayScore, neutralGround = false, worldCup = false,
}) {
  const match = new Match(0);
  match.home.score = homeScore;
  match.away.score = awayScore;
  match.neutralGround = neutralGround;
  match.worldCup = worldCup;
  return match;
}

describe('Calculator', () => {
  test('calculateCoeff', () => {
    const match = makeTestMatch({ homeScore: 0, awayScore: 0, neutralGround: true });
    const homePoints = 0;
    const awayPoints = 0;

    const result = 0;

    expect(calculateCoeff({ match, homePoints, awayPoints })).toEqual(result);
  });
});
