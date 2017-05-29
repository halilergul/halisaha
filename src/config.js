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

/*Loader*/
app.run(function ($rootScope, $location,$route, $timeout) {

    $rootScope.config = {};
    $rootScope.config.app_url = $location.url();
    $rootScope.config.app_path = $location.path();
    $rootScope.layout = {};
    $rootScope.layout.loading = false;

    $rootScope.$on('$routeChangeStart', function () {
        $timeout(function(){
          $rootScope.layout.loading = true;          
        });
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout(function(){
          $rootScope.layout.loading = false;
        }, 500);
    });
    $rootScope.$on('$routeChangeError', function () {
        $rootScope.layout.loading = false;

    });
});