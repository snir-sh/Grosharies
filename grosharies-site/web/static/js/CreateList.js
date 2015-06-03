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
	var dom = document.getElementById('box');
	var i = list.length-1;
	dom.insertAdjacentHTML('beforeend','<td>'+ list[i][0] + '</td>' + '<td>' +list[i][1] + '</td>'
	+'<td><button onclick=deleteFromList('+i+')>delete</button></td></p>');
	//$('#box').val($('#box').val()+user_name +"\t" +user_permit + "\n");
	
}

function deleteFromList(index) {
	list.splice(index,1);
	var dom = document.getElementById('box');
	$("#box").empty();
	dom.insertAdjacentHTML('beforeend','<col width="300px" /><col width="130px" /><col width="30px" /><tr><td><h3>Username</h3></td><td><h3>User Permit</h3></td> </tr>');
	for (i = 0; i < list.length; ++i)
	{
		dom.insertAdjacentHTML('beforeend','<td>'+ list[i][0] + '</td>' + '<td>' +list[i][1] + '</td>'
		+'<td><button onclick=deleteFromList('+i+')>delete</button></td></p>');
	}
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
					$( "#allLists" ).empty();
					for (i = 0; i < data.length; ++i)
					{
						dom.insertAdjacentHTML('beforeend','<p><a href="list?lid=' + data[i][0] + '">' + data[i][1] + '<br/> </a></p>');
					}
					$( "#listName" ).val("");
					$("#box").empty();
					return;
				}
			},
			error:function(xhr, status, error) {
				console.error(xhr, status, error);
			}
			
		});					
							
	}


