/**
 * Created by arthu on 03/06/2017.
 */
(function () {
    'use strict' ;

    angular.module('alfredWallaceRugby')
        .directive('awrAboutDirective', [awrAboutDirective]);

    function awrAboutDirective() {
        return {
            templateUrl: '../../templates/about.html'
        };
    }
})();