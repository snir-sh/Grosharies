from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
from models.list import List
from models.groupLists import GroupLists
import webapp2
import json

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
			
app = webapp2.WSGIApplication([
	('/productsList', ProductsList)
], debug=True)
