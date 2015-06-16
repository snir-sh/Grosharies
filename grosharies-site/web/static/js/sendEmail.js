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
	alert("Thank you for contacting Grosharies!");
	
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
	