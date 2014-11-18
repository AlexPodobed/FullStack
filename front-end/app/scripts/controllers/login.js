'use strict';


angular.module('fullStackApp')
  .controller('LoginCtrl', function ($scope, $http, alert, API_URL, authToken) {
    var url = API_URL + 'login';

    $scope.submit = function () {
      $http.post(url, {
        email: $scope.email,
        password: $scope.password
      })
        .success(function (res) {
          alert('success', 'Welcome', 'Thanks for coming back, ' + res.user.email);
          authToken.setToken(res.token)
        })
        .error(function (err) {
          alert('warning', 'Something went wrong : (', err.message);
        });
    }


  });
