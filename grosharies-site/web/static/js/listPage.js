$(document).ready(function(){	
	$('#group_name').on('click', ShowLists);
	$('#removeUserFromGroup').on('click', removeUserFromGroup);
	$('#addUserToGroup').on('click', addUserToGroup);
	$('#changeGroupName').on('click', changeGroupName);
	$('#deleteGroupButton').on('click', deleteGroup);
	$('#leaveGroupButton').on('click', leaveGroup);
	fillUsers();
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
	
function removeUserFromGroup() 
{
	var userName = $('#userSelect').val();
	if (userName==null || userName=="") 
	{
		swal("Choose User!", "please select the user you want to remove from the group", "info");
		return;
	}
	$.ajax({
		url:'/manageGroup',
		type:'GET',
		dataType:'json',
		data:{deleteUser:userName},
		success:function(data, status, xhr) 
		{
			$("#group_members").empty();
			var dom = document.getElementById('group_members');
			for (i=0 ; i<data.length ; i++) 
			{
				dom.insertAdjacentHTML('beforeend','<li>'+data[i]+'</li>');
			}
			
			$("#userSelect").empty();
			var dom1 = document.getElementById('userSelect');
			dom1.insertAdjacentHTML('beforeend','<option value="" style="display:none;">Select user...</option>');
			for (i=0 ; i<data.length ; i++) 
			{
				dom1.insertAdjacentHTML('beforeend','<option value="'+data[i]+'">'+data[i]+'</option>');
			}
		},
		error:function(xhr, status, error) {
				swal({
					title: "Error!",
					text: "Something Went Wrong!",
					type: "error",
					confirmButtonText: "OK"
				});
				console.error(xhr, status, error);
		}
	});
}

function addUserToGroup() {
	var userName = $('#userToAdd').val();
	if (userName==null || userName=="")
	{
		swal("Missing Username!", "please enter a valid user email", "info");
		return;
	}
	$.ajax({
		url:'/manageGroup',
		type:'GET',
		dataType:'json',
		data:{addUser:userName},
		success:function(data, status, xhr) {
			$("#userToAdd").val("");
			if (data == 'userNotExist')
			{
				swal("User Don't Exists!", "please enter user email that is registered", "info");
				return;
			}
			else if (data == 'userExist')
			{
				swal("User Exists!", "user is already exists in group", "info");
				return;
			}
			else 
			{
				$("#group_members").empty();
				var dom = document.getElementById('group_members');
				dom.insertAdjacentHTML('beforeend','<ul>');
				for (i=0 ; i<data.length ; i++) 
				{
					dom.insertAdjacentHTML('beforeend','<li>'+data[i]+'</li>');
				}
				dom.insertAdjacentHTML('beforeend','</ul>');
				
				$("#userSelect").empty();
				var dom1 = document.getElementById('userSelect');
				dom1.insertAdjacentHTML('beforeend','<option value="" style="display:none;">Select user...</option>');
				for (i=0 ; i<data.length ; i++)
				{
					dom1.insertAdjacentHTML('beforeend','<option value="'+data[i]+'">'+data[i]+'</option>');
				}
			}
		},
		error:function(xhr, status, error) {
				swal({
					title: "Error!",
					text: "Something Went Wrong!",
					type: "error",
					confirmButtonText: "OK"
				});
				console.error(xhr, status, error);
		}
	});
}

function changeGroupName() 
{
	var newGroupName = $('#newNameForGroup').val();
	if (newGroupName==null || newGroupName=="")
	{
		swal("Missing Group Name!", "please enter a new name for your group", "info");
		return;
	}
	$.ajax({
		url:'/manageGroup',
		type:'GET',
		dataType:'json',
		data:{newGroupName:newGroupName},
		success:function(data, status, xhr) 
		{
			var groupName = data[0];
			var groupAdmin = data[1];
			var groupID = data[2];
			var groupsNames = data[3];
			
			$("#newNameForGroup").val("");
			$("#group_details").empty();
			var dom = document.getElementById('group_details');
			dom.insertAdjacentHTML('beforeend','<li>Name: '+groupName+'</li>')
			dom.insertAdjacentHTML('beforeend','<li>Admin: '+groupAdmin+'</li>')
			
			$("#current_user_groups").empty();
			var dom1 = document.getElementById('current_user_groups');
			dom1.insertAdjacentHTML('beforeend', '<h2>Groups</h2>')
			dom1.insertAdjacentHTML('beforeend','<a href="createGroup"><h3>Create Group</h3></a>')
			for (i=0 ; i<groupsNames.length ; i++)
				dom1.insertAdjacentHTML('beforeend','<p><a href="listPage?gid='+groupsNames[i][0] + '" id ='+groupsNames[i][0]+'>'+groupsNames[i][1]+'<br/> </a></p>')
		},
		error:function(xhr, status, error) {
				swal({
					title: "Error!",
					text: "Something Went Wrong!",
					type: "error",
					confirmButtonText: "OK"
				});
				console.error(xhr, status, error);
		}
	});
}

function deleteGroup() {
		swal({
			title: "Are you sure?",
			text: "You will not be able to recover this list!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "No, cancel!",
		},
		function(isConfirm){
			if (isConfirm) {
				var confirmDeletion = "yes";
				$.ajax({
					url:'/listPage',
					type:'GET',
					dataType:'text',
					data:{confirmDeletion:confirmDeletion},
					success:function(data, status, xhr) {
						window.location.replace("/index");
					},
					error:function(xhr, status, error) {
							swal({
								title: "Error!",
								text: "Something Went Wrong!",
								type: "error",
								confirmButtonText: "OK"
							});
							console.error(xhr, status, error);
					}
				});
			} 
			else {
				return;
			}
		});
}


function fillUsers() {
	$.ajax({
		url:'/manageGroup',
		type:'GET',
		dataType:'json',
		data:{'fillUsers':'true'},
		success:function(data, status, xhr) 
		{
			var users = [];
			for (i = 0; i < data.length; ++i)
				users.push(data[i]);
			$("#userToAdd").autocomplete({
				source: users,
				minLength: 2,
				autoFocus: true,
				messages: {
					noResults: '',
					results: function() {}
				}
			});
		},
		error:function(xhr, status, error) {
				swal({
					title: "Error!",
					text: "Something Went Wrong!",
					type: "error",
					confirmButtonText: "OK"
				});
				console.error(xhr, status, error);
		}
	});
}


function leaveGroup() {
	$.ajax({
		url:'/manageGroup',
		type:'GET',
		dataType:'json',
		data:{'leaveGroup':'leaveGroup'},
		success:function(data, status, xhr) {
			window.location = "/index";
		},
		error:function(xhr, status, error) {
			swal({
				title: "Error!",
				text: "Something Went Wrong!",
				type: "error",
				confirmButtonText: "OK"
			});
			console.error(xhr, status, error);
		}	
	});					
}



