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
			
		html = template.render("web/templates/default.html", template_params)
		self.response.write(html)
			
app = webapp2.WSGIApplication([
	('/logout', LogoutHandler)
], debug=True)
