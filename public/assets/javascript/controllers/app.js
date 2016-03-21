angular.module('yardsaleApp', [])
  .controller('BudgetTrackerController', function($http) {
    var budgetTracker = this;
    budgetTracker.budget = 0;
    budgetTracker.expenseTotal = 0;

    budgetTracker.login = function() {
      budgetTracker.loggedIn = true;

      $http({
        method: 'POST',
        url: '/user',
        data: { 
          username: budgetTracker.username,
          password: budgetTracker.password
        }
      }).then(function(result) {
        console.log(result.data);
        budgetTracker.userId = result.data._id;
        budgetTracker.username = result.data.username;
        budgetTracker.password = result.data.password;
        budgetTracker.budget = result.data.budget;
        budgetTracker.expenses = result.data.expenses;
      });
    };

    budgetTracker.updateBudget = function() {
      $http({
        method: 'POST',
        url: '/updatebudget/' + budgetTracker.userId,
        data: { budget: budgetTracker.budget }
      }).then(function(result) {
        budgetTracker.budget = result.data.budget;
        budgetTracker.calculate();
        alert('Budget saved to database');
      });
    };

    budgetTracker.addExpense = function() {
      $http({
        method: 'POST',
        url: '/newexpense/' + budgetTracker.userId,
        data: {
          name: budgetTracker.expense.name,
          description: budgetTracker.expense.description,
          amount: budgetTracker.expense.amount
        }
      }).then(function(result) {
        budgetTracker.login();
      });
    };

    budgetTracker.calculate = function() {
      var expenseTotal = 0;
      angular.forEach(budgetTracker.expenses, function(eachOne) {
        expenseTotal += eachOne.amount;
      });
      budgetTracker.moneyLeft = budgetTracker.budget - expenseTotal;
    };

    budgetTracker.deleteExpense = function(expenseId) {
      $http({
        method: 'GET',
        url: '/deleteexpense/' + expenseId
      }).then(function(result) {
        budgetTracker.login();
      });
    };

    budgetTracker.buyItem = function(expenseId) {
      $http({
        method: 'GET',
        url: '/deleteexpense/' + expenseId
      }).then(function(result) {
        budgetTracker.calculate();
        budgetTracker.login();
      });
    };

  });