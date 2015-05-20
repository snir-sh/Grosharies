#from google.appengine.api import users
from google.appengine.ext.webapp import template

from models.user import User
import webapp2

class DefaultHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		
		html = template.render("web/templates/default.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/', DefaultHandler),
	('/default', DefaultHandler)
], debug=True)
