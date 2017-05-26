app.controller('DebtController', function($scope, $location, $http, $localStorage) {
    var modal = document.getElementById('myModal');

    $scope.isAdmin = $localStorage.isAdmin;

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