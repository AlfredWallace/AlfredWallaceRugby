/**
 * Created by arthu on 28/05/2017.
 */
(function () {
    'use strict';

    angular.module('alfredWallaceRugby')
        .directive('awrRankingsRowDirective', [awrRankingsRowDirective]);

    function awrRankingsRowDirective() {
        return {
            scope: {
                orderedTeams: '<',
                step: '<'
            },
            controller: RankingsRowController,
            controllerAs: 'rankRowCtrl',
            templateUrl: '../../templates/rankings-row.html',
            bindToController: true
        };
    }

    function RankingsRowController(){}

    RankingsRowController.prototype = {
        getCurrentPos: function (team) {
            return team.steps[this.step].pos ;
        },
        getPreviousPos: function(team) {
            return this.step === 0 ? '-' : team.steps[this.step - 1].pos ;
        },
        getCurrentRank: function (team) {
            return team.steps[this.step].roundedPts ;
        },
        getPreviousRank: function (team) {
            return this.step === 0 ? '-' : team.steps[this.step - 1].roundedPts ;
        },
        wentUp: function (team) {
            return this.step > 0 && this.getCurrentPos(team) < this.getPreviousPos(team) ;
        },
        wentDown: function (team) {
            return this.step > 0 && this.getCurrentPos(team) > this.getPreviousPos(team) ;
        },
        isInvolved: function (team) {
            return this.step > 0 && this.getCurrentPos(team) === this.getPreviousPos(team) && team.involved ;
        }
    };
})();