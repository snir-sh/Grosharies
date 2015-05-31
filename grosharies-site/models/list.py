#this model represents a List in our system

from google.appengine.ext 	import ndb
from models.listOfProducts 	import ListOfProducts
from models.product			import Product
from models.groupLists 	 	import GroupLists


class List(ndb.Model):
	ListName = ndb.StringProperty(required=True)
	ListUser = ndb.StringProperty()
	ListAdmin = ndb.StringProperty(required=True)
	ListID = ndb.IntegerProperty()
	userPermit = ndb.StringProperty(choices = ['partner','viewer'])
	
	@staticmethod
	def createList(list_name,list_admin, group_id):
		if List.checkIfTheNameExists(list_name,group_id) == False:
			list = List()
			list.ListName =list_name
			list.ListAdmin = list_admin
			list.put()
			list.ListID = list.key.id()
			list.put()
			groupList = GroupLists()
			groupList.ListID = list.key.id()
			groupList.GroupID = group_id
			groupList.put()
			return list
		return None
		
	
	#method checks if the list exists. if it does the method returns its ID, else returns None
	@classmethod
	def checkExistenceByID(self,list_id):
		query = List.query(List.ListID == list_id).get()
		if query is not None:
			return query.ListID
		else:
			return None
	
	
	# returns a listID
	@classmethod
	def getListID(self, list_name, list_admin, belong_to):
		query = List.query(List.ListName==list_name, List.ListAdmin==list_admin, List.BelongToGroup==belong_to).get()
		if query is not None:
			return query.ListID
		else:
			return None
			
	
	#delete the list from the data store (list table and listOfProducts table)
	@classmethod		
	def deleteList(self,list_id, group_id):
		query = List.query(List.ListID == list_id).get()
		if query is not None:
			key = query.key.id()
			query.key.delete()
			GroupLists.deleteList(key)
			productsIds = ListOfProducts.getAllProductsIDs(list_id)
			if productsIds:
				for productID in productsIds:
					Product.deleteProduct(productID)
			ListOfProducts.deleteList(key)
	
	#changes the list name
	@classmethod		
	def changeListName(self,old_list_name,list_admin,new_list_name):
		query = List.query(List.ListName == old_list_name,List.ListAdmin == list_admin).fetch()
		if query:
			for list in query:
				list.ListName = new_list_name
				query.put()
		
		
	#get all the user in the list
	@classmethod
	def getAllListUsers(self,list_name,list_admin):
		users = []
		i=0
		query = List.query(List.ListName == list_name , List.ListAdmin == list_admin).fetch()
		if query:
			for user in query:
				users[i] = user.ListUsers
				i+=1
			return users
		else:
			return None
			
			
	@classmethod
	def getAllProductsOfTheList(self, list_id):
		products = []
		i=0
		productsIds = ListOfProducts.getAllProducts(list_id)
		if productsIds:
			for productid in productsIds:
				product[i] = Product.getProduct(productsIds[i])
				i+=1
	
	
	@classmethod
	def deleteUserFromList(self,user_name, list_name,list_admin):
		query = List.query(List.ListUser == user_name, List.ListAdmin == list_admin,List.ListName ==list_name).get()
		if query:
			query.key.delete()
	
	
	@classmethod
	def addUserToList(self,list_name,list_admin,list_user,list_permit):
		list = List()
		list.ListAdmin = list_admin
		list.ListName = list_name
		list.ListUser = list_user
		list.userPermit = list_permit
		list.put()
		
		
	@classmethod
	def addProduct(self, list_id, product_name,product_quantity,product_units):
		if List.checkExistenceByID(list_id) is not None:
			products = ListOfProducts.getAllProductsIDs(list_id)
			if len(products)!=0:
				for product_id in products:
					product = Product.getProductByID(product_id)
					if product is None:
						Product.addProduct(product_name,product_quantity,product_units, list_id)
						return True
					else:
						return False
			else:
				Product.addProduct(product_name,product_quantity,product_units, list_id)
				return True
		else:
			return False
		
	
	@classmethod
	def deleteProductFromList(self, list_id, product_name):
		if List.checkExistenceByID(list_id) is not None:
			product = ListOfProducts.query(ListOfProducts.ProductName==product_name, ListOfProducts.ListID==list_id).get()
			if product is not None:
				Product.deleteProduct(product.ProductID)
				ListOfProducts.deleteProduct(product.ProductID)
				return True
			return False
		return False
		
	@classmethod
	def checkIfTheNameExists(self,list_name,group_id):
		lists = GroupLists.getAllLists(group_id)
		if lists:
			for list in lists:
				query = List.query(List.ListID == list).get()
				if query.ListName == list_name:
					return True
		return False
		
	@classmethod
	def getListNameByID(self,list_id):
		query = List.query(List.ListID ==list_id).get()
		if query:
			return query.ListName
		else:
			return None
	
	@classmethod
	def getAllListsName(self,group_id):
		listNames = []
		if group_id:	
			my_groupListsIds = GroupLists.getAllLists(group_id)
			if my_groupListsIds:
				for list in my_groupListsIds:
					lName = List.getListNameByID(list)
					IdAndName =[list,lName]
					listNames.append(IdAndName)
				return listNames
			else:
				return None