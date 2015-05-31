$(document).ready(function(){		
	$('#addUserToGroup').on('click', createList);
	$('#submit_list').on('click',submitList);
});

var list = [];
function createList() {
	var user_name = $('#drop_usersList').val();
	var user_permit = $('#userPermit').val();
	alert(user_name);
	var bool = 1;
	nameAndPermit =[];
	for(i=0;i<list.length;i++)
	{
		if(list[i][0]==user_name)
			bool = 0;
	}
	if (bool==1)
	{
		nameAndPermit.push(user_name);
		nameAndPermit.push(user_permit);
		list.push(nameAndPermit);							
		$('#box').val($('#box').val()+user_name +"\t" +user_permit + "\n");
	}
}

function submitList() {
	var list_name = $('#listName').val();
	if(list_name=="")
		return;
	alert(list_name);
	$.ajax({
		url:'/listPage',
		type:'GET',
		dataType:'text',
			data:{new_list_name:list_name,list_usersToAdd:list},
			success:function(data, status, xhr) {
				window.location.replace("/listPage");
			},
			error:function(xhr, status, error) {
				console.error(xhr, status, error);
			}
			
		});					
							
	}





