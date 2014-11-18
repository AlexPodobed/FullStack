'use strict';

angular.module('fullStackApp')
  .controller('RegisterCtrl', function ($scope, $rootScope, $http, alert, authToken) {
    var url = "http://localhost:3333/register";

    //http://localhost:3333/register

    $scope.submit = function () {
      $http.post(url, {
        email: $scope.email,
        password: $scope.password
      })
        .success(function (res) {
          console.log(res)
          alert('success', 'Account Created!', 'Welcome, ' + res.user.email);
          authToken.setToken(res.token)
        })
        .error(function (err) {
          alert('warning', 'Oops!', 'Could not register');
        });
    }
  });
