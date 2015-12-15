(function () {
    'use strict';

    angular
        .module('app.people')
        .controller('PeopleController', DashboardController);

    DashboardController.$inject = ['$q', '$state', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q, $state, dataservice, logger) {
        var vm = this;
        vm.people = [];
        vm.goToPerson = goToPerson;

        getPeople();

        function getPeople() {
            dataservice.getPeople().then(function (people) {
                vm.people = people;
                logger.success('got some people');
            });
        }

        function goToPerson(p) {
            $state.go('person', {
                id : p.id
            });
        }
    }
})();
