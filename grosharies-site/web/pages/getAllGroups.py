from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
import webapp2
import json

class GetAllGroupsHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
			return
		
		groupsNames = Group.getAllGroupsNames(user.email)		
		if groupsNames:
			self.response.write(json.dumps(groupsNames))
			return
					
		self.response.write(json.dumps({"status":"failed"}))
		

app = webapp2.WSGIApplication([
	('/getAllGroups', GetAllGroupsHandler)
], debug=True)
