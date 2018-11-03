/**
 * Created by arthu on 04/06/2017.
 */
(function () {
    'use strict';

    angular.module('alfredWallaceRugby')
        .factory('matchesOrdering', [matchesOrderingFactory]);

    function matchesOrderingFactory() {
        return {
            changeAllNextPos: function (matchList, startIndex, value) {
                for (var i = startIndex ; i < matchList.length ; i++) {
                    matchList[i].pos = matchList[i].pos + value ;
                }
            }
        };
    }
})();