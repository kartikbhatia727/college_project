$(Document).ready(function () {
    $('#btn').click(function () {
        //alert("I'm Working!");  
        $.post('/login',
               {
               login: $('#login').val(),
                password: $('#password').val()    
               },
               function (data,status) {
            //alert(data);    
            //alert(data);
            window.location.replace('/');
        });
    });
});