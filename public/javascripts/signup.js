function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
}

function validateForm()
	{
		var name=$('#name').val();
		var email=$('#email').val(); 
		var mobile=$('#mob').val();
		var password=$('#pass').val(); 
		//var cpassword=document.forms["myForm"]["cpassword"].value;		
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;		
	var b=true;	
        if(name.length==0)
        {
            $('#invalidname').show();
             b=false;
        }
        
        if(!email.match(mailformat))
		{
			$('#invalidemail').show();
            b= false;
		}
        
        if(typeof(mobile)=='NaN'||mobile.length!=10)
        {
            $('#invalidmob').show();
            b= false;
        }
 
        if(password.length<8)
		{
			$('#invalidpass').show();
            b= false;
		}
        
            return b;
    	}

function validateAgain()
{
    	var name=$('#name').val();
		var email=$('#email').val(); 
		var mobile=$('#mob').val();
		var password=$('#pass').val(); 
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;		
		
        if(name.length!=0)
        {
            $('#invalidname').hide();
        }
        
        if(email.match(mailformat))
		{
			$('#invalidemail').hide();
		}
        
        if(!(typeof(mobile)=='NaN'||mobile.length!=10))
        {
            $('#invalidmob').hide();
        }
 
        if(!(password.length<8))
		{
			$('#invalidpass').hide();
		}
}

$(Document).ready(function () {
    $('#btn').click(function () {
        //alert("I'm Working!");  
        if(validateForm()){
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
        }
    });
});
