var app = angular.module('myApp', ['ngRoute','ngStorage']);

var ApiUrl = "http://demo.caretta.net/halisahaapi/carettapi/"

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


app.controller('MainController', function($scope, $location,$localStorage) {
     console.log($localStorage.login);
     $scope.firstname = $localStorage.login.FirstName +" "+ $localStorage.login.LastName;
    $scope.Main = function() {
        $location.path("/join");
    }

    $scope.LogOut = function() {
        $location.path("/login");
        $localStorage.$reset();
    }

});

app.controller('JoinController', function($scope, $location) {
    $scope.Login = function() {
        $location.path("/main");
    }
});

app.controller('LoginController', function($scope, $location, $http,$localStorage) {
    $scope.Login = function() {

        var LoginObj = {
            Username: $scope.username,
            Password: $scope.password
        };

        $http({
            method: 'POST',
            url: ApiUrl + 'Login',
            data: LoginObj
        }).then(function successCallback(response) {
            $localStorage.login = response.data;
            $location.path("/main");

        }, function errorCallback(response) {
            alert("Kullanıcı adı veya şifre hatalı");
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
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
