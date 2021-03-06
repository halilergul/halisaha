var app = angular.module('myApp', ['ngRoute', 'ngStorage', 'ngCookies']);

var ApiUrl = "http://demo.caretta.net/halisahaapi/carettapi/"

var PhotoUrl = "https://randomuser.me/api/?gender=male"

app.config(['$routeProvider', function($routeProvider, $scope) {
    $routeProvider
        .when('/login', {
            templateUrl: 'src/login/login.html',
            controller: 'LoginController'
        }).when('/main', {
            templateUrl: 'src/main/main.html',
            controller: 'MainController'
        }).when('/join', {
            templateUrl: 'src/join/join.html',
            controller: 'JoinController'
        }).when('/past', {
            templateUrl: 'src/past/past.html',
            controller: 'PastController'
        }).when('/cash', {
            templateUrl: 'src/cash/cash.html',
            controller: 'CashController'
        }).when('/debt', {
            templateUrl: 'src/debt/debt.html',
            controller: 'DebtController'
        }).otherwise({
            redirectTo: '/login'
        });
}]);