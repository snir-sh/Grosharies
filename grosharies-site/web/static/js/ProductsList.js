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
				user_permit =data[2];
				showProducts(listProducts,user_permit);			
			},
			error:function(xhr, status, error) {
				console.error(xhr, status, error);
			}
			
		});				
	
	
});
var listProducts;
var user_permit;
function deleteProduct(index) {
	pid = listProducts[index][3];
	$.ajax({
		url:'/productsList',
		type:'GET',
		dataType:'json',
			data:{pid:pid},
			success:function(data, status, xhr) {
				if (data.status == "error")
					return;
				else
				{
					listProducts.splice(index,1);
					showProducts(listProducts,user_permit);
				}
			},
			error:function(xhr, status, error) {
				console.error(xhr, status, error);
			}
			
		});	
	
}
function changeProduct(index)
{
	pid = listProducts[index][3];
	var p_name = $("#Pname").val();
	var p_quantity = $("#Pquantity").val();
	var p_units = $("#Punits").val();
	if(p_name== "") 
	{
		alert("please enter product name");
		return;
	}
	if(p_quantity=="")
	{
		alert("please enter quantity");
		return;
	}
	if(p_units=="")
	{
		alert("please enter units");
		return;
	}
	$.ajax({
		url:'/productsList',
		type:'GET',
		dataType:'json',
			data:{p_name:p_name,p_quantity:p_quantity,p_units:p_units,pid:pid},
			success:function(data, status, xhr) {
				if (data.status == "error")
					return;
				if(data.status == "exists")
				{
					alert(p_name + ' Already Exists in the List!');
					return;
				}
				else
				{
					listProducts.splice(index,1);
					showProducts(listProducts,user_permit);
				}
			},
			error:function(xhr, status, error) {
				console.error(xhr, status, error);
			}
			
		});	
	
	
}




function editProduct(index) {
	var id = "#Panme" +index;
	var id ="tr" + index;
	var str ='<select id="New_Product_quantity">';
	var color= "#666562";
	var colorType =1;
	for (i=1;i<20;++i)
	{
		str+='<option value="'+i+'">'+i+'</option>'
	}
	str +="</select>"
	var title ='<tr><th>Product</th><th>Quantity</th><th>Units</th>'
					+'<td><button onclick=AddRow()>Add</td><td></td>';
	var addLine ='<tr><th><input id="New_Product_name" type="text" name="txtSearch" placeholder="Product Name" size="15"></th>'
	+'<th>'+str+'</th>'
	+'<th><input id="New_Product_units" type="text" name="txtSearch" placeholder="Units" size="15"></th><td><button onclick=showProducts(listProducts,user_permit,add=false)>cancel</td>'
		+'<td><button onclick=AddNewProduct()>save</td></td>';
		
	
	var dom = document.getElementById('product_table');
	$("#product_table").empty();
	dom.insertAdjacentHTML('beforeend',title);
	if(listProducts!=null)
	{
		
		for (i = 0; i < listProducts.length; ++i)
		{
			if(user_permit!='Viewer')
			{
				if(i==index)
				{
					dom.insertAdjacentHTML('beforeend','<tr bgcolor ="'+color +'"><th><input type="text" size="15" id ="Pname" value ="'+ listProducts[i][0] +'"></th><th><input type="text" size="5" id ="Pquantity" value ="'+listProducts[i][1]+'"></th><th><input type="text" size="10" id ="Punits" value ="'+ listProducts[i][2] +'"></th><td><button onclick=showProducts(listProducts,user_permit,add=false)>cancel</button></td>'
						+'<td><button onclick=changeProduct('+i+')>save</td></tr>');
						
				}
				else
					dom.insertAdjacentHTML('beforeend','<tr bgcolor ="'+color +'" id="tr'+i+'"><th id ="Pname'+i+'">'+ listProducts[i][0] +'</th><th>'+ listProducts[i][1] +'</th><th>'+ listProducts[i][2] +'</th><td><button onclick=deleteProduct('+i+')>delete</button></td>'
						+'<td><button onclick=editProduct('+i+')>edit</td></tr>');
			}
			else
				dom.insertAdjacentHTML('beforeend','<tr><th>'+ listProducts[i][0] +'</th><th>'+ listProducts[i][1] +'</th><th>'+ listProducts[i][2] +'</th></tr><td></td><td></td>');
			
			if(colorType ==1)
			{
				color = "#565654";
				colorType =0;
			}
			else if(colorType ==0)
			{
				
				color= "#666562";
				colorType =1;
			}
		}
	}
}












function showProducts(listProducts,user_permit,add)
{
	var str ='<select id="New_Product_quantity">';
	var color= "#666562";
	var colorType =1;
	for (i=1;i<20;++i)
	{
		str+='<option value="'+i+'">'+i+'</option>'
	}
	str +="</select>"
	var title ='<tr><th>Product</th><th>Quantity</th><th>Units</th>'
					+'<td><button onclick=AddRow()>Add</td><td></td>';
	var addLine ='<tr><th><input id="New_Product_name" type="text" name="txtSearch" placeholder="Product Name" size="15"></th>'
	+'<th>'+str+'</th>'
	+'<th><input id="New_Product_units" type="text" name="txtSearch" placeholder="Units" size="15"></th><td><button onclick=showProducts(listProducts,user_permit,add=false)>cancel</td>'
		+'<td><button onclick=AddNewProduct()>save</td></td>';
		
	
	var dom = document.getElementById('product_table');
	$("#product_table").empty();
	
	dom.insertAdjacentHTML('beforeend',title);
	if (add)
		dom.insertAdjacentHTML('beforeend',addLine);
	if(listProducts!=null)
	{
		
		for (i = 0; i < listProducts.length; ++i)
		{
			if(user_permit!='Viewer')
				dom.insertAdjacentHTML('beforeend','<tr bgcolor ="'+color +'" id="tr'+i+'"><th id ="Pname'+i+'">'+ listProducts[i][0] +'</th><th>'+ listProducts[i][1] +'</th><th>'+ listProducts[i][2] +'</th><td><button onclick=deleteProduct('+i+')>delete</button></td>'
						+'<td><button onclick=editProduct('+i+')>edit</td></tr>');
			else
				dom.insertAdjacentHTML('beforeend','<tr bgcolor ="'+color +'"><th>'+ listProducts[i][0] +'</th><th>'+ listProducts[i][1] +'</th><th>'+ listProducts[i][2] +'</th></tr><td></td><td></td>');
			
			if(colorType ==1)
			{
				color = "#565654";
				colorType =0;
			}
			else if(colorType ==0)
			{
				
				color= "#666562";
				colorType =1;
			}
		}
	}
	
	
}
function AddNewProduct()
{
	var productName = $("#New_Product_name").val();
	var productQuantity =$("#New_Product_quantity").val();
	var productUnits = $("#New_Product_units").val();
	if(productUnits=="")
	{
		alert("Please enter your units");
		return;
	}
	if(productQuantity =="")
	{
		alert("Please enter your units");
		return;
	}
	if(productName=="")
	{
		alert("Please enter your units");
		return;
	}
	$.ajax({
		url:'/productsList',
		type:'GET',
		dataType:'json',
			data:{new_Product_name:productName,new_Product_quantity:productQuantity,new_Product_units:productUnits},
			success:function(data, status, xhr) {
				if (data.status == "error")
					return;
				if(data.status == "exists")
				{
					alert(productName + ' Already Exists in the List!');
					return;
				}
				showProducts(listProducts,user_permit);
			},
			error:function(xhr, status, error) {
				console.error(xhr, status, error);
			}
			
		});	
	
}

function AddRow()
{
	var add = true;
	showProducts(listProducts,user_permit,add);
}
