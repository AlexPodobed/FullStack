'use strict';

angular.module('fullStackApp')
  .factory('authToken', function ($window) {
    var storage = $window.localStorage,
        userToken = 'userToken',
        cachedToken;

    var authToken = {
      setToken: function(token){
          cachedToken = token;
          storage.setItem(userToken, token);
      },
      getToken: function(){
        if(!cachedToken){
          cachedToken = storage.getItem(userToken);
        }
        return cachedToken;
      },
      isAuthentificate: function(){
        return !!authToken.getToken();
      },
      removeAuthToken: function(){
        cachedToken = null;
        storage.removeItem(userToken);
      }
    };

    return authToken;
  });
