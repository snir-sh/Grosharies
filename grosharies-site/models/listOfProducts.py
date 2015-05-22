#this model represents a ListOfProducts in our system

from google.appengine.ext import ndb

class ListOfProducts(ndb.Model):
	ListID = ndb.IntegerProperty()
	ProductID = ndb.IntegerProperty()

	#get all the products of the list
	@classmethod
	def getAllProducts(self,list_id):
		products =[]
		listOfProducts = ListOfProducts.query(ListOfProducts.ListID == list_id).fetch()	
		if listOfProducts is not None:
			for product in listOfProducts:
				products.append(product)
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
	
	
	