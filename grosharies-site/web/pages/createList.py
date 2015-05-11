#from google.appengine.api import users
import config

from google.appengine.ext.webapp import template

import webapp2

class IndexHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}			
			
		html = template.render("web/templates/createList.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/createList', IndexHandler)
], debug=True)
