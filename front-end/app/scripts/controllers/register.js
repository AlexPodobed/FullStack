'use strict';

angular.module('fullStackApp')
  .controller('RegisterCtrl', function ($scope, $rootScope, $http, alert) {
    var url = "http://localhost:3333/register";

      //http://localhost:3333/register

      $scope.submit = function(){
        console.log($scope.user)
        $http.post(url, {
          email: $scope.email,
          password: $scope.password
        })
          .success(function(res){
            alert('success', 'OK!', 'You are register now');
          })
          .error(function(err){
            alert('warning', 'Oops!', 'Could not register');
          });
      }
  });
