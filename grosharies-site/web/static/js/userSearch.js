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
				swal({
					title: "Error!",
					text: "Something Went Wrong!",
					type: "error",
					confirmButtonText: "OK"
				});
				console.error(xhr, status, error);				
			}			
		});			
  });
   
  function createComboList(data) {
	  $( "#selectUser" ).autocomplete({
		source: data,
		minLength: 2,
		autoFocus: true,
		messages: {
			noResults: '',
			results: function() {}
		}
    });
  };
	  