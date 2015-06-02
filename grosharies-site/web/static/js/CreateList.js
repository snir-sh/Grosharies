$(document).ready(function(){		
	$('#addUserToList').on('click', createList);
	$('#submit_list').on('click',submitList);
});

var list = [];
function createList() {
	var user_name = $('#drop_usersList').val();
	var user_permit = $('#userPermit').val();
	
	nameAndPermit = [];
	for(i=0;i<list.length;i++)
	{
		if(list[i][0]==user_name)
		{
			alert('User Already Selected!');
			return;
		}
	}
	nameAndPermit.push(user_name);
	nameAndPermit.push(user_permit);
	list.push(nameAndPermit);					
	$('#box').val($('#box').val()+user_name +"\t" +user_permit + "\n");
}

function submitList() {
	var list_name = $('#listName').val();
	if(list_name=="")
	{
		alert('Please enter list name');
		return;
	}
	
	list = JSON.stringify(list);
	$.ajax({
		url:'/newList',
		type:'GET',
		dataType:'json',
			data:{new_list_name:list_name,list_usersToAdd:list},
			success:function(data, status, xhr) {
				if (data.status == "created")
					alert('Success!');
				if (data.status == "exist")
					alert(data.name + ' Already Exists in Group');
			},
			error:function(xhr, status, error) {
				console.error(xhr, status, error);
			}
			
		});					
							
	}


