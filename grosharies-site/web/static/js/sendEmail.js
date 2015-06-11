function send() {
	alert("hhhh");	
	
	$.ajax({
	  type: 'POST',
	  url: 'https://mandrillapp.com/api/1.0/messages/send.json',
	  data: {
		'key': 'ELifZve5ZJbKw3Sc2Pik7Q',
		'message': {
		  'from_email': 'contactus',
		  'to': [
			  {
				'email': 'sshilderman@gmail.com',
				'name': '',
				'type': 'to'
			  }
			],
		  'autotext': 'true',
		  'subject': 'Grosharies: Contact Us',
		  'html': 'Hello, this is my message body'
		}
	  }
	}).done(function(response) {
		console.log(response); // if you're into that sorta thing
	});
}

	