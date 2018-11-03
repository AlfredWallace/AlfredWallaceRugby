/**
 * Created by arthu on 23/05/2017.
 */
(function () {
    'use strict' ;
    
    angular.module('alfredWallaceRugby')
        .directive('awrMatchDirective', ['matchesOrdering', 'Match', awrMatchDirective]);
    
    function awrMatchDirective(matchesOrdering, Match) {
        return {
            scope: {
                teams: '=',
                match: '=',
                matchList: '='
            },
            templateUrl:'../../templates/match.html',
            controller: ['matchesOrdering', 'Match', MatchController],
            controllerAs: 'matchCtrl',
            bindToController: true,
            link: function(scope,element,attrs){

                element.find('.awr-btn-delete').on('click', function() {
                    scope.matchCtrl.deleteMatch(scope.matchCtrl.match) ;
                    scope.$apply();
                });

                element.find('.awr-btn-add').on('click', function () {
                    scope.matchCtrl.addMatch(scope.matchCtrl.match) ;
                    scope.$apply();
                });

                element.find('.awr-btn-reset').on('click', function () {
                    scope.matchCtrl.resetMatch(scope.matchCtrl.match) ;
                    scope.$apply();
                });

                element.find('.awr-btn-move-up').on('click', function () {
                    scope.matchCtrl.moveMatchUp(scope.matchCtrl.match) ;
                    scope.$apply();
                });

                element.find('.awr-btn-move-down').on('click', function () {
                    scope.matchCtrl.moveMatchDown(scope.matchCtrl.match) ;
                    scope.$apply();
                });
            }
        }
    }

    function MatchController(matchesOrdering, Match) {
        var vm = this ;
        vm.deleteMatch = function(match) {
            var pos = vm.matchList.indexOf(match) ;
            if (pos > -1) {
                vm.matchList.splice(pos, 1) ;
                matchesOrdering.changeAllNextPos(vm.matchList,pos,-1) ;
            }
        };
        vm.addMatch = function (match) {
            var pos = vm.matchList.indexOf(match) ;
            if (pos > -1) {
                vm.matchList.splice(pos + 1, 0, new Match(pos + 1, vm.getMaxMatchIndex() + 1));
                matchesOrdering.changeAllNextPos(vm.matchList,pos + 2,1) ;
            }
        };
        vm.resetMatch = function (match) {
            var pos = vm.matchList.indexOf(match) ;
            if (pos > -1) {
                var number = vm.matchList[pos].number ;
                vm.matchList.splice(pos, 1) ;
                vm.matchList.splice(pos, 0, new Match(pos,number));
            }
        };
        vm.moveMatchUp = function (match) {
            var pos = vm.matchList.indexOf(match) ;
            if (pos > 0) {
                var m =  vm.matchList[pos] ;
                vm.matchList[pos] = vm.matchList[pos - 1] ;
                vm.matchList[pos - 1] = m ;
                vm.matchList[pos].pos = pos ;
                vm.matchList[pos - 1].pos = pos - 1 ;
            }
        };
        vm.moveMatchDown = function (match) {
            var pos = vm.matchList.indexOf(match) ;
            if (pos > -1 && pos < vm.matchList.length) {
                var m =  vm.matchList[pos] ;
                vm.matchList[pos] = vm.matchList[pos + 1] ;
                vm.matchList[pos + 1] = m ;
                vm.matchList[pos].pos = pos ;
                vm.matchList[pos + 1].pos = pos + 1 ;
            }
        };
        vm.getMaxMatchIndex = function () {
            var res = 1 ;
            for (var i = 0, number ; i < vm.matchList.length ; i++) {
                number = vm.matchList[i].number ;
                if (number > res) {
                    res = number ;
                }
            }
            return res ;
        };
    }

})();