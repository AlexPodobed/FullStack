'use strict';


angular.module('fullStackApp')
  .controller('HeaderCtrl', function ($scope, authToken) {
      $scope.isAuthentificate = authToken.isAuthentificate;
  });
