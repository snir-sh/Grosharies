$(document).ready(function(){
	$('#homeHelp').on('click', homeHelp);
	$('#createGroupHelp').on('click', createGroupHelp);
	$('#listPageHelp').on('click', listPageHelp);
	$('#createListHelp').on('click', createListHelp);
	$('#listDetailsHelp').on('click', listDetailsHelp);
	$('#productListHelp').on('click', productListHelp);
});

function homeHelp() 
{
	swal({
		title: "Welcome!",
		text: "We are happy that you chose to use Grosharies! " +
		"To start, on the left side of the screen you can see the groups you are belong to, " + 
		"you can enter them by simply click on the name of the group. " + 
		"If you currently don't belong to any group, just create a new one and add your friends and family.",
		confirmButtonText: "OK"
	});
}

function createGroupHelp() 
{
	swal({
		title: "Create New Group!",
		text: "Here you can create a new group and add people to it! " +
		"To start, enter any name for your group (it's better to have a meaningful name), " + 
		"and search user's email (that are registered) you wish to add to your group, then click the 'Add User' button. " + 
		"When you're done setting up your group, click the 'Submit' button to create it. " + 
		"Don't worry you can edit the user's list and group's name at any time.",
		confirmButtonText: "OK"
	});
}

function listPageHelp() 
{
	swal({
		title: "Group Details!",
		text: "Here you can view the group's details - the list of users that are in the group and the group's admin. " +
		"If you are the group's admin, you can edit the group's name, add/remove users from the group " + 
		"and even delete the whole group (permanently!!). " + 
		"If you are a user in the group, you can leave the group by simple clicking the 'Leave Group' button. ",
		confirmButtonText: "OK"
	});
}

function createListHelp() 
{
	swal({
		title: "Create New List!",
		text: "Here you can create a new list and add people to it! " +
		"To start, enter any name for your list (it's better to have a meaningful name), " + 
		"and choose user's email (that are in the group) you wish to add to your list, " +
		"for each user you should choose list permission - 'Viewer' means that the user can only view " + 
		"the list of products without the ability to add or change anything, and 'Partner' means that " + 
		"he will be able to add or change products in the products list, then click the 'Add User' button. " + 
		"When you're done setting up your list, click the 'Submit' button to create it. " + 
		"Don't worry you can edit the user's list, permission and list's name at any time.",
		confirmButtonText: "OK"
	});
}

function listDetailsHelp() 
{
	swal({
		title: "List Details!",
		text: "Here you can view the list's details - the list of users that are in the list and the list's administrator. " +
		"If you are the list's admin, you can edit the list's name, add/remove users from the list, " + 
		"changing their permission and you can delete the whole list. " + 
		"If you are a user in the list, you can leave the list by simple clicking the 'Leave List' button. ",
		confirmButtonText: "OK"
	});
}

function productListHelp() 
{
	swal({
		title: "Products List!",
		text: "Here you can view the shared products list - those product are shared between all the list's users. " +
		"At the upper right corner of the screen you can view the list details and manage the list if you are the list's admin. " +
		"If you have the permission to edit the products list, you can modify the list they way you want, " + 
		"you can add products - by simply clicking the '+' icon and add the product's quantity and description, " +
		"check products that are bought - by clicking the 'check' icon, remove products from the list - " +
		"by clicking the 'remove' icon and edit each product of the list." + 
		"If you have edited/added a product, click on the 'save' icon to save it to the products list. " +
		"Everyone in the joint list will be able to see the changed you made! ",
		confirmButtonText: "OK"
	});
}
