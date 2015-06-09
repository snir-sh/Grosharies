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
	var userName = $('#userSelect').val();
	if (userName==null || userName=="") {
		alert('Select a user to remove');
		return;
	}
	$.ajax({
		url:'/manageList',
		type:'GET',
		dataType:'json',
		data:{'removeUser':userName},
		success:function(data, status, xhr) {
			alert(data.status);
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
				if (data == null)
					return;
				var dom = document.getElementById('listUsers');
				$( "#listUsers" ).empty();
				dom.insertAdjacentHTML('beforeend', '<table id ="box" style="table-layout:fixed;color:white;" border="0px"><col width="230px" /><col width="130px" />');
				for (i = 0; i < data.length; ++i)
				{
					dom.insertAdjacentHTML('beforeend','<tr><td>'+data[i][0]+'</td> <td>'+data[i][1]+'</td></br></tr>');
				}
				dom.insertAdjacentHTML('beforeend','</table>');
				$( "#userToAdd" ).val("");
				return;
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







