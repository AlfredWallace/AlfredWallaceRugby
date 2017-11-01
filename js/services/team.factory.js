/**
 * Created by arthu on 25/05/2017.
 */
(function () {
    'use strict';

    angular.module('alfredWallaceRugby')
        .factory('Team', ['mathUtils', TeamFactory]);

    function TeamFactory(mathUtils) {
        function TeamConstructor(id, name, abbr, points, pos) {
            this.id = id ;
            this.name = name ;
            this.abbr = abbr ;
            this.initialPoints = points ;
            this.initialPos = pos ;
            this.steps = [] ;
            this.involved = false ;
        }

        TeamConstructor.prototype = {
            resetSteps: function () {
                this.steps.length = 0 ;
                this.addStep(this.initialPoints);
                this.steps[0].pos = this.initialPos ;
            },
            addStep: function (points) {
                this.steps.push({
                    pos: null,
                    points: points,
                    roundedPts: mathUtils.roundPoints(points)
                });
            }
        };

        return TeamConstructor ;
    }
})();