$(document).ready(function(){	
	$('#removeUserFromList').on('click', removeUserFromList);
	$('#addUserToList').on('click', addUserToList);
	$('#changeListName').on('click', changeListName);
	$('#deleteListButton').on('click', deleteList);
	fillUsers();
});

function fillUsers() {
	$.ajax({
		url:'/manageList',
		type:'GET',
		dataType:'json',
		data:{'fillUsers':'true'},
		success:function(data, status, xhr) {
			var users = [];
			for (i = 0; i < data.length; ++i)
				users.push(data[i]);
			$( "#userToAdd" ).autocomplete({
				source: users,
				minLength: 2,
				autoFocus: true
			})
			.data('ui-autocomplete')._renderItem = function( ul, item ) {
				return $( "<div> </div>" )
				.data( "ui-autocomplete-item", item )
				.append( '<div style=\'background-color: white;width: 180px;\'><span style=\'color:black;\'>' + item.label + '</span></div>' )
				.appendTo( ul );
			};
		},
		error:function(xhr, status, error) {
				alert(status);
				console.error(xhr, status, error);
		}
	});
}
	
function removeUserFromList() {
	var userName = $('#userSelect').val();
	if (userName==null || userName=="") {
		alert('Select a user to remove');
		return;
	}
	$.ajax({
		url:'/listDetails',
		type:'GET',
		dataType:'text',
		data:{'deleteUser':userName},
		success:function(data, status, xhr) {
			alert('User removed successfully');
		},
		error:function(xhr, status, error) {
				alert(status);
				console.error(xhr, status, error);
		}
	});
}

function addUserToList() {
	var userName = $('#userToAdd').val();
	if (userName==null || userName=="")
	{
		alert('Enter username to add');
		return;
	}
	$.ajax({
		url:'/listDetails',
		type:'GET',
		dataType:'text',
		data:{addUser:userName},
		success:function(data, status, xhr) {
			if (data == 'userExist')
				alert('User already in group');
			else
				alert('User added successfully');
		},
		error:function(xhr, status, error) {
				alert(status);
				console.error(xhr, status, error);
		}
	});
}

function changeListName() {
	var newListName = $('#newNameForList').val();
	if (newListName==null || newListName=="")
	{
		alert('Enter a name');
		return;
	}
	$.ajax({
		url:'/listDetails',
		type:'GET',
		dataType:'text',
		data:{newListName:newListName},
		success:function(data, status, xhr) {
			alert('Name changed successfully');
		},
		error:function(xhr, status, error) {
				alert(status);
				console.error(xhr, status, error);
		}
	});
}

function deleteList() {
		if (confirm('Are you sure you want to delete this list?')) {
			confirmDeletion="yes";
		} 
		else {
			return;
		}
		$.ajax({
		url:'/listDetails',
		type:'GET',
		dataType:'text',
		data:{confirmDeletion:confirmDeletion},
		success:function(data, status, xhr) {
			if (data == "statusDeleted")
				alert('dsds');
				window.location = "/index";
		},
		error:function(xhr, status, error) {
				alert(status);
				console.error(xhr, status, error);
		}
	});
}







