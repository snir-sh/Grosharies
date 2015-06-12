$(document).ready(function(){		
	$('#addUserToList').on('click', addUserToList);
	$('#submit_list').on('click',submitList);
});

var list = [];
function addUserToList() {
	var user_name = $('#drop_usersList').val();
	var user_permit = $('#userPermit').val();
	
	if (user_name == "")
	{
		swal("Missing User!", "please enter the user you want to add to the list", "info");
		return;
	}
	
	nameAndPermit = [];
	for(i=0;i<list.length;i++)
	{
		if(list[i][0]==user_name)
		{
			swal("User Exists!", user_name + " is already exists in list", "info");
			return;
		}
	}
	nameAndPermit.push(user_name);
	nameAndPermit.push(user_permit);
	list.push(nameAndPermit);
	var dom = document.getElementById('box');
	var i = list.length-1;
	dom.insertAdjacentHTML('beforeend','<td>'+ list[i][0] + '</td>' + '<td>' +list[i][1] + '</td>'
	+'<td><img src="../static/images/deleteButton.png" onclick=deleteFromList('+i+') valign="bottom"></td></p>')
	
	$( "#drop_usersList" ).val("");
	$( "#userPermit" ).val("Viewer");
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
			+'<td><img src="../static/images/deleteButton.png" onclick=deleteFromList('+i+') valign="bottom"></td></p>')
	}
}

function submitList() {
	var list_name = $('#listName').val();
	if(list_name=="")
	{
		swal("Missing List Name!", "please enter a name for your list", "info");
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
					swal("List Exists!", data.name + " is already exists in this group", "info");
					return;
				}
				else
				{	
					if (data == null)
						return;
					var dom = document.getElementById('allLists');
					var lid = data[1];
					var names = data[0];
					$( "#allLists" ).empty();
					for (i = 0; i < names.length; ++i)
					{
						dom.insertAdjacentHTML('beforeend','<p><a href="list?lid=' + names[i][0] + '">' + names[i][1] + '<br/> </a></p>');
					}
					$( "#listName" ).val("");
					if (lid != null)
						window.location.replace("list?lid="+lid);
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


