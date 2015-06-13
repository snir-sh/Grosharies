$(document).ready(function(){	
	$('#homeHelp').on('click', homeHelp);
	$('#addUserToList').on('click', addUserToList);
	$('#changeListName').on('click', changeListName);
	$('#deleteListButton').on('click', deleteList);
	$('#leaveListButton').on('click', leaveList);
});

function homeHelp() 
{
	swal({
		title: "Welcome!",
		text: "We are happy that you chose to use Grosharies! " +
		"To start, on the left side of the screen you can see the groups you are belong to, " + 
		"you can enter them by simply click on the name of the group. " + 
		"If you currently don't belong to any group, just create a new one and add your friends and family.",
		confirmButtonText: "OK"
	});
}