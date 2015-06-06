$(document).ready(function(){	
	$('#group_name').on('click', ShowLists);
	$('#removeUserFromGroup').on('click', removeUserFromGroup);
	$('#addUserToGroup').on('click', addUserToGroup);
	$('#changeGroupName').on('click', changeGroupName);
	$('#deleteGroupButton').on('click', deleteGroup);
});

function ShowLists(gid) {
	var group_id = gid;
	$.ajax({
		url:'/listPage',
		type:'GET',
		dataType:'text',
		data:{group_id:group_id},
		success:function(data, status, xhr) {
			alert(data);
			alert(status);

		},
		error:function(xhr, status, error) {
				alert(status);
				console.error(xhr, status, error);
		}	
	});										
}
	
function removeUserFromGroup() {
	var userName = $('#userSelect').val();
	if (userName==null || userName=="") {
		alert('Select a user to remove');
		return;
	}
	$.ajax({
		url:'/listPage',
		type:'GET',
		dataType:'text',
		data:{deleteUser:userName},
		success:function(data, status, xhr) {
			alert('User removed successfully');
		},
		error:function(xhr, status, error) {
				alert(status);
				console.error(xhr, status, error);
		}
	});
}

function addUserToGroup() {
	var userName = $('#userToAdd').val();
	if (userName==null || userName=="")
	{
		alert('Enter username to add');
		return;
	}
	$.ajax({
		url:'/listPage',
		type:'GET',
		dataType:'text',
		data:{addUser:userName},
		success:function(data, status, xhr) {
			if (data == 'userNotExist')
				alert('User doesn\'t exist');
			else if (data == 'userExist')
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

function changeGroupName() {
	var newGroupName = $('#newNameForGroup').val();
	if (newGroupName==null || newGroupName=="")
	{
		alert('Enter a name');
		return;
	}
	$.ajax({
		url:'/listPage',
		type:'GET',
		dataType:'text',
		data:{newGroupName:newGroupName},
		success:function(data, status, xhr) {
			alert('Name changed successfully');
		},
		error:function(xhr, status, error) {
				alert(status);
				console.error(xhr, status, error);
		}
	});
}

function deleteGroup() {
		if (confirm('Are you sure you want to delete this group?')) {
			confirmDeletion="yes";
		} 
		else {
			return;
		}
		$.ajax({
		url:'/listPage',
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







