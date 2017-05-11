
/* conroller.js  is the controller of this app.It defines the controller and the business logic

 $urlRouterProvider configures the states and routes to the different views accordingly*/

var app = angular.module('empApp', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
	
	// Default Screen
    $urlRouterProvider.otherwise('/partials/home');

    $stateProvider
        	// Home View 
     	.state('home', {
            url: '/partials/home',
            templateUrl: 'partials/home.html'
        })

        // List View 
        .state('list', {
            url: '/partials/list',
            templateUrl: 'partials/list.html'       
        })

        // Flat View 
        .state('flat', {
            url: '/partials/flat',
            templateUrl: 'partials/flat.html'      
        });
});

// controller gets the data from the employees.json using $http 
app.controller('employeesCtrl', function($scope, $http) {
  	$http.get("js/employees.json").then(function (response) {
    	$scope.empData = response.data.employees;
  	});
}).filter('flattenRows', function() {
    return function(empData) {
      var flatten = [];
      angular.forEach(empData, function(emp) {
        //Extract possible team members
        var teamMembers = emp.team;
        //Add additionl property to show possible team member names
        angular.extend(emp, {teamMemberNames: ""});
        //Push current employee into flattened array
        flatten.push(emp);
        //Iterate over team members
        if (teamMembers) {
          angular.forEach(teamMembers, function(teamMember, idx, teamMembers) {
            //Push team member into flattened array
            flatten.push(teamMember);
            //Add the team member name to manager
            if (idx === teamMembers.length - 1){ 
                emp.teamMemberNames = emp.teamMemberNames + teamMember.name; 
            }else{
                emp.teamMemberNames = emp.teamMemberNames + teamMember.name + ", ";
            }
          });
        }
      });
      return flatten;
    }
  });
