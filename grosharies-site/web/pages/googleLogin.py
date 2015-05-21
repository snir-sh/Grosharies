from google.appengine.ext.webapp import template

from models.user import User
from google.appengine.api import users
from google.appengine.ext import ndb
import webapp2

class DefaultHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		email = ''
		googleUser = users.get_current_user()
		if googleUser:
			email = googleUser.email()
			
		#if (auth2.isSignedIn.get()) {
		#	var profile = auth2.currentUser.get().getBasicProfile()
		#	email = profile.getEmail()
		#}
		
		self.response.write('email is ' + email)

app = webapp2.WSGIApplication([
	('/googleLogin', DefaultHandler)
], debug=True)
