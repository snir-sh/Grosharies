#this model represents a ListOfProducts in our system

from google.appengine.ext import ndb
from models.product import Product

class ListOfProducts(ndb.Model):
	ListID = ndb.IntegerProperty()
	ProductID = ndb.IntegerProperty()

	@classmethod
	def getAllProducts(self,list_id):
		query = ListOfProducts.query(ListOfProducts.ListID == list_id).get()	
		if query:
			return query
		else:
			return None
			
	@classmethod
	def deleteProduct(self, list_id, product_id):
		query = ListOfProducts.query(ListOfProducts.ListID==list_id, ListOfProducts.ProductID=product_id).key.get()
		query.key.delete()
		Product.deleteProduct(product_id)
		
	
	
	
	
	