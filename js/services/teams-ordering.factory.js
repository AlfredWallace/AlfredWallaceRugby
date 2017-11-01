/**
 * Created by arthu on 27/05/2017.
 */
(function () {
    'use strict';

    angular.module('alfredWallaceRugby')
        .factory('teamsOrdering', [teamsOrderingFactory]);

    function teamsOrderingFactory() {
        return {
            sortTeams: function (teams,step,factor) {
                teams.sort(function (a,b) {
                    return (b.steps[step].points * factor) - (a.steps[step].points * factor) ;
                });
            },
            setPositions: function (teams,step) {
                for (var i = 0, x = teams.length ; i < x ; i++) {
                    teams[i].steps[step].pos = i + 1 ;
                }
            }
        };
    }
})();