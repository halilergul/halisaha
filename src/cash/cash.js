app.controller('CashController', function($scope, $location, $http, $localStorage, $filter) {
    var modal = document.getElementById('myModal');

    $scope.IsPaying = true;
    //$scope.isAdmin = true;
    $scope.isAdmin = $localStorage.isAdmin;

    $scope.payButton = function(user, userId) {
        $scope.payUser = "";
        modal.style.display = "block";
        $scope.payUserId = userId;
        $scope.payUserName = user;

        console.log(user);
    }

    $scope.close = function() {
        modal.style.display = "none";
    }

    $scope.userAmount = function(id) {
        modal.style.display = "none";

        var para = $scope.payUser;
        var name = $scope.payUserName;
         var newItem = {
            UserId: id,
            UserName: name,
            VerilenPara: para
        }

        angular.forEach($scope.payList, function(attendance, $index) {
            if (attendance.UserId === id) {
                $scope.payList[$index] = newItem;
            }

        })

        $scope.total = $scope.total + para;

    }

    $scope.approve = function() {
        $scope.personAmount = $scope.person;
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
        $scope.payList = $filter('filter')($scope.attendanceList.ResultList, { IsAttending: true });

        // Total
        var total = 0;
        angular.forEach($scope.payList, function(attendance) {
            total += attendance.UserId;
        })
        $scope.total = total;
        return total;

    }, function errorCallback(response) {
        modal.style.display = "block";
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
});