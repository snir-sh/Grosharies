from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
from models.list import List
from models.product import Product
from models.groupLists import GroupLists
import webapp2
import json

class UsersList(webapp2.RequestHandler):
	def get(self):
		template_params = {}			
		
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
			return
			
		# get all the users but the current one
		allUsers = User.getAllUsers()
		allUsersButCurrent = []
		
		if allUsers:
			for u in allUsers:
				if u==user.email:
					continue
				allUsersButCurrent.append(u)
				self.response.write(json.dumps(allUsersButCurrent))
		else:
			self.response.write(json.dumps({'status':'error'}))
			
app = webapp2.WSGIApplication([
	('/showUsers', UsersList)
], debug=True)
