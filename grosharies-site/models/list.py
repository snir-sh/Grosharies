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
	userPermit = ndb.StringProperty(choices = ['Partner','Viewer'])
	
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
	def getListByID(self,list_id):
		query = List.query(List.ListID == list_id).get()
		if query:
			return query
		else:
			return None
	
	
	# returns a listID
	@classmethod
	def getListID(self, list_name, list_admin):
		query = List.query(List.ListName==list_name, List.ListAdmin==list_admin).get()
		if query:
			return query.ListID
		else:
			return None
			
	
	#delete the list from the data store (list table and listOfProducts table)
	@classmethod		
	def deleteList(self,list_id, group_id):
		query = List.query(List.ListID == list_id).get()
		if query:
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
	def changeListName(self,list_id,new_list_name):
		query = List.query(List.ListID == list_id).get()
		if query:
			query.ListName = new_list_name
			query.put()
		
		
	#get all the user in the list
	@classmethod
	def getAllListUsers(self,list_name,list_admin):
		users = []
		query = List.query(List.ListName == list_name , List.ListAdmin == list_admin).fetch()
		if query:
			for user in query:
				if user.ListUser != None:
					users.append(user.ListUser)
		return users
			
	#get all the user in the list
	@classmethod
	def getAllListUsersByID(self,list_id):
		users = []
		query = List.query(List.ListID == list_id).fetch()
		if query:
			for user in query:
				if user.ListUser != None:
					users.append(user.ListUser)
		return users
			
	@classmethod
	def getAllProductsOfTheList(self, list_id):
		i=0
		products = []
		productsIds = ListOfProducts.getAllProductsIDs(list_id)
		if productsIds:
			for productid in productsIds:
				p = Product.getProductByID(productsIds[i])
				pData = []
				pData.append(p.ProductName)
				pData.append(p.ProductQuantity)
				pData.append(p.ProductUnits)
				pData.append(p.ProductID)
				products.append(pData)
				i+=1
			if products:
				return products
		else:
			return None
	
	@classmethod
	def deleteUserFromList(self,user_name, list_id):
		query = List.query(List.ListUser == user_name, List.ListID == list_id).get()
		if query:
			query.key.delete()
	
	
	@classmethod
	def addUserToList(self,list_name,list_admin,list_user,list_permit, list_id):
		list = List()
		list.ListAdmin = list_admin
		list.ListName = list_name
		list.ListUser = list_user
		list.userPermit = list_permit
		list.ListID = list_id
		list.put()
		
		
	@classmethod
	def addProduct(self, list_id, product_name,product_quantity,product_units):
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
		
	
	@classmethod
	def deleteProductFromList(self, list_id, pid):

		if list_id ==None or pid ==None:
			return False
		Product.deleteProduct(pid)
		ListOfProducts.deleteProduct(pid)
		return True
		
	@classmethod
	def checkIfTheNameExists(self,list_name,group_id):
		lists = GroupLists.getAllLists(group_id)
		if lists:
			for list in lists:
				query = List.query(List.ListID == list).get()
				if query:
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
				listNames.sort(key=lambda x: x[1].lower())
				return listNames
			else:
				return None
				
	@classmethod
	def getAllListsNameOfTheUser(self,group_id, user_email):
		listNames = []
		if group_id:	
			my_groupListsIds = GroupLists.getAllLists(group_id)
			if my_groupListsIds:
				for list_id in my_groupListsIds:
					userInList = List.checkIfUserInList(list_id, user_email)
					if userInList == True:
						lName = List.getListNameByID(list_id)
						IdAndName =[list_id,lName]
						listNames.append(IdAndName)
				listNames.sort(key=lambda x: x[1].lower())
				return listNames
			else:
				return None
				
	@classmethod
	def checkIfUserInList(self,list_id,user_email):
		if list_id:
			query = List.query(List.ListUser ==user_email,List.ListID==list_id).get()
			if query:
				return True
			query2 = List.query(List.ListAdmin ==user_email,List.ListID==list_id).get()
			if query2:
				return True
		return False
				
	@classmethod
	def getUserPermit(self,list_id,user_email):
		query = List.query(List.ListUser ==user_email,List.ListID==list_id).get()
		if query:
			return query.userPermit
		else:
			return 'Admin'