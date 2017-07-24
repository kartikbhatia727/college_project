//count = 0;
$(Document).ready(function () {
    $('#add2cart').click(function () {
        //alert("Hello!");
        //alert(id);
        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
                , results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        var pid = getParameterByName('pid');
        console.log(id);
        //if (count == 0) {
        if (id !== "Guest") {
            $.ajax({
                url: "ap/cart?id=" + id + "&pid=" + pid
                , type: "GET"
                , beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic dmliaG9yOmFncmF3YWw=');
                }
                , success: function (data, status) {
                    console.log(data);
                    //var q=1;
                    if (data.length > 0) {
                        var q = data.json[0].quantity;
                        var cid = data.json[0].cid;
                        $.ajax({
                            url: "ap/cart/" + cid
                            , type: "PUT"
                            , data: {
                                cid: cid
                                , id: id
                                , pid: pid
                                , quantity: q + 1
                            }
                            , beforeSend: function (xhr) {
                                xhr.setRequestHeader('Authorization', 'Basic dmliaG9yOmFncmF3YWw=');
                            }
                            , success: function (data1, status) {
                                console.log(data1);
                                //window.location.replace('/cart');
                                //document.write(data); 
                            }
                        });
                    }
                    else {
                        $.ajax({
                            url: "ap/cart"
                            , type: "POST"
                            , data: {
                                id: id
                                , pid: pid
                                , quantity: 1
                            }
                            , beforeSend: function (xhr) {
                                xhr.setRequestHeader('Authorization', 'Basic dmliaG9yOmFncmF3YWw=');
                            }
                            , success: function (data1, status) {
                                console.log(data1);
                                //window.location.replace('/cart');
                                //document.write(data); 
                            }
                        });
                    }
                }
            });
        }
        else {
                    $.ajax({
                url: "ap/tempcart?id=" + sid + "&pid=" + pid
                , type: "GET"
                , beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic dmliaG9yOmFncmF3YWw=');
                }
                , success: function (data, status) {
                    console.log(data);
                    //var q=1;
                    if (data.length > 0) {
                        var q = data.json[0].quantity;
                        var cid = data.json[0].cid;
                        $.ajax({
                            url: "ap/tempcart/" + cid
                            , type: "PUT"
                            , data: {
                                cid: cid
                                , id: sid
                                , pid: pid
                                , quantity: q + 1
                            }
                            , beforeSend: function (xhr) {
                                xhr.setRequestHeader('Authorization', 'Basic dmliaG9yOmFncmF3YWw=');
                            }
                            , success: function (data1, status) {
                                console.log(data1);
                                //window.location.replace('/cart');
                                //document.write(data); 
                            }
                        });
                    }
                    else {
                        $.ajax({
                            url: "ap/tempcart"
                            , type: "POST"
                            , data: {
                                id: sid
                                , pid: pid
                                , quantity: 1
                            }
                            , beforeSend: function (xhr) {
                                xhr.setRequestHeader('Authorization', 'Basic dmliaG9yOmFncmF3YWw=');
                            }
                            , success: function (data1, status) {
                                console.log(data1);
                                console.log("hello!");
                                //window.location.replace('/cart');
                                //document.write(data); 
                            }
                        });
                    }
                }
            });

            //alert("Please Login!");
                    //window.location.replace('/login');

        }
    });
});