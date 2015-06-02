from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
import webapp2
import json

class FAQHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
			template_params['isUser'] = 'true'
		if not user:
			template_params['isGuest'] = 'true'
			html = template.render("web/templates/FAQ.html", template_params)
			self.response.write(html)
			return
		
		template_params['userEmail'] = user.email
		group_id = int(self.request.cookies.get('group_id_cookie'))
		
		groupsNames = Group.getAllGroupsNames(user.email) 		
		if groupsNames:
			template_params['userGroups'] = groupsNames
			
		html = template.render("web/templates/FAQ.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/FAQ', FAQHandler)
], debug=True)
