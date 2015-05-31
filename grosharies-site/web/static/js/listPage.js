$(document).ready(function(){	
	$('#group_name').on('click', ShowLists);
	$('#removeUserFromGroup').on('click', removeUserFromGroup)
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
	
function removeUserFromGroup(gid) {
	var group_id = gid;
	var userName = $('#userSelect').val();
	
	
	alert(user.email);
}















