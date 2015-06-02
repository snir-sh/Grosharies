from google.appengine.ext.webapp import template
from models.group import Group
from models.user import User
import webapp2

class ContactHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
			template_params['isUser'] = 'true'
		if not user:
			template_params['isGuest'] = 'true'
			html = template.render("web/templates/contact.html", template_params)
			self.response.write(html)
			return
			
		template_params['userEmail'] = user.email
		group_id = int(self.request.cookies.get('group_id_cookie'))
		
		groupsNames = Group.getAllGroupsNames(user.email) 		
		if groupsNames:
			template_params['userGroups'] = groupsNames
		
		html = template.render("web/templates/contact.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/contact', ContactHandler)
], debug=True)
