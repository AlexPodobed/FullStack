'use strict';

angular.module('fullStackApp')
  .controller('LogoutCtrl', function ($scope, authToken, $state) {
    authToken.removeAuthToken();
    $state.go('main');
  });
