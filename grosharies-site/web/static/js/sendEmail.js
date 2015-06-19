function send() {
	var name = $("#name").val();
	var email = $("#email").val();
	var subject = $("#subject").val();
	var content = $("#details").val();
	
	$.ajax({
	  type: 'POST',
	  url: 'https://mandrillapp.com/api/1.0/messages/send.json',
	  data: {
		'key': 'ELifZve5ZJbKw3Sc2Pik7Q',
		'message': {
		'from_email': 'groshariesteam@gmail.com',
		  'to': [
			  {
				'email': 'groshariesteam@gmail.com',
				'name': '<No Reply>',
				'type': 'to'
			  }
			],
		  'autotext': 'true',
		  'subject': 'Grosharies: Contact Information',
		  'html': 'Person contact name: ' + name + '<br><br>Email: ' + email + '<br><br>Subject: ' + subject + '<br><br>Content: ' + content
		}
	  }
	});
	reply();
}

function reply() {
	var email = $("#email").val();
	$.ajax({
	  type: 'POST',
	  url: 'https://mandrillapp.com/api/1.0/messages/send.json',
	  data: {
		'key': 'ELifZve5ZJbKw3Sc2Pik7Q',
		'message': {
		  'from_email': 'groshariesteam@gmail.com',
		  'to': [
			  {
				'email': email,
				'name': '',
				'type': 'to'
			  }
			],
		  'autotext': 'true',
		  'subject': 'Thank you for contacting Grosharies!',
		  'html': 'Thank you for your reply. We are dedicated to the success of Grosharies and happy to hear of any issues or suggestions for our site.'
		}
	  }
	});
	swal("Thank you for contacting Grosharies!");
}

function sendInvintation() {
	var email = $('#userToInvite').val();
	var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!filter.test(email)) {
		swal('Please provide a valid email address');
		email.focus;
		return;
	}
	$("#userToInvite").val("");
	
	$.ajax({
		type: 'POST',
		url: 'https://mandrillapp.com/api/1.0/messages/send.json',
		data: 
		{
			'key': 'ELifZve5ZJbKw3Sc2Pik7Q',
			'message': 
			{
			  'from_email': 'groshariesteam@gmail.com',
			  'to': [
				  {
					'email': email,
					'name': '',
					'type': 'to'
				  }
				],
			  'autotext': 'true',
			  'subject': 'A friend just invited you to Grosharies!',
			  'html': 'Hi! one of your friends just invited you to join Grosharies, the web that helps you manage your groceries!<br>To enter our site, please <a href="http://grosharies-site.appspot.com/index">click here.</a>'
			}
		}
	});
	
	swal("Invitation Sent!");
}