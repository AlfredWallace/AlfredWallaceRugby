/**
 * Created by arthu on 23/05/2017.
 */
(function () {
    'use strict';

    angular.module('alfredWallaceRugby')
        .factory('mathUtils', [mathUtilsFactory]);

    function mathUtilsFactory(){
        return {
            roundPoints: function (n) {
                return (Math.round(n * 100) / 100).toFixed(2) ;
            },
            isInteger: function (n) {
                return $.isNumeric(n) && Math.floor(n) === n ;
            }
        }
    }
})();