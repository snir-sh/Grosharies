from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
from models.list import List
from models.product import Product
from models.groupLists import GroupLists
import webapp2
import json
import time

class ProductsCheckHandler(webapp2.RequestHandler):
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
				pChecked = self.request.get('pCheck')
				if pChecked:
					Product.markProduct(int(pid))
					self.response.write(json.dumps({'status':'ok'}))
					return
				
			
app = webapp2.WSGIApplication([
	('/productsCheck', ProductsCheckHandler)
], debug=True)
