var app = angular.module("testapp", []);
app.controller("testController", function ($scope, $window) {
    $scope.message = "Hello, AngularJS";
    $scope.search = function (q) {
        if (q) $window.location.href = '/search?squery=' + q;
        else $window.location.href = '/search?squery=';
        console.log("I'm Here!");
    };
    $scope.enter = function (keyEvent,q) {
        if (keyEvent.which === 13) 
    $scope.search(q);
    }
});