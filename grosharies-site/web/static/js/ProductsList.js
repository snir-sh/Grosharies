$(document).ready(function()
{		
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

var listProducts;
var user_permit;
var listName;
function deleteProduct(index) 
{
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
			swal({
				title: "Error!",
				text: "Something Went Wrong!",
				type: "error",
				confirmButtonText: "OK"
			});
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
	p_quantity = parseFloat(p_quantity);
	if(p_name== "") 
	{
		swal("Missing Product Name!", "please enter a name for the product", "info");
		return;
	}
	if (!p_quantity)
	{
		swal("Missing Quantity!", "quantity number is illegal or missing", "info");
		return;
	}
	if(p_units=="")
	{
		swal("Missing Units!", "please enter the product's unit", "info");
		return;
	}
	$.ajax({
		url:'/productsList',
		type:'GET',
		dataType:'json',
		data:{p_name:p_name,p_quantity:p_quantity,p_units:p_units,pid:pid},
		success:function(data, status, xhr) {
			if (data.status == "error")
			{
				swal({
					title: "Error!",
					text: "Something Went Wrong!",
					type: "error",
					confirmButtonText: "OK"
				});
				return;
			}
			if(data.status == "exists")
			{
				swal("Product Exists!", p_name + " is already exists in list", "info");
				return;
			}
			else
			{
				listProducts.splice(index,1);
				if(data !=null)
				{	
					var list_name = data[0];
					listProducts = data[1];
					user_permit =data[2];
					showProducts(listProducts,user_permit);
				}		
			}
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
}

function editProduct(index) 
{
	var id = "#Panme" +index;
	var id ="tr" + index;
	var color1= "#666562";
	var color = "#123033";
	var colorType =1;
	var title ='<tr bgColor="'+color1+'"><th><center>Product</center></th><th><center>Quantity</center></th><th><center>Units</center></th>'
					+'<td><center><img src="../static/images/plus.png" title="add product" width="35" height="35" onclick=AddRow()></center></td><td></td>';
	var addLine ='<tr><th><center><input id="New_Product_name" type="text" name="txtSearch" placeholder="Product Name" size="15"></center></th>'
	+'<th><center><input id="New_Product_quantity" placeholder="Product quantity"></center></th>'
	+'<th><center><input id="New_Product_units" type="text" name="txtSearch" placeholder="Units" size="15"></center></th><td><img src="../static/images/cancel.png" title="Cancel" width="35" height="35" onclick=showProducts(listProducts,user_permit,add=false)></center></img></td>'
		+'<td><center><img src="../static/images/save.png" title="Save" width="35" height="35" onclick=AddNewProduct()></center></img></td></td>';
		
	
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
					dom.insertAdjacentHTML('beforeend','<tr bgcolor ="'+color +'"><th><center><input type="text" size="15" id ="Pname" value ="'+ listProducts[i][0] +'"></center></th><th><center><input type="text" size="5" id ="Pquantity" value ="'+listProducts[i][1]+'"></center></th><th><center><input type="text" size="10" id ="Punits" value ="'+ listProducts[i][2] +'"></center></th><td><center><img src="../static/images/cancel.png" title="cancel" width="35" height="35" onclick=showProducts(listProducts,user_permit,add=false)></img></center></td>'
						+'<td><center><img src="../static/images/save.png" title="save" width="35" height="35" onclick=changeProduct('+i+')></center></img></td></tr>');
						
				}
				else
					dom.insertAdjacentHTML('beforeend','<tr bgcolor ="'+color+'"id="tr'+i+'"><th id ="Pname'+i+'"><center>'+ listProducts[i][0] +'</center></th><th><center>'+ listProducts[i][1] +'</center></th><th><center>'+ listProducts[i][2] +'</center></th><td><center><img src="../static/images/del.png" title="delete product" width="35" height="35" onclick=deleteProduct('+i+')>'+'</img></center></td>'
						+'<td><center><img src="../static/images/edit.png" title="edit" width="32" height="32" onclick=editProduct('+i+')></img></center></td></tr>');
			}
			else
				dom.insertAdjacentHTML('beforeend','<tr bgcolor ="'+color +'"><th><center>'+ listProducts[i][0] +'</center></th><th><center>'+ listProducts[i][1] +'</center></th><th><center>'+ listProducts[i][2] +'</center></th></tr>');
			
			if(colorType ==1)
			{
				color = "#2a3233";
				colorType =0;
			}
			else if(colorType ==0)
			{
				color= "#123033";
				colorType =1;
			}
		}
	}
}

function showProducts(listProducts,user_permit,add)
{
	var color1= "#666562";
	var color = "#123033";
	var colorType =1;
	var line ="";
	var checkLine="";
	var unCheckLine ="";
	var title ='<tr bgcolor ="'+color1+'">'
		+'<th><center>Product</center></th>'
		+'<th><center>Quantity</center></th>'
		+'<th><center>Units</center></th>'
		+'<td><center><img src="../static/images/plus.png" title="Add" width="35" height="35" onclick=AddRow()></img></center></td>'
		+'<td></td><td></td>';
	
	var addLine ='<tr>'
		+'<th><center><input id="New_Product_name" type="text" name="txtSearch" placeholder="Product Name" size="15"></center></th>'
		+'<th><center><input id="New_Product_quantity" placeholder="Enter Quantity"></center></th>'
		+'<th><center><input id="New_Product_units" type="text" name="txtSearch" placeholder="Units" size="15"></center></th><td><center><img src="../static/images/cancel.png" title="Cancel" width="35" height="35" onclick=showProducts(listProducts,user_permit,add=false)></img></center></td>'
		+'<td><center><img src="../static/images/save.png" title="Save" width="35" height="35" onclick=AddNewProduct()></center></img></td></td>';
		
	var viewerTitle ='<tr>'
		+'<th><center>Product</center></th>'
		+'<th><center>Quantity</center></th>'
		+'<th><center>Units</center></th>';
	
	var dom = document.getElementById('product_table');
	
	$("#product_table").empty();
	$("#finishList").empty();
	
	if(user_permit != 'Viewer')
		dom.insertAdjacentHTML('beforeend',title);
	else
		dom.insertAdjacentHTML('beforeend',viewerTitle);

	if (add)
		dom.insertAdjacentHTML('beforeend',addLine);
	
	if(listProducts!=null)
	{	
		for (i = 0; i < listProducts.length; ++i)
		{
			if(user_permit!='Viewer')
			{
				line ='<td id ="Pname'+i+'"><center>'+ listProducts[i][0] +'</center></th>'
					+'<td><center>'+ listProducts[i][1] +'</center></td>'
					+'<td><center>'+ listProducts[i][2] +'</center></td>'
					+'<th><center><img src="../static/images/del.png" title="Delete" width="35" height="35" onclick=deleteProduct('+i+')>'+'</img></center></th>'
					+'<th><center><img src="../static/images/edit.png" title="Edit" width="32" height="32" onclick=editProduct('+i+')></img></center></th>';
					
				checkLine =	'<th><center><img src="../static/images/uncheck.png" title="UnCheck" width="32" height="32" onclick=StrikeRow('+i+')></img></center></th></tr>';
				unCheckLine	='<th><center><img src="../static/images/check.png" title="Check" width="32" height="32" onclick=StrikeRow('+i+')></img></center></th></tr>';
				if(listProducts[i][4]!=true)
					dom.insertAdjacentHTML('beforeend','<tr bgcolor ="'+color+'"id="tr'+i+'">'+line+unCheckLine);
				else
					dom.insertAdjacentHTML('beforeend','<tr class="strikeout" bgcolor ="'+color+'"id="tr'+i+'">'+line+checkLine);
			}
			else
			{
				if(listProducts[i][4]!=true)
					dom.insertAdjacentHTML('beforeend','<tr bgcolor ="'+color +'"><th><center>'+ listProducts[i][0] +'</center></th><th><center>'+ listProducts[i][1] +'</center></th><th><center>'+ listProducts[i][2] +'</center></th></tr>');
				else
					dom.insertAdjacentHTML('beforeend','<tr class="strikeout" bgcolor ="'+color +'"><th><center>'+ listProducts[i][0] +'</center></th><th><center>'+ listProducts[i][1] +'</center></th><th><center>'+ listProducts[i][2] +'</center></th></tr>');
			}
			
			if(colorType ==1)
			{
				color = "#2a3233";
				colorType =0;
			}
			else if(colorType ==0)
			{
				
				color= "#123033";
				colorType =1;
			}
			
		}	
	}
	if(user_permit!='Viewer' && listProducts!=null)
	{
		
		for (i = 0; i < listProducts.length; ++i)
		{
			if(listProducts[i][4]==false)
			{
				$("#finishList").empty();
				return;
			}
		}
		if (listProducts.length != 0)
		{
			var dom2 = document.getElementById('finishList');
		dom2.insertAdjacentHTML('beforeend','</br></br><img src="../static/images/finish.png" width="60" height="60" title="Finish List" style=float:right; onclick=FinishList()></img>');
		}
	}
	
}

function AddNewProduct()
{
	var productName = $("#New_Product_name").val();
	var productQuantity =$("#New_Product_quantity").val();
	var productUnits = $("#New_Product_units").val();
	productQuantity = parseFloat(productQuantity);
	if(productUnits=="")
	{
		swal("Missing Units!", "please enter the product's unit", "info");
		return;
	}
	if(!productQuantity)
	{
		swal("Missing Quantity!", "quantity number is illegal or missing", "info");
		return;
	}
	if(productName=="")
	{
		swal("Missing Product Name!", "please enter a name for the product", "info");
		return;
	}
	$.ajax({
		url:'/productsList',
		type:'GET',
		dataType:'json',
		data:{new_Product_name:productName,new_Product_quantity:productQuantity,new_Product_units:productUnits},
		success:function(data, status, xhr) {
			if (data.status == "error")
			{
				swal({
					title: "Error!",
					text: "Something Went Wrong!",
					type: "error",
					confirmButtonText: "OK"
				});
				return;
			}
			if(data.status == "exists")
			{
				swal("Product Exists!", productName + " is already exists in list", "info");
				return;
			}
			if(data !=null)
			{	
				var list_name = data[0];
				listProducts = data[1];
				user_permit =data[2];
			}
			
			showProducts(listProducts,user_permit);
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
}

function AddRow()
{
	var add = true;
	showProducts(listProducts,user_permit,add);
}

function StrikeRow(index)
{
	var pid = listProducts[index][3];
	if(listProducts[index][4]==true)
		var check  = false;
	else
		var check  = true;
	$.ajax({
		url:'/productsCheck',
		type:'GET',
		dataType:'json',
		data:{pid:pid,pCheck:"lslslslls"},
		success:function(data, status, xhr) {
			if (data.status == "error")
			{
				swal({
					title: "Error!",
					text: "Something Went Wrong!",
					type: "error",
					confirmButtonText: "OK"
				});
				return;
			}
			listProducts[index][4] =check;
			showProducts(listProducts,user_permit);
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
}

function FinishList()
 {
		swal({
		title: "Are you sure?",
		text: "Close the list and send Email to all members of the list?",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "Yes, do it!",
		cancelButtonText: "No, cancel!",
		},
		function(isConfirm){
			if (isConfirm) {
				var confirmDeletion = "yes";
				$.ajax({
				url:'/finishProducts',
				type:'GET',
				dataType:'json',
				data:{confirmDeletion:confirmDeletion},
				success:function(data, status, xhr) {
					if (data.status == "error")
					{
						swal({
							title: "Error!",
							text: "Something Went Wrong!",
							type: "error",
							confirmButtonText: "OK"
						});
						return;
					}
					var users = data[0];
					listName =data[1];
					for(i=0;i<users.length;++i)
					{
						sendEmail(users[i]);
					}
					listProducts = [];
					showProducts(null,user_permit,add=false);
					return;
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
			} 
			else {
				return;
			}
		});
}

function sendEmail(email)
{
	$.ajax({
		type: 'POST',
		url: 'https://mandrillapp.com/api/1.0/messages/send.json',
		data: 
		{
			'key': 'ELifZve5ZJbKw3Sc2Pik7Q',
			'message': 
			{
			  'from_email': 'groshariesteam@gmail.com',
			  'to': [
				  {
					'email': email,
					'name': '',
					'type': 'to'
				  }
				],
			  'autotext': 'true',
			  'subject': 'The List ' + listName + ' Closed',
			  'html': 'Hello,</br></br>The list '+ listName +' is now closed and all the products were removed. '
			  + '<br>you are welcome to continue to use our website <a href="http://grosharies-site.appspot.com/index">click here.</a>'
			}
		}
	});
	
	
}









