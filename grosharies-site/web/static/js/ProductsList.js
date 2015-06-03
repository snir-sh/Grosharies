$(document).ready(function(){		
	$.ajax({
		url:'/productsList',
		type:'GET',
		dataType:'json',
			success:function(data, status, xhr) {
				if (data.status == "error")
					return;
				var list_name = data[0];
				listProducts = data[1];
				var user_permit =data[2];
				if(listProducts != null)	
				{
					var dom = document.getElementById('product_table');
					dom.insertAdjacentHTML('beforeend','<tr>'
					+'<th>Product</th>'
					+'<th>Quantity</th>'
					+'<th>Units</th>'
					+'<td></td>'
					+'<td></td></tr>');
					for(i=0 ; i<listProducts.length; ++i)
					{
						if(user_permit!='Viewer')
							dom.insertAdjacentHTML('beforeend','<tr><th>'+ listProducts[i][0] +'</th><th>'+ listProducts[i][1] +'</th><th>'+ listProducts[i][2] +'</th>'
								+ '<td><button onclick=deleteProduct('+i+')>delete</button></td><td><button onclick=editProduct('+i+')>edit</td></tr>');
						else
							dom.insertAdjacentHTML('beforeend','<tr><th>'+ listProducts[i][0] +'</th><th>'+ listProducts[i][1] +'</th><th>'+ listProducts[i][2] +'</th></tr><td></td><td></td>');
					}
				}				
			},
			error:function(xhr, status, error) {
				console.error(xhr, status, error);
			}
			
		});				
	
	
});
var listProducts;
function deleteProduct(index) {
	listProducts.splice(index,1);
	var dom = document.getElementById('product_table');
	$("#product_table").empty();
	dom.insertAdjacentHTML('beforeend','<tr>'
					+'<th>Product</th>'
					+'<th>Quantity</th>'
					+'<th>Units</th>'
					+'<td></td>'
					+'<td></td>');
	for (i = 0; i < listProducts.length; ++i)
	{
		dom.insertAdjacentHTML('beforeend','<tr><th>'+ listProducts[i][0] +'</th><th>'+ listProducts[i][1] +'</th><th>'+ listProducts[i][2] +'</th><td><button onclick=deleteProduct('+i+')>delete</button></td>'
						+'<td><button onclick=editProduct('+i+')>edit</td></tr>');
	}
}

function editProduct(index) {
	var dom = document.getElementById('product_table');
	$("#product_table").empty();
	$("#product_table").attr("contenteditable", true);
	dom.insertAdjacentHTML('beforeend','<tr>'
					+'<th>Product</th>'
					+'<th>Quantity</th>'
					+'<th>Units</th>'
					+'<td></td>'
					+'<td></td>');
	for (i = 0; i < listProducts.length; ++i)
	{
		dom.insertAdjacentHTML('beforeend','<tr><th>'+ listProducts[i][0] +'</th><th>'+ listProducts[i][1] +'</th><th>'+ listProducts[i][2] +'</th><td><button onclick=deleteProduct('+i+')>delete</button></td>'
						+'<td><button onclick=saveProduct('+i+')>save</td></tr>');
	}
}

