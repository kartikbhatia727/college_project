$(Document).ready(function () {
    //console.log(window.user);
    $('#logout').click(function () {
        //alert("I'm Working!");  
                $.get('/logout',
               function (data,status) {
            alert(data);    
             window.location.replace('/login');
            //window.location.replace(data);
        });
    });
});