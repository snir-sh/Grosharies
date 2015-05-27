#from google.appengine.api import users
from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
import webapp2
import HTML
import json

class LogoutHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		self.response.delete_cookie('session')
		html = template.render("web/templates/logout.html", template_params)
		self.response.write(html)
		
		allGroups = User.getAllUserGroups(user.email)
		
		groupsNames = []
		if allGroups:
			for group in allGroups:
				if Group.getGroupNameByID(group.GroupID):
					name = Group.getGroupNameByID(group.GroupID).GroupName
					groupsNames.append(name)
				
		template_params['userEmail'] = user.email
				
		if groupsNames:
			template_params['userGroups'] = groupsNames
			
app = webapp2.WSGIApplication([
	('/logout', LogoutHandler)
], debug=True)
