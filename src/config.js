var app = angular.module('myApp', ['ngRoute']);

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
        }).otherwise({
            redirectTo: '/login'
        });
       
}]);


app.controller('MainController', function($scope, $location) {
    $scope.Main = function() {
        $location.path("/join");
    }
});

app.controller('JoinController', function($scope, $location) {
    $scope.Login = function() {
        $location.path("/main");
    }
});

app.controller('LoginController', function($scope, $location) {
    $scope.Login = function() {
        $location.path("/main");
    }
});


/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
