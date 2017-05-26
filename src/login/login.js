app.controller('LoginController', function($scope, $location, $http, $localStorage, $cookies, $cookieStore) {
    var modal = document.getElementById('myModal');

    $scope.remember = function() {

        if ($scope.check) {
            $localStorage.username = $scope.username;
            $localStorage.password = $scope.password;
            $localStorage.check = $scope.check;

        } else {
            $localStorage.$reset();
        }
    }

    $scope.username = $localStorage.username;
    $scope.password = $localStorage.password;
    $scope.check = $localStorage.check;

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
            $localStorage.isAdmin = response.data.IsAdmin;
            console.log($localStorage.isAdmin);

            $http({
                method: 'POST',
                url: ApiUrl + 'CurrentMatchUserInfo',
                data: CurrentMatchUserInfoObj
            }).then(function successCallback(response) {

                //console.log(response);
                $localStorage.currentMatchInfo = response.data.Result;
                $location.path("/main");
            }, function errorCallback(response) {
                //alert("Kullanıcı adı veya şifre hatalı");
                modal.style.display = "block";
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

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
