/**
 * Created by arthu on 29/05/2017.
 */
(function () {
    'use strict';

    angular.module('alfredWallaceRugby')
        .factory('awrGetTeam', ['mathUtils', awrGetTeamFactory]);

    function awrGetTeamFactory(mathUtils) {
        return {
            byId: function (teams, id) {
                if (mathUtils.isInteger(id)) {
                    for (var i = 0, x = teams.length; i < x; i++) {
                        if (teams[i].id === id) {
                            return teams[i];
                        }
                    }
                }
                return null ;
            }
        };
    }
})();