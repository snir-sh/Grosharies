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
  render();
});

function render() {

   // Additional params including the callback, the rest of the params will
   // come from the page-level configuration.
   var additionalParams = {
     'callback': signinCallback
   };

   // Attach a click listener to a button to trigger the flow.
   var signinButton = document.getElementById('googleLogin');
   signinButton.addEventListener('click', function() {
     gapi.auth.signIn(additionalParams); // Will use page level configuration
   });
}

function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    gapi.client.load('plus','v1', function(){
	var request = gapi.client.plus.people.get({
		'userId': 'me'
		});
		request.execute(function(resp) {
			console.log('Retrieved profile for:' + resp.emails[0].value);
			var email = resp.emails[0].value;
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
	});

  } else {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
  }
}

  
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