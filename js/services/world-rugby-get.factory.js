/**
 * Created by arthu on 18/05/2017.
 */
(function () {
    'use strict';

    angular.module('alfredWallaceRugby')
        .factory('worldRugbyGet', ['$http', worldRugbyGetFactory]);

    function worldRugbyGetFactory(http) {
        return {
            all: function() {
                return http.get('http://cmsapi.pulselive.com/rugby/rankings/mru.json');
            }
        };
    }

})();

