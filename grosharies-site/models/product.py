#this model represents a Product in our system

from google.appengine.ext import ndb

class Product(ndb.Model):
	ProductName = ndb.StringProperty(required =True)
	ProductUnits = ndb.StringProperty()
	ProductQuantity = ndb.IntegerProperty()
	ProductID = ndb.IntegerProperty()
	
	@classmethod
	def cheakIfProductExists(self,product_name):
		query = Product.query(Product.ProductName == product_name).get()		
		if query:
			return True
		else:
			return None
			
	@classmethod
	def deleteProduct(self,product_id):
		query = Product.query(Product.ProductID==product_id).get()
		query.key.delete()
		
	
		

		
