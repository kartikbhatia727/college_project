function validateForm()
	{
		var name=document.forms["#myForm"]["#name"].value;
		var email=document.forms["#myForm"]["#email"].value; 
		var phone=document.forms["#myForm"]["#mob"].value;
		var password=document.forms["#myForm"]["#pass"].value; 
		//var cpassword=document.forms["myForm"]["cpassword"].value;
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;		
		
		if(password.length<8)
		{
			alert("Your password must be at least 8 characters long. Please try another.");
			return false;
		} 
		if(!email.match(mailformat))
		{
			alert("Incorrect email id");
			return false;
		}
		/*if (password == cpassword)
		{
			return true;
		}*/ 
		else
		{
			alert("Your password and confirm password do not match. Please try again.");
			return false;
		} 
		
	}