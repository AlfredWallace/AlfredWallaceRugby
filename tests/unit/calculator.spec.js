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
  const dataSet = [
    {
      homeScore: 0, awayScore: 0, neutralGround: true, worldCup: false, homePoints: 0, awayPoints: 0, result: 0,
    },
    {
      homeScore: 0, awayScore: 0, neutralGround: true, worldCup: true, homePoints: 0, awayPoints: 0, result: 0,
    },
    {
      homeScore: 0, awayScore: 0, neutralGround: false, worldCup: false, homePoints: 0, awayPoints: 0, result: -0.3,
    },
    {
      homeScore: 0, awayScore: 0, neutralGround: false, worldCup: true, homePoints: 0, awayPoints: 0, result: -0.6,
    },
    {
      homeScore: 8, awayScore: 0, neutralGround: true, worldCup: false, homePoints: 0, awayPoints: 0, result: 1,
    },
    {
      homeScore: 8, awayScore: 0, neutralGround: true, worldCup: true, homePoints: 0, awayPoints: 0, result: 2,
    },
    // {
    //   homeScore: 8, awayScore: 0, neutralGround: false, worldCup: false, homePoints: 0, awayPoints: 0, result: 1,
    // },
    // {
    //   homeScore: 8, awayScore: 0, neutralGround: false, worldCup: true, homePoints: 0, awayPoints: 0, result: 2,
    // },
    {
      homeScore: 17, awayScore: 0, neutralGround: true, worldCup: false, homePoints: 0, awayPoints: 0, result: 1.5,
    },
    {
      homeScore: 17, awayScore: 0, neutralGround: true, worldCup: true, homePoints: 0, awayPoints: 0, result: 3,
    },
    {
      homeScore: 0, awayScore: 8, neutralGround: true, worldCup: false, homePoints: 0, awayPoints: 0, result: -1,
    },
    {
      homeScore: 0, awayScore: 8, neutralGround: true, worldCup: true, homePoints: 0, awayPoints: 0, result: -2,
    },
    {
      homeScore: 0, awayScore: 17, neutralGround: true, worldCup: false, homePoints: 0, awayPoints: 0, result: -1.5,
    },
    {
      homeScore: 0, awayScore: 17, neutralGround: true, worldCup: true, homePoints: 0, awayPoints: 0, result: -3,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 13.37, awayPoints: 13.37, result: 0,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 13.37, awayPoints: 13.37, result: 0,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 13.37, awayPoints: 13.37, result: -0.3,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 13.37, awayPoints: 13.37, result: -0.6,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: true, worldCup: false, homePoints: 13.37, awayPoints: 13.37, result: 1,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: true, worldCup: true, homePoints: 13.37, awayPoints: 13.37, result: 2,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: true, worldCup: false, homePoints: 13.37, awayPoints: 13.37, result: 1.5,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: true, worldCup: true, homePoints: 13.37, awayPoints: 13.37, result: 3,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 13.37, awayPoints: 13.37, result: -1,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 13.37, awayPoints: 13.37, result: -2,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 13.37, awayPoints: 13.37, result: -1.5,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 13.37, awayPoints: 13.37, result: -3,
    },
  ];

  dataSet.forEach(({
    homeScore, awayScore, neutralGround, worldCup, homePoints, awayPoints, result,
  }) => {
    test(`calculateCoeff: Team A (rank: ${homePoints}) scores ${homeScore} / Team B (rank: ${awayPoints}) scores ${awayScore} / neutral ground : ${neutralGround} / world cup : ${worldCup} / points exchanged should be : ${result}`, () => {
      const match = makeTestMatch({
        homeScore, awayScore, neutralGround, worldCup,
      });
      expect(Math.round(calculateCoeff({ match, homePoints, awayPoints }) * 1000) / 1000).toEqual(result);
    });
  });
});
