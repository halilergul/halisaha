var app = angular.module('myApp', ['ngRoute', 'ngStorage']);

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


app.controller('MainController', function($scope, $location, $http, $localStorage) {
    var modal = document.getElementById('myModal');
    //console.log($localStorage.login);
    //console.log($localStorage.currentMatchInfo);

    var monthNames = ["Oca", "Şub", "Mar", "Nis", "May", "Haz",
        "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"
    ];

    $scope.firstname = $localStorage.login.FirstName + " " + $localStorage.login.LastName;
    var date = new Date($localStorage.currentMatchInfo.MatchDate);

    $scope.matchyear = date.getFullYear();
    $scope.matchmonth = monthNames[date.getMonth()];
    $scope.matchday = date.getDate();
    if ($localStorage.currentMatchInfo.IsAttending) {
        $scope.matchattendee = "Katılıyorum";
    } else {

        $scope.matchattendee = "Katılmıyorum";
    }

    $scope.Main = function() {
        $location.path("/join");
    }

    $scope.LogOut = function() {
        $location.path("/login");
        $localStorage.$reset();
    }

    $scope.Attending = function() {

        var AttendingObj = {};

        AttendingObj.MatchId = $localStorage.currentMatchInfo.MatchId;
        AttendingObj.IsAttending = document.getElementById("status").selectedIndex;
        AttendingObj.UserId = $localStorage.login.UserID;
        AttendingObj.MobileSessionID = $localStorage.login.SessionID;

        console.log($localStorage.login);
        console.log(AttendingObj);
        $http({
            method: 'POST',
            url: ApiUrl + 'MatchAttendance',
            data: AttendingObj
        }).then(function successCallback(response) {

            console.log(response);
            $scope.matchattendee = response.data.Message;
            modal.style.display = "block";
            console.log(response.data.Message);

        }, function errorCallback(response) {
            //alert("Kullanıcı adı veya şifre hatalı");
            modal.style.display = "block";
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        $scope.close = function() {
            modal.style.display = "none";
        }
    };


    if ($localStorage.currentMatchInfo.IsAttending) {
        $scope.true = 1;
    } else {

        $scope.true = 0;
    }

    $scope.typeOptions = [
        { name: 'KATILMIYORUM', value: 'KATILMIYORUM' },
        { name: 'KATILIYORUM', value: 'KATILIYORUM' }
    ];

    $scope.selectedItem = { type: $scope.typeOptions[$scope.true].value };

});

app.controller('JoinController', function($scope, $location) {
    $scope.Login = function() {
        $location.path("/main");
    }
});


app.controller('LoginController', function($scope, $location, $http, $localStorage) {
    var modal = document.getElementById('myModal');

    $scope.Login = function() {

        var LoginObj = {
            Username: $scope.username,
            Password: $scope.password
        };

        var CurrentMatchUserInfoObj = {};

        $http({
            method: 'POST',
            url: ApiUrl + 'Login',
            data: LoginObj
        }).then(function successCallback(response) {
            $localStorage.login = response.data;

            CurrentMatchUserInfoObj.UserId = response.data.UserID;
            CurrentMatchUserInfoObj.MobileSessionID = response.data.SessionID;
            //console.log(CurrentMatchUserInfoObj);

            $http({
                method: 'POST',
                url: ApiUrl + 'CurrentMatchUserInfo',
                data: CurrentMatchUserInfoObj
            }).then(function successCallback(response) {



                console.log(response);

                $localStorage.currentMatchInfo = response.data.Result;

            }, function errorCallback(response) {
                //alert("Kullanıcı adı veya şifre hatalı");
                modal.style.display = "block";
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

            $location.path("/main");

        }, function errorCallback(response) {
            //alert("Kullanıcı adı veya şifre hatalı");
            modal.style.display = "block";
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    $scope.close = function() {
        modal.style.display = "none";
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
