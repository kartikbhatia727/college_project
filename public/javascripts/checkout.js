$(Document).ready(function(){
    $('#checkout').click(function(){
        $.get('/checkout',function(data,status){
            alert(data);
            window.setTimeout(location.href = "/orders",2000)
        });
        //window.location.replace('/checkout');
    });
});