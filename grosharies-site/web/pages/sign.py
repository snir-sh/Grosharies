#from google.appengine.api import users
from google.appengine.ext.webapp import template

from models.user import User
import webapp2
import sys
import json

class SignHandler(webapp2.RequestHandler):
	def get(self):	
		email = self.request.get("email") # this will get the value from the field named username
		self.response.write(email)

app = webapp2.WSGIApplication([
	('/sign', SignHandler)
], debug=True)
