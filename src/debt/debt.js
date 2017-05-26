app.controller('DebtController', function($scope, $location, $http, $localStorage) {
    var modal = document.getElementById('myModal');

    $scope.isAdmin = $localStorage.isAdmin;

    $scope.Login = function() {
        $location.path("/main");
    }

    $scope.Cash = function() {
        $location.path("/cash");
    }

    $scope.Debt = function() {
        $location.path("/debt");
    }

    $scope.Main = function() {
        $location.path("/join");
    }

    $scope.LogOut = function() {
        $location.path("/login");

        var name = $localStorage.username;
        var pass = $localStorage.password;
        var check = $localStorage.check;

        $localStorage.$reset();

        $localStorage.username = name;
        $localStorage.password = pass;
        $localStorage.check = check;
    }

    $http({
        method: 'POST',
        url: ApiUrl + 'AttendanceList',
        data: {
            MatchId: null,
            UserId: $localStorage.login.UserID,
            MobileSessionID: $localStorage.login.SessionID
        }
    }).then(function successCallback(response) {
        console.log(response);
        $scope.attendanceList = response.data;
   
    }, function errorCallback(response) {
        modal.style.display = "block";
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
});