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
      homeScore: 25, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: 0,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 74.11, result: -0.21,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 52.19, result: -1,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 79.11, result: 0.29,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 94.53, result: 1,
    },
    //
    {
      homeScore: 25, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: 0,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 74.11, result: -0.43,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 52.19, result: -2,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 79.11, result: 0.57,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 94.53, result: 2,
    },
    //
    {
      homeScore: 25, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: -0.3,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 74.11, result: -0.51,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 52.19, result: -1,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 79.11, result: -0.01,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 94.53, result: 1,
    },
    //
    {
      homeScore: 25, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: -0.6,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 74.11, result: -1.03,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 52.19, result: -2,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 79.11, result: -0.03,
    },
    {
      homeScore: 25, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 94.53, result: 2,
    },
    //
    {
      homeScore: 25, awayScore: 22, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: 1,
    },
    //
    {
      homeScore: 25, awayScore: 22, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: 2,
    },
    //
    {
      homeScore: 25, awayScore: 22, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: 0.7,
    },
    //
    {
      homeScore: 25, awayScore: 22, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: 1.4,
    },
    //
    {
      homeScore: 25, awayScore: 9, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: 1.5,
    },
    //
    {
      homeScore: 25, awayScore: 9, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: 3,
    },
    //
    {
      homeScore: 25, awayScore: 9, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: 1.05,
    },
    //
    {
      homeScore: 25, awayScore: 9, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: 2.1,
    },
    //
    {
      homeScore: 22, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: -1,
    },
    //
    {
      homeScore: 22, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: -2,
    },
    //
    {
      homeScore: 22, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: -1.3,
    },
    //
    {
      homeScore: 22, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: -2.6,
    },
    //
    {
      homeScore: 9, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: -1.5,
    },
    //
    {
      homeScore: 9, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: -3,
    },
    //
    {
      homeScore: 9, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: -1.95,
    },
    //
    {
      homeScore: 9, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: -3.9,
    },
  ];

  dataSet.forEach(({
    homeScore, awayScore, neutralGround, worldCup, homePoints, awayPoints, result,
  }) => {
    test(`calculateCoeff: Team A (rank: ${homePoints}) scores ${homeScore} / Team B (rank: ${awayPoints}) scores ${awayScore} / neutral ground : ${neutralGround} / world cup : ${worldCup} / points exchanged should be : ${result}`, () => {
      const match = makeTestMatch({
        homeScore, awayScore, neutralGround, worldCup,
      });
      expect((Math.round((Math.round(calculateCoeff({ match, homePoints, awayPoints }) * 1000) / 1000) * 100)) / 100).toEqual(result);
    });
  });
});
