#this model represents a Product in our system

from google.appengine.ext import ndb

class Product(ndb.Model):
	ProductName = ndb.StringProperty(required =True)
	ProductUnits = ndb.StringProperty()
	ProductQuantity = ndb.IntegerProperty()
	
	@classmethod
	def cheakIfProductExists(self,product_name):
		query = Product.query(Product.ProductName == product_name).get()		
		if query:
			return True
		else:
			return None
			
	@classmethod
	def deleteProduct(self,product_name):
		query = Product.query(Product.ProductName == product_name).get()
		query.key.delete()
		
    def changeProductQuantity(self,product_name,list_admin,new_list_name):
		query = List.query(List.ListName == old_list_name,List.ListAdmin == list_admin).get()
		query.ListName = new_list_name
		query.put()		
		

		
