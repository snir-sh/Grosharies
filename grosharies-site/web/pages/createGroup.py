from google.appengine.ext.webapp import template
from models.user import User
from google.appengine.ext import ndb
from models.group import Group
import webapp2

class CreateGroupHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
		
		html = template.render("web/templates/createGroup.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/createGroup', CreateGroupHandler)
], debug=True)
