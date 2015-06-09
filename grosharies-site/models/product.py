#this model represents a Product in our system

from google.appengine.ext 	import ndb
from models.listOfProducts 	import ListOfProducts


class Product(ndb.Model):
	ProductName = ndb.StringProperty(required =True)
	ProductUnits = ndb.StringProperty()
	ProductQuantity = ndb.StringProperty()
	ProductID = ndb.IntegerProperty()
	
	@classmethod
	def checkIfProductExists(self,product_name, list_id):
		p_list = Product.getProductByName(product_name)
		if p_list:
			for p in p_list:
				query = ListOfProducts.query(ListOfProducts.ProductID ==p.ProductID, ListOfProducts.ListID ==list_id).get()
				if query:
					return True
		else:
			return False
			
		
	

	#delete a product from product table and listOfProducts table
	@classmethod
	def deleteProduct(self,product_id):
		query = Product.query(Product.ProductID==product_id).get()
		query.key.delete()

		
	#add product to a list 
	@classmethod
	def addProduct(self,product_name,product_quantity,product_units,list_id):
		product = Product()
		product.ProductName = product_name
		product.ProductQuantity = product_quantity
		product.ProductUnits =product_units
		product.put()
		product.ProductID = product.key.id()
		product.put()
		listOfProducts = ListOfProducts()
		listOfProducts.ListID = list_id
		listOfProducts.ProductName = product_name
		listOfProducts.ProductID = product.key.id()
		listOfProducts.put()
		

	#get product by id
	@classmethod
	def getProductByID(self,product_id):
		product = Product.query(Product.ProductID == product_id).get()
		if product:
			return product
		else:
			return None
	
	@classmethod
	def getProductByName(self,p_name):
		query = Product.query(Product.ProductName==p_name).fetch()
		if query:
			return query
		return None
	
