function abc(cid, id, pid, quantity) {
    console.log(quantity);
    $.ajax({
        url: "ap/cart/" + cid
        , type: "PUT"
        , data: {
            cid: cid
            , id: id
            , pid: pid
            , quantity: quantity
        }
        , beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic dmliaG9yOmFncmF3YWw=');
        }
        , success: function (data1, status) {
            console.log(data1);
            console.log(status);
            //location.reload(true);
        }
    });
    //console.log(a);
}