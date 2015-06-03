$( document ).ready(function() {
	$.ajax({
		url:'/getAllGroups',
		type:'GET',
		dataType:'json',
			success:function(data, status, xhr) {
				if (data.status == 'failed')
				{
					return;
				}
				var dom = document.getElementById('allGroups');
				for (i = 0; i < data.length; ++i)
				{
					dom.insertAdjacentHTML('beforeend','<p><a href="listPage?gid=' + data[i][0] + '">' + data[i][1] + '<br/> </a></p>');
				}
			},
			error:function(xhr, status, error) {
				console.error(xhr, status, error);
			}			
		});							
	}
);