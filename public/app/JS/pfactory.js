app.factory("pfactory", function ($http, $q) {
    //http is a predidefined service in angular,its a dependency injection
    //it is used to talk to the server(web service)
    function talktoserver() {
        var serverpromise = $q.defer();
        var ip = location.host;
        var token = "Basic dmliaG9yOmFncmF3YWw=";
        //var header={header:{Authorization:token}};
        $http.defaults.headers.common['Authorization'] = token;

        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
                , results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        var pquery = getParameterByName('pid');
        $http.get("http://" + ip + "/ap/product/"+pquery).then(pass, fail);
        //console.log("Factory");
        //$q represnts a promise,its a predefined service
        function pass(data) {
            serverpromise.resolve(data);
            //console.log(data.data.json[0]);
            //this will call when server will return data
        }

        function fail(error) {
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