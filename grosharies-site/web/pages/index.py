from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
import webapp2

class IndexHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
		
		html = template.render("web/templates/index.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/index', IndexHandler)
], debug=True)
