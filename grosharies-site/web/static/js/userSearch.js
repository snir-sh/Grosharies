  $(function() {
	
	$.ajax({
		url:'/showUsers',
		type:'GET',
		dataType:'json',
			success:function(data, status, xhr) {
				if (data.status == "error")
					return;
				createComboList(data);
			},
			error:function(xhr, status, error) {
				console.error(xhr, status, error);				
			}			
		});			
  });
   
  function createComboList(data) {
	  $( "#selectUser" ).autocomplete({
      source: data
    });
  };
	  