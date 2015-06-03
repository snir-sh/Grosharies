$(function(){	
	$('#createGroupButton').on('click', createGroup);
	$('#addUserToList').on('click', addUser);
});

var users = [];
function createGroup() {
	var group_name = $('#GroupName_id').val();
	var usersToAdd = JSON.stringify(users);
	if (group_name =="")
	{
		alert("Please enter group name");
		return;
	}
	
	$.ajax({
		url:'/newGroup',
		type:'GET',
		dataType:'json',
			data:{GroupName_id:group_name, Users:usersToAdd},
			success:function(data, status, xhr) {
				
				if (data.status == 'exists')
				{
					alert('Exist!');
					return;
				}
				else
				{
					if (data == null)
						return;
					var dom = document.getElementById('allGroups');
					$( "#allGroups" ).empty();
					for (i = 0; i < data.length; ++i)
					{
						dom.insertAdjacentHTML('beforeend','<p><a href="listPage?gid=' + data[i][0] + '">' + data[i][1] + '<br/> </a></p>');
					}
					$( "#GroupName_id" ).val("");
					$("#users_list").empty();
					return;
				}
			},
			error:function(xhr, status, error) {
				console.error(xhr, status, error);
			}			
		});							
	}
	
function addUser(){
	var exist = 0;
	var addUser = $('#combobox').val();
	var i;
	for (i=0; i<users.length; i++)
		if (addUser == users[i])
		{
			alert("User already exist");
			exist = 1;
		}
	if (exist == 0)
	{
		$('#users_list').val($('#users_list').val()+addUser+'\n');
		users.push(addUser);
	}
}