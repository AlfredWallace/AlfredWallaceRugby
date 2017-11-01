/**
 * Created by arthu on 20/05/2017.
 */
(function () {
    'use strict';

    angular.module('alfredWallaceRugby')
        .directive('awrNavbarDirective',[awrNavbarDirective]);

    function awrNavbarDirective() {
        return {
            link: function (scope, element) {
                element.find('li').on('click',function () {
                    element.collapse('hide');
                });
            }
        }
    }
})();