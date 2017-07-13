var app = angular.module("testapp", []);
app.controller("testController", function($scope,$window) {
  $scope.message = "Hello, AngularJS";	

    $scope.search = function(q){
        if(q)
$window.location.href='/search?squery='+q;
        else
$window.location.href='/search?squery=';            
        console.log("I'm Here!");
    };
    
});

$(Document).ready(function () {
    //console.log(window.user);
    $('#logout').click(function () {
        //alert("I'm Working!");  
                $.get('/logout',
               function (data,status) {
            alert(data);    
             window.location.replace('/login');
            //window.location.replace(data);
        });
    });
});