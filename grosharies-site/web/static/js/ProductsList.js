$(document).ready(function(){		
	$.ajax({
		url:'/productsList',
		type:'GET',
		dataType:'json',
			success:function(data, status, xhr) {
				if (data.status == "error")
					return;
				var list_name = data[0];
				var listProducts = data[1];
				if(listProducts != null)	
				{
					var dom = document.getElementById('product_table');
					for(i=0 ; i<listProducts.length; ++i)
					{
						dom.insertAdjacentHTML('beforeend','<tr><td>'+ listProducts[i][0] +'</td><td>'+ listProducts[i][1] +'</td><td>'+ listProducts[i][2] +'</td></tr>');
					}
				}				
			},
			error:function(xhr, status, error) {
				console.error(xhr, status, error);
			}
			
		});				
	
	
});

