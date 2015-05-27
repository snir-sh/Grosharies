$(function(){	
	$('#createGroupButton').on('click', createGroup);
});

function createGroup() {
	var group_name = $('#GroupName_id').val();
	$.ajax({
		url:'/createGroup',
		type:'GET',
		dataType:'text',
			data:{GroupName_id:group_name},
			success:function(data, status, xhr) {
				location.reload();
			},
			error:function(xhr, status, error) {
				console.error(xhr, status, error);
			}
			
		});					
							
	}