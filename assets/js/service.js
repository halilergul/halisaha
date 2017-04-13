var app = angular.module('myApp', ['angular-carousel']);
app.controller('myCtrl', function($scope, $http) {

    $scope.refresh = function() {
        console.log("asd");
        

        $http.get("http://www.doviz.com/api/v1/currencies/all/latest")
            .then(function(response) {
                //console.log(response.data);
                $scope.dolaralis = response.data[0].buying;
                $scope.dolarsatis = response.data[0].selling;
                $scope.euroalis = response.data[1].buying;
                $scope.eurosatis = response.data[1].selling;
                $scope.dolarartis = response.data[0].change_rate;
                $scope.euroartis = response.data[1].change_rate;
            });
    }

    $scope.dolares = [
        "Dolar",
        "Euro",
    ]

    $scope.refresh()

});


/** icroll script **/
var myScroll;

function loaded() {
    myScroll = new IScroll('#scs', {
        mouseWheel: true,
        scrollbars: false
    });
}
