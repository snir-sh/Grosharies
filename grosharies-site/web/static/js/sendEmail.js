function send() {
	alert("hhhh");	
	
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
				'name': 'from web',
				'type': 'to'
			  }
			],
		  'autotext': 'true',
		  'subject': 'YOUR SUBJECT HERE!',
		  'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
		}
	  }
	}).done(function(response) {
		console.log(response); // if you're into that sorta thing
	});
}

	