$(Document).ready(function () {
        $('#checkout').click(function () {
            $.get('/checkout', function (data, status) {
                if(data=="Success")
                {
                    alert("Your Order was Placed Successfully!");
                    window.setTimeout(location.href = "/orders", 2000);
                }
                else if(data=="b")
                {
                    window.location.replace('/login');
                }
            });
        });
    });