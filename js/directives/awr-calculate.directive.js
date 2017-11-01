/**
 * Created by arthu on 30/05/2017.
 */
(function () {
    'use strict';

    angular.module('alfredWallaceRugby')
        .directive('awrCalculateDirective', [awrCalculateDirective]);

    function awrCalculateDirective() {
        return {
            scope:{
                calculateAll: '&'
            },
            templateUrl: '../../templates/calculate.html'
        };
    }
})();