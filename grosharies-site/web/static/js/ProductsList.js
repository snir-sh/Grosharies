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
				saveOrEdit = "edit";
				showProducts(listProducts,user_permit,saveOrEdit);			
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
					saveOrEdit ="edit";
					showProducts(listProducts,user_permit,saveOrEdit);
				}
			},
			error:function(xhr, status, error) {
				console.error(xhr, status, error);
			}
			
		});	
	
}

function editProduct(index) {
	saveOrEdit = "save";
	var id = "#Panme" +index;
	showProducts(listProducts,user_permit,saveOrEdit);
	var id ="tr" + index;
	$(id).attr("contenteditable", true);
}

function showProducts(listProducts,user_permit,saveOrEdit,add)
{
	var str ='<select id="New_Product_quantity">';
	for (i=1;i<20;++i)
	{
		str+='<option value="'+i+'">'+i+'</option>'
	}
	str +="</select>"
	var title ='<tr><th>Product</th><th>Quantity</th><th>Units</th>'
					+'<td><button onclick=AddRow()>Add</td><td></td>';
	var addLine ='<tr><th><input id="New_Product_name" type="text" name="txtSearch" placeholder="Product Name" size="15"></th>'
	+'<th>'+str+'</th>'
	+'<th><input id="New_Product_units" type="text" name="txtSearch" placeholder="Units" size="15"></th><td></td>'
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
				dom.insertAdjacentHTML('beforeend','<tr id="tr'+i+'"><th id ="Pname'+i+'">'+ listProducts[i][0] +'</th><th>'+ listProducts[i][1] +'</th><th>'+ listProducts[i][2] +'</th><td><button onclick=deleteProduct('+i+')>delete</button></td>'
						+'<td><button onclick='+saveOrEdit+'Product('+i+')>'+saveOrEdit+'</td></tr>');
			else
				dom.insertAdjacentHTML('beforeend','<tr><th>'+ listProducts[i][0] +'</th><th>'+ listProducts[i][1] +'</th><th>'+ listProducts[i][2] +'</th></tr><td></td><td></td>');
		
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
		dataType:'text',
			data:{new_Product_name:productName,new_Product_quantity:productQuantity,new_Product_units:productUnits},
			success:function(data, status, xhr) {
				if (data.status == "error")
					return;
				showProducts(listProducts,user_permit,saveOrEdit);
			},
			error:function(xhr, status, error) {
				if(data.status=="int")
					alert("מה זה החרא הזה?");
				console.error(xhr, status, error);
			}
			
		});	
	
}
function AddRow()
{
	var add = true;
	showProducts(listProducts,user_permit,saveOrEdit,add);
}
