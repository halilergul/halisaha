app.controller('NavController', function($scope, $location, $http, $localStorage) {
    /* Set the width of the side navigation to 250px */
    $scope.openNav = function() {
        $scope.openClass = "open";
        //document.getElementById("mySidenav").style.width = "250px";
        $scope.overlay = true;
    }

    /* Set the width of the side navigation to 0 */
    $scope.closeNav = function() {
        $scope.openClass = "";
        //document.getElementById("mySidenav").style.width = "0";
        $scope.overlay = false;
    }

    $scope.Login = function() {
        $scope.overlay = false;
        $scope.openClass = "";
        //document.getElementById("mySidenav").style.width = "0";
        $location.path("/main");
    }

    $scope.Main = function() {
        $scope.overlay = false;
        $scope.openClass = "";
        //document.getElementById("mySidenav").style.width = "0";
        $location.path("/join");
    }

    $scope.Past = function() {
        $scope.overlay = false;
        $scope.openClass = "";
        //document.getElementById("mySidenav").style.width = "0";
        $location.path("/past");
    }

    $scope.Cash = function() {
        $scope.overlay = false;
        $scope.openClass = "";
        //document.getElementById("mySidenav").style.width = "0";
        $location.path("/cash");
    }

    $scope.Debt = function() {
        $scope.overlay = false;
        $scope.openClass = "";
        //document.getElementById("mySidenav").style.width = "0";
        $location.path("/debt");
    }

    $scope.LogOut = function() {
        $scope.overlay = false;
        $scope.openClass = "";
        //document.getElementById("mySidenav").style.width = "0";
        $location.path("/login");

        var name = $localStorage.username;
        var pass = $localStorage.password;
        var check = $localStorage.check;

        $localStorage.$reset();

        $localStorage.username = name;
        $localStorage.password = pass;
        $localStorage.check = check;

    }
});
