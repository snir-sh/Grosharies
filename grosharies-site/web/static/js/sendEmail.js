$(document).ready(function(){	
	$('#inviteUser').on('click', sendInvintation);
});

function send() {
	$.ajax({
	  type: 'POST',
	  url: 'https://mandrillapp.com/api/1.0/messages/send.json',
	  data: {
		'key': 'ELifZve5ZJbKw3Sc2Pik7Q',
		'message': {
		  'from_email': 'sshilderman@gmail.com',
		  'to': [
			  {
				'email': 'sshilderman@gmail.com',
				'name': '',
				'type': 'to'
			  }
			],
		  'autotext': 'true',
		  'subject': 'Grosharies: Contact Us',
		  'html': 'Hello, this is my message body!'
		}
	  }
	});
	reply();
}

function reply() {
	swal("Thank you for contacting Grosharies!");
	
	$.ajax({
	  type: 'POST',
	  url: 'https://mandrillapp.com/api/1.0/messages/send.json',
	  data: {
		'key': 'ELifZve5ZJbKw3Sc2Pik7Q',
		'message': {
		  'from_email': 'groshariesteam@gmail.com',
		  'to': [
			  {
				'email': 'sshilderman@gmail.com',
				'name': '',
				'type': 'to'
			  }
			],
		  'autotext': 'true',
		  'subject': 'Thank you for contacting Grosharies!',
		  'html': 'Thank you for your reply. Grosharies takes every reply and notes seriously.'
		}
	  }
	});
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