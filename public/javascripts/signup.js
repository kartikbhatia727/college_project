$(Document).ready(function () {
    $('#btn').click(function () {
        //alert("I'm Working!");  
        $.post('/signup',
               {
               name: $('#name').val(),
                mob: $('#mob').val(),
                email: $('#email').val(),
                pass: $('#pass').val()    
               },
               function (data,status) {
            window.location.replace('/');    
            //alert(data,status);
        });
    });
});