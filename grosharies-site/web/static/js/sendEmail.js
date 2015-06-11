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
	alert("reply");
}
	