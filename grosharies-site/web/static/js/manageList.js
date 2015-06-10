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
				autoFocus: true,
				messages: {
					noResults: '',
					results: function() {}
				}
			});
		},
		error:function(xhr, status, error) {
				alert(status);
				console.error(xhr, status, error);
		}
	});
}
	
function removeUserFromList() {
	var username = $('#userSelect').val();
	if (username=="") {
		alert('Select a user to remove');
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
				alert(status);
				console.error(xhr, status, error);
		}
	});
}

function addUserToList() {
	var userName = $('#userToAdd').val();
	var permit = $('#userPermit').val();
	if (userName==null || userName=="")
	{
		alert('Enter username to add');
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
				alert(data.name + ' Already Exists in List!');
				return;
			}
			else if (data.status == "notUser")
			{
				alert(data.name + ' Not a Valid User!');
				return;
			}
			else
			{	
				listUsersAJAX(data);
				drpListUsersAJAX(data);
			}
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
		url:'/manageList',
		type:'GET',
		dataType:'json',
		data:{newListName:newListName},
		success:function(data, status, xhr) {
			if (data.status == "exist")
			{
				alert(data.name + ' Already Exists in Group!');
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
		url:'/manageList',
		type:'GET',
		dataType:'text',
		data:{confirmDeletion:confirmDeletion},
		success:function(data, status, xhr) {
			if (data == "statusDeleted")
				window.location.replace("/index");
		},
		error:function(xhr, status, error) {
				alert(status);
				console.error(xhr, status, error);
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







