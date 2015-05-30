$(document).ready(function(){	
	$('#group_name').on('click', ShowLists);
});

function ShowLists() {
	var group_name =  $(this).attr('name');
	$.ajax({
		url:'/listPage',
		type:'GET',
		dataType:'text',
			data:{group_name:group_name},
			success:function(data, status, xhr) {

			},
			error:function(xhr, status, error) {
				console.error(xhr, status, error);
			}
			
		});					
							
	}