/**
 * Created by arthu on 26/05/2017.
 */
(function () {
    'use strict';

    angular.module('alfredWallaceRugby')
        .factory('Side', ['awrGetTeam', SideFactory]);

    function SideFactory(awrGetTeam){
        function SideConstructor(label) {
            this.hasRealTeam = false ;
            this.teamId = null ;
            this.team = null ;
            this.roundedPts = null ;
            this.score = null ;
            this.roundedRes = null ;
            this.label = label ;
        }

        SideConstructor.prototype = {
            changeTeam: function (teams) {
                var isReal = false ;
                var roundedPts = null ;

                if (this.teamId !== null) {
                    this.team = awrGetTeam.byId(teams,this.teamId) ;
                    if (this.team !== null) {
                        isReal = true;
                        roundedPts = this.team.steps[0].roundedPts;
                    }
                }

                this.hasRealTeam = isReal ;
                this.roundedPts = roundedPts ;
            },

            // this function is called when calculating a match result, it updates (depending on the step provided)
            // the display of the ranks with the rounded points, and returns the real points
            getAndUpdatePoints: function (step) {
                var stepObj = this.team.steps[step - 1];
                this.roundedPts = stepObj.roundedPts ;
                return stepObj.points ;
            },

            setResult: function (points,step) {
                this.team.addStep(points);
                this.roundedRes = this.team.steps[step].roundedPts ;
            }
        };

        return SideConstructor ;
    }
})();