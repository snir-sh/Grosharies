from google.appengine.ext.webapp 	import template
from google.appengine.ext				import ndb
from models.user 	import User
from models.group import Group
import webapp2
import json

class CreateGroupHandler(webapp2.RequestHandler):
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
			template_params['userGroups'] = groupsNames
					
		# get all the users but the current one
		allUsers = User.getAllUsers()
		allUsersButCurrent = []
		for u in allUsers:
			if u==user.email:
				continue
			allUsersButCurrent.append(u)
		template_params['allUsers'] = allUsersButCurrent
				
		html = template.render("web/templates/createGroup.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/createGroup', CreateGroupHandler)
], debug=True)
