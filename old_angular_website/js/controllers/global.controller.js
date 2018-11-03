/**
 * Created by arthu on 26/05/2017.
 */
(function () {
    'use strict' ;

    angular.module('alfredWallaceRugby')
        .controller('GlobalController', ['worldRugbyGet', 'teamsOrdering', 'Team', 'Match', GlobalController]);

    function GlobalController(worldRugbyGet, teamsOrdering, Team, Match) {
        var vm = this ;
        vm.teamsOrdering = teamsOrdering ;
        vm.selectedItem = 'calculator' ;
        vm.step = 0 ;
        vm.maxStep = 0 ;
        vm.millis = 0 ;
        vm.teams = [] ;
        vm.orderedTeams = [] ;
        vm.matchList = [new Match(0,1)] ;
        vm.rulesUrl = 'http://www.worldrugby.org/rankings/explanation' ;
        vm.wikiEn = 'https://en.wikipedia.org/wiki/World_Rugby_Rankings' ;
        vm.wikiFr =
            'https://fr.wikipedia.org/wiki/Classement_World_Rugby_des_%C3%A9quipes_nationales_de_rugby_%C3%A0_XV' ;
        vm.wikiIt = 'https://it.wikipedia.org/wiki/Piazzamento_World_Rugby' ;
        // the toIntFactor is set to 10^6 because the ranks have up to 6 decimal places and we need to stay in
        // the integer world because of the floating point representation of numbers in a computer
        vm.toIntFactor = 1000000 ;
        worldRugbyGet.all().then(function (data) {
            if (data.hasOwnProperty('data')) {
                var d = data.data ;
                if (d.hasOwnProperty('effective') && d.effective.hasOwnProperty('millis')) {
                    vm.millis = d.effective.millis;
                }
                if (d.hasOwnProperty('entries')) {
                    var entryList = d.entries ;
                    for (var i = 0, x = entryList.length, team ; i < x ; i++) {

                        if (entryList[i].hasOwnProperty('pos') &&
                            entryList[i].hasOwnProperty('pts') &&
                            entryList[i].hasOwnProperty('team') &&
                            entryList[i].team.hasOwnProperty('id') &&
                            entryList[i].team.hasOwnProperty('abbreviation') &&
                            entryList[i].team.hasOwnProperty('name')) {

                            team = new Team(
                                entryList[i].team.id,
                                entryList[i].team.name,
                                entryList[i].team.abbreviation,
                                entryList[i].pts,
                                entryList[i].pos
                            );
                            team.resetSteps();
                            vm.teams.push(team);
                            vm.orderedTeams.push(team);
                        }
                    }
                }
            }
        });
    }

    GlobalController.prototype = {
        swipeLeft: function () {
            switch (this.selectedItem) {
                case 'calculator':
                    this.selectedItem = 'rankings' ;
                    break;
                case 'rankings':
                    this.selectedItem = 'about' ;
                    break;
            }
        },

        swipeRight: function () {
            switch (this.selectedItem) {
                case 'rankings':
                    this.selectedItem = 'calculator' ;
                    break;
                case 'about':
                    this.selectedItem = 'rankings' ;
                    break;
            }
        },

        selectNavItem: function(item) {
            this.selectedItem = item ;
        },

        isSelected: function(item) {
            return this.selectedItem === item ;
        },

        addMissingSteps: function (match) {
            var teamList = this.teams ;
            for (var i = 0, x = teamList.length, team ; i < x ; i++) {
                team = teamList[i] ;
                // if the team is neither the home team nor the away team of the match,
                // we add a step with the previous step points to its steps array
                if (team !== match.home.team && team !== match.away.team) {
                    team.addStep(team.steps[match.step - 1].points) ;
                }
            }
        },

        calculateAll: function () {
            // reset everything
            this.step = 0 ;
            this.maxStep = 0 ;
            var teamList = this.teams ;
            for (var i = 0, x = teamList.length ; i < x ; i++) {
                teamList[i].resetSteps() ;
                teamList[i].involved = false ;
            }

            // calculation
            var matchList = this.matchList ;
            for (var j = 0, y = matchList.length, isStep ; j < y ; j++) {

                // if it returns true, then it's validated as a step
                if ((isStep = matchList[j].calculate(this.step, this.toIntFactor)) && (!matchList[j].ignore)) {
                    // we increase the global step
                    this.step++;
                    this.maxStep++;
                    // we add a step identical to the previous one in teams no affected by the match so that every
                    // team has the same number of steps in their steps array (it will be used to display the rankings)
                    this.addMissingSteps(matchList[j]);
                    this.teamsOrdering.sortTeams(this.orderedTeams, this.step, this.toIntFactor);
                    this.teamsOrdering.setPositions(this.orderedTeams, this.step);
                }
            }
        }
    };

})();