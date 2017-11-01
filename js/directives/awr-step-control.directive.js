/**
 * Created by arthu on 21/05/2017.
 */
(function () {
    'use strict';

    angular.module('alfredWallaceRugby')
        .directive('awrStepControlDirective', ['teamsOrdering', awrStepControlDirective]);

    function awrStepControlDirective(teamsOrdering){
        return {
            scope: {
                step: '=',
                maxStep: '<',
                toIntFactor: '<',
                orderedTeams: '='
            },
            controller: StepController,
            controllerAs: 'stepCtrl',
            templateUrl: '../../templates/step-control.html',
            link: function (scope,element) {
                element.on('click', 'button', function () {
                    var stepTarget = $(this).data('step-target') ;
                    var step = null ;
                    switch (stepTarget) {
                        case 'first':
                            step = 0 ;
                            break ;
                        case 'previous':
                            step = scope.step - 1 ;
                            break ;
                        case 'next':
                            step = scope.step + 1 ;
                            break ;
                        case 'last':
                            step = scope.maxStep ;
                            break ;
                    }
                    if (step !== null) {
                        scope.step = step;
                        teamsOrdering.sortTeams(scope.orderedTeams, step, scope.toIntFactor);
                        scope.$apply();
                    }
                });
            }
        }
    }

    function StepController(){}
})();