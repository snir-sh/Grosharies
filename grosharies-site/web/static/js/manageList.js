$(document).ready(function(){	
	$('#removeUserFromList').on('click', removeUserFromList);
	$('#addUserToList').on('click', addUserToList);
	$('#changeListName').on('click', changeListName);
	$('#deleteListButton').on('click', deleteList);
	$('#leaveListButton').on('click', leaveList);
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
	
function removeUserFromList() {
	var username = $('#userSelect').val();
	if (username=="") {
		swal("Choose User!", "please select the user you want to remove from the list", "info");
		return;
	}
	$.ajax({
		url:'/manageList',
		type:'GET',
		dataType:'json',
		data:{'removeUser':username},
		success:function(data, status, xhr) {
			var dom = document.getElementById('userSelect');
			if (data.status == 'empty')
			{
				$( "#userSelect" ).empty();
				dom.insertAdjacentHTML('beforeend','<option value="" style="display:none;">Select user...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>');
				listUsersAJAX(data);
			}
			else
			{
				listUsersAJAX(data);
				drpListUsersAJAX(data);
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

function addUserToList() {
	var userName = $('#userToAdd').val();
	var permit = $('#userPermit').val();
	if (userName==null || userName=="")
	{
		swal("Missing Username!", "please enter a valid user email", "info");
		return;
	}
	$.ajax({
		url:'/manageList',
		type:'GET',
		dataType:'json',
		data:{addUser:userName, permit:permit},
		success:function(data, status, xhr) {
			if (data.status == "exist")
			{
				swal("User Exists!", data.name + " is already exists in list", "info");
				return;
			}
			else if (data.status == "notUser")
			{
				swal("User Don't Exists!", data.name + " is not a vaild user in this group", "info");
				return;
			}
			else
			{	
				listUsersAJAX(data);
				drpListUsersAJAX(data);
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

function changeListName() {
	var newListName = $('#newNameForList').val();
	if (newListName==null || newListName=="")
	{
		swal("Missing List Name!", "please enter a new name for your list", "info");
		return;
	}
	$.ajax({
		url:'/manageList',
		type:'GET',
		dataType:'json',
		data:{newListName:newListName},
		success:function(data, status, xhr) {
			if (data.status == "exist")
			{
				swal("List Exists!", data.name + " is already exists in this group", "info");
				return;
			}
			else
			{	
				if (data == null)
					return;
				var dom = document.getElementById('allLists');
				var names = data[0];
				$( "#allLists" ).empty();
				for (i = 0; i < names.length; ++i)
				{
					dom.insertAdjacentHTML('beforeend','<p><a href="list?lid=' + names[i][0] + '">' + names[i][1] + '<br/> </a></p>');
				}
				$( "#newNameForList" ).val("");
				var dom2 = document.getElementById('listName');
				$( "#listName" ).empty();
				dom2.insertAdjacentHTML('beforeend','<li>Name:   ' + data[1] + '</li>');
				return;
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

function deleteList() {
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
				url:'/listDetails',
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

function listUsersAJAX(data)
{
	if (data == null)
		return;
	var dom = document.getElementById('listUsers');
	$( "#listUsers" ).empty();
	dom.insertAdjacentHTML('beforeend', '<table id ="box" style="table-layout:fixed;color:white;" border="0px"><col width="230px" /><col width="130px" />');
	for (i = 0; i < data.length; ++i)
	{
		dom.insertAdjacentHTML('beforeend','<tr><td>'+data[i][0]+'</td> <td>'+data[i][1]+'</td></br></tr>');
	}
	$( "#userToAdd" ).val("");
	return;
}

function drpListUsersAJAX(data)
{
	if (data == null)
		return;
	$( "#userSelect" ).empty();
	var dom2 = document.getElementById('userSelect');
	dom2.insertAdjacentHTML('beforeend','<option value="" style="display:none;">Select user...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>');
	for (i = 0; i < data.length; ++i)
	{
		dom2.insertAdjacentHTML('beforeend','<option value='+data[i][0]+'>'+data[i][0]+'</option>');
	}
	return;
}

function leaveList() {
	$.ajax({
		url:'/manageList',
		type:'GET',
		dataType:'json',
		data:{'leaveList':'leaveList'},
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






