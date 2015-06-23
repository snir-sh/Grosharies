from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
from models.list import List
from models.product import Product
from models.groupLists import GroupLists
import webapp2
import json
import time

class ProductsList(webapp2.RequestHandler):
	def get(self):
		template_params = {}			
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
			return			
		#show the all the products of the list
		
		list_id = int(self.request.cookies.get('list_id_cookie'))
		if list_id:
			pid = self.request.get('pid')
			if pid:
				List.deleteProductFromList(list_id,int(pid))
				p_name = self.request.get('p_name')
				p_quantity = self.request.get('p_quantity')
				p_units = self.request.get('p_units')
				if p_name and p_quantity and p_units:
					if Product.checkIfProductExists(p_name,list_id):
						self.response.write(json.dumps({'status':'exists'}))
						return
					Product.addProduct(p_name,p_quantity,p_units,list_id)
					time.sleep(0.5)
			new_Product_name = self.request.get('new_Product_name')
			new_Product_quantity = self.request.get('new_Product_quantity')
			new_Product_units = self.request.get('new_Product_units')
			if new_Product_name and new_Product_quantity and new_Product_units:
				if Product.checkIfProductExists(new_Product_name,list_id):
					self.response.write(json.dumps({'status':'exists'}))
					return
				Product.addProduct(new_Product_name,new_Product_quantity,new_Product_units,list_id)
				time.sleep(0.5)
			listProducts = List.getAllProductsOfTheList(list_id)
			list_name = List.getListByID(list_id).ListName
			user_permit =List.getUserPermit(list_id,user.email)
			data =[]
			if list_name:
				data.append(list_name)
				data.append(listProducts)
				data.append(user_permit)
				self.response.write(json.dumps(data))
		else:
			self.response.write(json.dumps({'status':'error'}))
	

class ProductsCheckHandler(webapp2.RequestHandler):
	def get(self):	
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
			return			
		#show the all the products of the list	
		list_id = int(self.request.cookies.get('list_id_cookie'))
		if list_id:
			pid = self.request.get('pid')
			if pid:
				pChecked = self.request.get('pCheck')
				if pChecked:
					Product.markProduct(int(pid))
					self.response.write(json.dumps({'status':'ok'}))
					return

class ProductFinshListHandler(webapp2.RequestHandler):
	def get(self):
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
			return			
		list_id = int(self.request.cookies.get('list_id_cookie'))
		group_id = int(self.request.cookies.get('group_id_cookie'))
		if list_id:
			users = List.getAllListUsersWithoutLogUser(list_id,user.email)
			list_name = List.getListNameByID(list_id)
			if users and list_name:
				List.deleteAllProducts(list_id)
				data =[]
				data.append(users)
				data.append(list_name)
				self.response.write(json.dumps(data))
				
				return
					
app = webapp2.WSGIApplication([
	('/productsList', ProductsList),
	('/productsCheck',ProductsCheckHandler),
	('/finishProducts', ProductFinshListHandler)
	
], debug=True)
