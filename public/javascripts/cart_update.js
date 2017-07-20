function update(cid,i) {
    //console.log("abc");
    console.log(i);
    var newQuantity=$('#q'+i).val();
    //console.log(newQuantity);
    $.ajax({
        url: "ap/cart/" + cid
        , type: "PUT"
        , data: {
             quantity: newQuantity
        }
        , beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic dmliaG9yOmFncmF3YWw=');
        }
        , success: function (data1, status) {
            //console.log(data1);
            console.log(status);
            location.reload(true);
        }
    });
    //console.log(a);
}