$(function(){	
	$('#createGroupButton').on('click', createGroup);
	$('#addUserToList').on('click', addUserToTextArea);
});

var users = [];
function createGroup() {
	var group_name = $('#GroupName_id').val();
	var usersToAdd = JSON.stringify(users);
	
	$.ajax({
		url:'/createGroup',
		type:'GET',
		dataType:'json',
			data:{GroupName_id:group_name, Users:usersToAdd},
			success:function(data, status, xhr) {				
			},
			error:function(xhr, status, error) {
				console.error(xhr, status, error);
			}			
		});	
	
	
							
	}
	
function addUserToTextArea(){
	var exist = 0;
	var addUser = $('#combobox').val();
	var i;
	for (i=0; i<users.length; i++)
		if (addUser == users[i])
		{
			alert("User already exist!");
			exist = 1;
		}
	if (exist == 0)
	{
		$('#users_list').val($('#users_list').val()+addUser+'\n');
		users.push(addUser);
	}
}