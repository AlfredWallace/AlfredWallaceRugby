import calculateCoeff from '../../src/services/calculateCoeff';

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
    {
      homeScore: 25, awayScore: 22, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 74.11, result: 0.79,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 52.19, result: 0,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 79.11, result: 1.29,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 94.53, result: 2,
    },
    //
    {
      homeScore: 25, awayScore: 22, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: 2,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 74.11, result: 1.57,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 52.19, result: 0,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 79.11, result: 2.57,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 94.53, result: 4,
    },
    //
    {
      homeScore: 25, awayScore: 22, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: 0.7,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 74.11, result: 0.49,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 52.19, result: 0,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 79.11, result: 0.99,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 94.53, result: 2,
    },
    //
    {
      homeScore: 25, awayScore: 22, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: 1.4,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 74.11, result: 0.97,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 52.19, result: 0,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 79.11, result: 1.97,
    },
    {
      homeScore: 25, awayScore: 22, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 94.53, result: 4,
    },
    //
    {
      homeScore: 25, awayScore: 9, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: 1.5,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 74.11, result: 1.18,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 52.19, result: 0,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 79.11, result: 1.93,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 94.53, result: 3,
    },
    //
    {
      homeScore: 25, awayScore: 9, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: 3,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 74.11, result: 2.36,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 52.19, result: 0,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 79.11, result: 3.86,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 94.53, result: 6,
    },
    //
    {
      homeScore: 25, awayScore: 9, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: 1.05,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 74.11, result: 0.73,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 52.19, result: 0,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 79.11, result: 1.48,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 94.53, result: 3,
    },
    //
    {
      homeScore: 25, awayScore: 9, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: 2.1,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 74.11, result: 1.46,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 52.19, result: 0,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 79.11, result: 2.96,
    },
    {
      homeScore: 25, awayScore: 9, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 94.53, result: 6,
    },
    //
    {
      homeScore: 22, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: -1,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 74.11, result: -1.21,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 52.19, result: -2,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 79.11, result: -0.71,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 94.53, result: 0,
    },
    //
    {
      homeScore: 22, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: -2,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 74.11, result: -2.43,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 52.19, result: -4,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 79.11, result: -1.43,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 94.53, result: 0,
    },
    //
    {
      homeScore: 22, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: -1.3,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 74.11, result: -1.51,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 52.19, result: -2,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 79.11, result: -1.01,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 94.53, result: 0,
    },
    //
    {
      homeScore: 22, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: -2.6,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 74.11, result: -3.03,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 52.19, result: -4,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 79.11, result: -2.03,
    },
    {
      homeScore: 22, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 94.53, result: 0,
    },
    //
    {
      homeScore: 9, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: -1.5,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 74.11, result: -1.82,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 52.19, result: -3,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 79.11, result: -1.07,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: true, worldCup: false, homePoints: 76.24, awayPoints: 94.53, result: 0,
    },
    //
    {
      homeScore: 9, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: -3,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 74.11, result: -3.64,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 52.19, result: -6,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 79.11, result: -2.14,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: true, worldCup: true, homePoints: 76.24, awayPoints: 94.53, result: 0,
    },
    //
    {
      homeScore: 9, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 76.24, result: -1.95,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 74.11, result: -2.27,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 52.19, result: -3,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 79.11, result: -1.52,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: false, worldCup: false, homePoints: 76.24, awayPoints: 94.53, result: 0,
    },
    //
    {
      homeScore: 9, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 76.24, result: -3.9,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 74.11, result: -4.54,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 52.19, result: -6,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 79.11, result: -3.04,
    },
    {
      homeScore: 9, awayScore: 25, neutralGround: false, worldCup: true, homePoints: 76.24, awayPoints: 94.53, result: 0,
    },
  ];

  dataSet.forEach(({
    homeScore, awayScore, neutralGround, worldCup, homePoints, awayPoints, result,
  }) => {
    test(`calculateCoeff: Team A (rank: ${homePoints}) scores ${homeScore} / Team B (rank: ${awayPoints}) scores ${awayScore} / neutral ground : ${neutralGround} / world cup : ${worldCup} / points exchanged should be : ${result}`, () => {
      let coeff = calculateCoeff({
        homeScore,
        awayScore,
        neutralGround,
        worldCup,
        homePoints,
        awayPoints,
      });

      coeff = Math.round(coeff * 1000) / 1000;
      coeff = Math.round(coeff * 100) / 100;

      expect(coeff).toEqual(result);
    });
  });
});
