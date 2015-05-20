#from google.appengine.api import users
from google.appengine.ext.webapp import template

from models.user import User
import webapp2

class LogoutHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		self.response.delete_cookie('session')
		html = template.render("web/templates/logout.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/logout', LogoutHandler)
], debug=True)
