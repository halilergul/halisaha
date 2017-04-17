var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'src/login/login.html',
            controller: 'LoginController'
        }).when('/main', {
            templateUrl: 'src/main/main.html',
            controller: 'MainController'
        }).otherwise({
            redirectTo: '/login'
        });
}]);


app.controller('MainController', function($scope) {

});

app.controller('LoginController', function($scope, $location) {
    $scope.Login = function() {
        $location.path("/main");
    }
});
