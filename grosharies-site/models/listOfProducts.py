#this model represents a ListOfProducts in our system

from google.appengine.ext import ndb

class ListOfProducts(ndb.Model):
	ListID = ndb.IntegerProperty()
	ProductID = ndb.IntegerProperty()

	#get all the products of the list
	@classmethod
	def getAllProducts(self,list_id):
		products =[]
		i=0
		query = ListOfProducts.query(ListOfProducts.ListID == list_id).fetch()	
		if query:
			for product in query:
				products[i] = product.ProductID
				i+=1
				return products
		else:
			return None
			
	@classmethod
	def deleteProduct(self,product_id):
		query = ListOfProducts.query(ListOfProducts.ProductID == product_id).get()
		if query:
			query.key.delete()
	
	@classmethod
	def deleteList(self,list_id):
		query = ListOfProducts.query(ListOfProducts.ListID == list_id).fetch()
		if query:
			for list in query:
				list.key.delete()
	
	@classmethod
	def addToListOfProducts(self,list_id,product_id):
		listOfProducts = ListOfProducts()
		listOfProducts.ProductID = product_id
		listOfProducts.ListID = list_id
		listOfProducts.put()
	
	
	