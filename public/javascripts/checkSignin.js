$(document).ready(function () {
    id = "#{user.id}";
    if (id != "Guest") {
        $('#l').hide();
        //$('#signup').hide();
    }
    else {
        $('#logout').hide();
    }
});