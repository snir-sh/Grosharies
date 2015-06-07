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
			template_params['isUser'] = 'true'
		if not user:
			template_params['isGuest'] = 'true'
			html = template.render("web/templates/about.html", template_params)
			self.response.write(html)
			return
				
		template_params['userEmail'] = user.email
		
		groupsNames = Group.getAllGroupsNames(user.email) 		
		if groupsNames:
			template_params['userGroups'] = groupsNames
			
		html = template.render("web/templates/about.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/about', AboutHandler)
], debug=True)
