angular.module('yardsaleApp', [])
  .controller('BudgetTrackerController', function($http) {
    var budgetTracker = this;
    budgetTracker.budget = 0;
    budgetTracker.expenseTotal = 0;

    budgetTracker.login = function() {
      console.log(budgetTracker.username);
      budgetTracker.loggedIn = true;

      $http({
        method: 'POST',
        url: '/user',
        data: {username:budgetTracker.username}
      }).then(function(result) {
        console.log(result.data);
        budgetTracker.userId = result.data._id;
        budgetTracker.username = result.data.username;
        budgetTracker.budget = result.data.budget;
        budgetTracker.expenses = result.data.expenses;
        budgetTracker.calculate();
      });
    };

    budgetTracker.updateBudget = function() {
      $http({
        method: 'POST',
        url: '/updatebudget' + budgetTracker.userId,
        data: { budget: budgetTracker.budget }
      }).then(function(result) {
        budgetTracker.budget = result.data.budget;
        budgetTracker.calculate();

        alert('Budget updated');
      });
    };

    budgetTracker.addExpense = function() {
      $http({
        method: 'POST',
        url: '/newexpense' + budgetTracker.userId,
        data: {
          amount: budgetTracker.expense.amount,
          name: budgetTracker.expense.name
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
        url: '/deleteexpense' + expenseId
      }).then(function(result) {
        budgetTracker.login();
      });
    };

  });