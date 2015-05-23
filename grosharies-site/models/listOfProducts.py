#this model represents a ListOfProducts in our system

from google.appengine.ext import ndb

class ListOfProducts(ndb.Model):
	ListID = ndb.IntegerProperty()
	ProductID = ndb.IntegerProperty()
	ProductName = ndb.StringProperty()
	
	#get all the products of the list
	@classmethod
	def getAllProductsIDs(self,list_id):
		products =[]
		listOfProducts = ListOfProducts.query(ListOfProducts.ListID == list_id).fetch()	
		if listOfProducts is not None:
			for product in listOfProducts:
				products.append(product.ProductID)
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
	def addToListOfProducts(self,list_id,product_id, product_name):
		listOfProducts = ListOfProducts()
		listOfProducts.ProductName = product_name
		listOfProducts.ProductID = product_id
		listOfProducts.ListID = list_id
		listOfProducts.put()
	
	
	@classmethod
	def getProductByID(self, product_id):
		product = ListOfProducts.query(ListOfProducts.ProductID == product_id).get()
		if product is not None:
			return product
		else:
			return None
	
	
	@classmethod
	def deleteProduct(self, product_id):
		product = ListOfProducts.query(ListOfProducts.ProductID == product_id).get()
		if product is not None:
			product.key.delete()
			return True
		return False