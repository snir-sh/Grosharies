from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
import webapp2
import json

class AboutHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
			return
			
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
		html = template.render("web/templates/about.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/about', AboutHandler)
], debug=True)
