#this model represents a Product in our system

from google.appengine.ext import ndb
from models.listOfProducts import ListOfProducts


class Product(ndb.Model):
	ProductName = ndb.StringProperty(required =True)
	ProductUnits = ndb.StringProperty()
	ProductQuantity = ndb.IntegerProperty()
	ProductID = ndb.IntegerProperty()
	
	@classmethod
	def checkIfProductExists(self,product_name):
		query = Product.query(Product.ProductName == product_name).get()		
		if query:
			return True
		else:
			return None
	

	#delete a product from product table and listOfProducts table
	@classmethod
	def deleteProduct(self,product_id):
		query = Product.query(Product.ProductID==product_id).get()
		query.key.delete()
		Product.deleteProduct(product_id)
	
	#add product to a list 
	@classmethod
	def addProduct(self,product_name,product_quantity,product_units,list_id):
		product = Product()
		product.ProductName = product_name
		product.ProductUnits =product_units
		product.ProductQuantity = product_quantity
		product.put()
		product.ProductID = product.key.id()
		product.put()
		listOfProducts = ListOfProducts()
		listOfProducts.ListID = list_id
		listOfProducts.ProductID =product.key.id()
		listOfProducts.put()
		

	#get product by id
	@classmethod
	def getProduct(self,product_id):
		query = Product.query(Product.ProductID == product_id).get()
		if query:
			return query
		else:
			return None

		
