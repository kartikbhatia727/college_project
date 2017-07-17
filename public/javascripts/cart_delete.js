function delete1(cid) {
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