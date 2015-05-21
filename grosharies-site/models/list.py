#this model represents a List in our system

from google.appengine.ext import ndb
from models.listOfProducts import ListOfProducts
from models.product import Product


class List(ndb.Model):
	ListName = ndb.StringProperty(required=True)
	ListUser = ndb.StringProperty()
	ListAdmin = ndb.StringProperty(required=True)
	userPermit = ndb.StringProperty(choices = ['partner','viewer'])
	
	#method checks if the list exists. if it does the method returns the list else returns None
	@classmethod
	def checkIfListExsist(self,list_name,list_admin):
		query = List.query(List.ListName == list_name,List.ListAdmin ==list_admin).get()
		if query:
			return query
		else:
			return None
	
	#delete the list from the data store (list table and listOfProducts table)
	@classmethod		
	def deleteList(self,list_name,list_admin):
		query = List.query(List.ListName == list_name,List.ListAdmin == list_admin).get()
		key = query.key.id()
		query.key.delete()
		ListOfProducts.deleteList(key)
	
	
	#changes the list name
	@classmethod		
	def changeListName(self,old_list_name,list_admin,new_list_name):
		query = List.query(List.ListName == old_list_name,List.ListAdmin == list_admin).fetch()
		if query:
			for list in query:
				list.ListName = new_list_name
				query.put()
		
		
	@classmethod
	def addList(self,list_name,list_admin):
		list =List()
		list.ListName =list_name
		list.ListAdmin = list_admin
		list.put()
		return list
		
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
	def	getAllProductsOfTheList(self, list_id):
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