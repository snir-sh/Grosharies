$(document).ready(function(){	
	$('#group_name').on('click', ShowLists);
	$('#removeUserFromGroup').on('click', removeUserFromGroup)
	$('#addUserToGroup').on('click', addUserToGroup)
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













