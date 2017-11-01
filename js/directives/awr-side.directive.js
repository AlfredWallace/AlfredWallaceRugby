/**
 * Created by arthu on 26/05/2017.
 */
(function () {
    'use strict' ;

    angular.module('alfredWallaceRugby')
        .directive('awrSideDirective', ['awrGetTeam', awrSideDirective]);

    function awrSideDirective(awrGetTeam) {
        return {
            scope: {
                teams: '=',
                side: '='
            },
            templateUrl:'../../templates/side.html',
            controller: ['awrGetTeam', SideController],
            controllerAs: 'sideCtrl',
            bindToController: true,
            link: function (scope,element,attrs) {
                // placeholder is the text to display when no selection is made
                // allowClear displays an X to clear the select
                // templateResult uses a function to customize the display of the selected element
                // templateSelection uses a function to customize the display of the elements in the opened list
                // the 2 .on() events are made to prevent the select from opening itself when clearing the selection
                // I found it here http://stackoverflow.com/a/35807365/3663885
                // it works as follows : if the unselecting event is triggered, we set a data (unselecting) to a value (true)
                // by default, it will open the select, so if the opening event is triggered and the data is set, then we unset it
                // and block the default behavior, which is actually opening. This allows the normal opening to works correctly
                element.find('select').select2({
                    placeholder: 'Select a team (optional)',
                    allowClear: true,
                    width: '100%',
                    theme: 'bootstrap',
                    templateResult: scope.sideCtrl.select2FormatTeam,
                    templateSelection: scope.sideCtrl.select2FormatTeam
                }).on('select2:unselecting', function() {
                    $(this).data('unselecting', true);
                }).on('select2:opening', function(e) {
                    if ($(this).data('unselecting')) {
                        $(this).removeData('unselecting');
                        e.preventDefault();
                    }
                });
            }
        }
    }

    function SideController(awrGetTeam) {
        var vm = this ;
        vm.awrGetTeam = awrGetTeam ;
        vm.select2FormatTeam = function(data) {
            if (!data.id) {
                return data.text;
            }
            var teamId = parseInt(data.id.substr(7));
            var team = vm.awrGetTeam.byId(vm.teams,teamId) ;
            var teamAbbr = team !== null ? team.abbr : '' ;
            return $('<span class="select2-team-table">' +
                '<span class="select2-team-cell tLogo20x ' + teamAbbr + '"></span>' +
                '<span class="select2-team-cell">' + data.text + '</span>' +
                '</span>');
        };
    }

})();