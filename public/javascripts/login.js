$(Document).ready(function () {
    $('#btn').click(function () {
        //alert("I'm Working!");  
        $.post('/login',
               {
               login: $('#login').val(),
                password: $('#password').val()    
               },
               function (data,status) {
            window.location.replace(data);
        });
    });
});