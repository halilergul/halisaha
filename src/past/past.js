app.controller('PastController', function($scope, $location, $http, $localStorage) {
    
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
        $scope.attendanceList = response.data;
   
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

});