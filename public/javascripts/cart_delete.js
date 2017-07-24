function delete1(cid) {
    if(id!="Guest"){
    $.ajax({
        url: "ap/cart/" + cid
        , type: "DELETE"
        , beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic dmliaG9yOmFncmF3YWw=');
        }
        , success: function (data1, status) {
            //console.log(data1);
            console.log(status);
            location.reload(true);
        }
    });
    }
    else
    {
        $.ajax({
        url: "ap/tempcart/" + cid
        , type: "DELETE"
        , beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic dmliaG9yOmFncmF3YWw=');
        }
        , success: function (data1, status) {
            //console.log(data1);
            console.log(status);
            location.reload(true);
        }
    });    
    }
 }