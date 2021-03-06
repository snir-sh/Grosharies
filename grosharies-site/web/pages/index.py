from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
import webapp2
import json

class IndexHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
			return
					
		template_params['userEmail'] = user.email
		
		groupsNames = Group.getAllGroupsNames(user.email)		
		if groupsNames:
			template_params['userGroups'] = groupsNames
					
		userToInvite = self.request.get('userToInvite')
		if userToInvite:
			self.response.write(json.dumps(userToInvite))
					
		html = template.render("web/templates/index.html", template_params)
		self.response.write(html)
app = webapp2.WSGIApplication([
	('/index', IndexHandler)
], debug=True)
