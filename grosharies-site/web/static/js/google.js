$(document).ready(function() {
	$('#googleLogin').on('click', loginGoogle);
});

function loginGoogle() {
	console.log('Test.............');
	document.location.href = '/googleLogin';
	
};