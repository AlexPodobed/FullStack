'use strict';

angular.module('fullStackApp')
  .controller('JobsCtrl', function ($scope, $http, API_URL, alert) {
    console.log(API_URL + 'jobs')

    $http.get(API_URL + 'jobs')
      .success(function(jobs){
        $scope.jobs = jobs;
      })
      .error(function(err){
        console.log(err)
        alert('warning', 'Unable to get jobs', err.message);
      })

  });

