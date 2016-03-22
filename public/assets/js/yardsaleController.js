angular.module('yardsaleApp')
.controller('yardsaleController', function($scope, $http) {

  $scope.forms = {};
  $scope.login = function() {
    $http.post('/login', {
      username: $scope.forms.username,
      password: $scope.forms.password
    })
    .then(function(user) {
      $scope.getLogin();
    });
  };

  $scope.logout = function() {
    $http.get('/logout')
    .then(function(response) {
      $scope.user = null;
    });
  };

  $scope.getLogin = function() {
    $http.get('/loginInfo')
    .then(function(response) {
      console.log(response.data);
      $scope.user = response.data;
    });
  };

  $scope.getItems = function() {
    $http.get('/api/getItems')
    .then(function(response) {
      console.log(response);
      $scope.items = response.data;
      $scope.getLogin();
    });
  };

  $scope.commentTxt = {};
  $scope.addComment = function(itemName) {
    $http.post('/api/addComment', {
      itemName: itemName,
      commentMsg: $scope.commentTxt.addComment
    })
    .then(function() {
      $scope.commentTxt.addComment = ''
      $scope.getItems();
    });
  };

  $scope.itemTxt = {};
  $scope.newItem = function() {
    $http.post('/api/newItem', {
      //get fields
      itemName: $scope.itemTxt.name,
      itemDescription: $scope.itemTxt.description,
      itemPrice: $scope.itemTxt.price
    })
    .then(function() {
      //clear fields
      $scope.itemTxt.name = '';
      $scope.itemTxt.description = '';
      $scope.itemTxt.price = '';
      $scope.getItems();
    })
  };

  $scope.buyItem = function(itemId, itemPrice) {
    $scope.user.money = $scope.user.money - itemPrice;
    $http.put('/api/buyItem', {itemId: itemId, userMoney: $scope.user.money})
    .then(function() {
      $scope.getItems();
    });
  };

}); // end controller