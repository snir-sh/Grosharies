$(document).ready(function() {
  $.ajaxSetup({ cache: true });
  $('#facebookLogin').on('click', loginFacebook);
  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '1634735740089355',
      version: 'v2.3' // or v2.0, v2.1, v2.0
    });     
    $('#loginbutton,#feedbutton').removeAttr('disabled');
    FB.getLoginStatus(updateStatusCallback);
  });
});
  
function loginFacebook() {
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			connected();
		}
		else {
			FB.login(function(response) {
				if (response.authResponse) {
					connected();
				} else {
					console.log('User cancelled login or did not fully authorize.');
				}
			}, {scope: 'email'});
		}
	});
};  

function connected() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name + ' ' + response.email);
	  var email = response.email;
	  $.ajax({
		url:'/',
		type:'GET',
		dataType:'text',
        data:{email:email},
		success:function(data, status, xhr) {
            window.location.replace("/index");
		},
		error:function(xhr, status, error) {
            alert(xhr.responseText);
			console.error(xhr, status, error);
		}
	});
    });
}