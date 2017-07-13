app.factory("cfactory1", function ($http, $q,$window,cfactory) {
    //http is a predidefined service in angular,its a dependency injection
    //it is used to talk to the server(web service)
    function talktoserver() {
        var serverpromise = $q.defer();
        var ip = location.host;
        var token = "Basic dmliaG9yOmFncmF3YWw=";
        //var header={header:{Authorization:token}};
        $http.defaults.headers.common['Authorization'] = token;

        //var pquery = getParameterByName('pid');
        $http.get("http://" + ip + "/ap/product?pid="+$window.p).then(pass, fail);
        //console.log("Factory");
        //$q represnts a promise,its a predefined service
        function pass(data1) {
            serverpromise.resolve(data1);
            //console.log(data.data.json[0]);
            //this will call when server will return data
        }

        function fail(error1) {
            //this will call only when server will return some error
            serverpromise.reject(error);
            console.log("error:\n" + error);
        }
        return serverpromise.promise;
    }
    var object = {
        "talktoserver": talktoserver
    };
    return object;
});