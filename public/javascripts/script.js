$(Document).ready(function () {
    $('#logout').click(function () {
                $.get('/logout',
               function (data,status) {
            alert(data);    
             window.location.replace('/');
        });
    });
});