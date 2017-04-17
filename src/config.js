var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state("/",{
            url: "/",
            templateUrl:"src/login/login.html"
        })
        .state("main",{
            url: "/main",
            templateUrl:"src/main/main.html"
        })

});


app.controller('MainController', function($scope) {
    
});

app.controller('LoginController', function($scope) {
    
});