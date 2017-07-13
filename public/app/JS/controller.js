app.controller("appctrl", function ($scope, appfactory, $filter) {
    var promise = appfactory.talktoserver();
    promise.then(function (data) {
            $scope.data = data;
            //data.data.json
        }, function (error) {
            //$scope.error = error;
        })
        //$scope.p=$window.p;    
});
app.controller("pctrl", function ($scope, pfactory) {
    var promise = pfactory.talktoserver();
    promise.then(function (data) {
        $scope.data = data;
        console.log(data.data.json);
        //data.data.json
    }, function (error) {
        $scope.error = error;
    })
});
app.controller("testctrl", function ($scope, $filter, cfactory1, $window) {
    $scope.p = $window.p;
    var promise = cfactory1.talktoserver();
    promise.then(function (data) {
        $scope.data = data;
        console.log(data.data.json);
    }, function (error) {
        //$scope.error = error;
    })
});
app.controller("cctrl", function ($scope, cfactory, cfactory1) {
    var json = [];
    var json1 = [];
    var promise = cfactory.talktoserver();
    promise.then(function (data) {
        for(var i=0;i<data.data.json.length;i++)
        json.push(data.data[i].json);
        //$scope.data = data;
        console.log(data.data.json);
        //data.data.json
    }, function (error) {
        //$scope.error = error;
    })
    promise = cfactory1.talktoserver();
    promise.then(function (data1) {
                for(var i=0;i<data1.data.json.length;i++)
        json1.push(data1.data[i].json);        
        //json1=data1.data.json;
        //$scope.data = data;
        console.log(data1.data.json);
        //data.data.json
    }, function (error1) {
        //$scope.error = error;
    })
    
    var q=[];
    
    var length=json;
    console.log(length);
    
    /*var a=0;
    
    for(var i=0;i<length;i++)
    {
        for(var j=i;j<length;j++){
            
            if(($scope.json[i].id==$scope.json[j].id)&&($scope.json[i].pid==$scope.json[j].pid))
             {   
                
                 a++;
                 console.log(a);
             }
        }
    }
    
    console.log(a);
*/
    
});