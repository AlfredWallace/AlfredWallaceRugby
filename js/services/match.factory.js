/**
 * Created by arthu on 25/05/2017.
 */
(function () {
    'use strict';

    angular.module('alfredWallaceRugby')
        .factory('Match', ['mathUtils', 'Side',  MatchFactory]);

    function MatchFactory(mathUtils, Side) {
        function MatchConstructor(pos,number) {
            this.home = new Side('Home') ;
            this.away = new Side('Away') ;
            this.isStep = false ;
            this.step = null ;
            this.neutralGround = false ;
            this.worldCup = false ;
            this.ignore = false ;
            this.pos = pos ;
            this.number = number ;
        }

        MatchConstructor.prototype = {
            calculate: function (globalStep,factor) {
                if (!this.ignore &&
                    this.home.hasRealTeam && mathUtils.isInteger(this.home.score) && this.home.score >= 0 &&
                    this.away.hasRealTeam && mathUtils.isInteger(this.away.score) && this.away.score >= 0) {
                    this.step = globalStep + 1 ;
                    this.isStep = true ;
                    this.home.team.involved = true ;
                    this.away.team.involved = true ;
                    this.calculateNewRanks(this.step,factor) ;
                } else {
                    this.step = null ;
                    this.isStep = false ;
                }
                return this.isStep ;
            },

            calculateNewRanks: function (step,toIntFactor) {
                var exchangedPoints = 0 ;

                // the rankBoundary is the maximum difference there can be between 2 teams, its is a way to preven
                // teams with a very high rank from gaining points by winning against teams with a very low rank,
                // as well as teams with a very low one from losing points by losing against a team with a very high one
                // it is multiplied by the toIntFactor to match the ranks
                var rankBoundary = 10 * toIntFactor;

                // we get the real points of a team, depending on previous matches (and update the displayed points)
                // everything is mutiplied by the toIntFactor
                var homeRankInt = this.home.getAndUpdatePoints(step) * toIntFactor ;
                var awayRankInt = this.away.getAndUpdatePoints(step) * toIntFactor ;


                // we calculate the rank difference and limit it within the boundaries
                // if the match is NOT played on a neutral ground, we add 3 points to the home team rank to simulate
                // the advantage of playing at home, multiplied by the toIntFactor to match the ranks
                var rankDiff = homeRankInt + (this.neutralGround ? 0 : 3 * toIntFactor) - awayRankInt ;
                if (rankDiff < -rankBoundary) {
                    rankDiff = -rankBoundary ;
                } else if (rankDiff > rankBoundary) {
                    rankDiff = rankBoundary ;
                }

                // we calculate the score difference
                // this formula is supposed to be :
                // if (scoreDiff > 0)
                //     points = (rankBoundary - rankDiff) / 10 ;
                // else if (scoreDiff < 0)
                //     points = (-rankBoundary - rankDiff) / 10 ;
                // else
                //     points = (- rankDiff) / 10 ;
                // but to stay in the integer world, the division by 10 is postponed at the end, and as a consequence,
                // points are now 10 times greater than the toIntFactor
                var scoreDiff = this.home.score - this.away.score ;
                if (scoreDiff > 0) {
                    exchangedPoints = rankBoundary - rankDiff;
                }
                else if (scoreDiff < 0) {
                    exchangedPoints = -rankBoundary - rankDiff;
                }
                else {
                    exchangedPoints = -rankDiff;
                }

                // we apply a first factor to the points : if it's a World Cup match, it's worth twice a regular match
                exchangedPoints = exchangedPoints * (this.worldCup ? 2 : 1) ;

                // we apply a second factor on the points
                // this formula is supposed to be : 
                // if the score difference is strictly greater than 15, the factor is 1.5, otherwise it's 1
                // but, as usual, to stay in the integer world, we multiply that factor by 10, and as a result,
                // points are now 100 times greater than the toIntFactor
                exchangedPoints = exchangedPoints * (Math.abs(scoreDiff) > 15 ? 15 : 10) ;
                
                // points can now be rounded and divided back to the same order ofmmagnitude than the toIntFactor
                exchangedPoints = Math.round(exchangedPoints / 100);

                var homeResult = (homeRankInt + exchangedPoints) / toIntFactor ;
                var awayResult = (awayRankInt - exchangedPoints) / toIntFactor ;
                this.home.setResult(homeResult,step);
                this.away.setResult(awayResult,step);
            }
        };

        return MatchConstructor ;
    }
})();