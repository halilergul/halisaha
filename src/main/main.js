app.controller('MainController', function($scope, $location, $http, $localStorage) {
    var modal = document.getElementById('myModal');

    var monthNames = ["Oca", "Şub", "Mar", "Nis", "May", "Haz",
        "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"
    ];

    $scope.firstname = $localStorage.login.FirstName + " " + $localStorage.login.LastName;

    $scope.position = $localStorage.login.Position;

    var matchDate = $localStorage.currentMatchInfo.MatchDate;
    var date = new Date(matchDate);

    $scope.matchyear = date.getFullYear();
    $scope.matchmonth = monthNames[date.getMonth()];
    $scope.matchday = date.getDate();
    if ($localStorage.currentMatchInfo.IsAttending) {
        $scope.matchattendee = "Katılıyorum";
    } else {

        $scope.matchattendee = "Katılmıyorum";
    }

    $scope.isAdmin = $localStorage.isAdmin;

    $scope.Main = function() {
        $location.path("/join");
    }

    $scope.Cash = function() {
        $location.path("/cash")
    }

    $scope.Debt = function() {
        $location.path("/debt");
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

    $scope.Attending = function() {
        var AttendingObj = {};

        AttendingObj.MatchId = $localStorage.currentMatchInfo.MatchId;
        AttendingObj.IsAttending = document.getElementById("status").selectedIndex;
        AttendingObj.UserId = $localStorage.login.UserID;
        AttendingObj.MobileSessionID = $localStorage.login.SessionID;

        var status = document.getElementById("status").value;

        $http({
            method: 'POST',
            url: ApiUrl + 'MatchAttendance',
            data: AttendingObj
        }).then(function successCallback(response) {

            $scope.matchattendee = response.data.Message;
            modal.style.display = "block";

            if (response.data.Message == "Artık şirkette rahat rahat dolaşabilirsin..") {
                $localStorage.currentMatchInfo.IsAttending = true
            } else {
                $localStorage.currentMatchInfo.IsAttending = false
            }

        }, function errorCallback(response) {
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

    $http.get("https://randomuser.me/api/?gender=male")
        .then(function(response) {
            $scope.photo = response.data.results[0].picture.large;
        });

});
