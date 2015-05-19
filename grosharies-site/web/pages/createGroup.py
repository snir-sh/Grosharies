#from google.appengine.api import users
from google.appengine.ext.webapp import template
from google.appengine.ext import ndb
from google.appengine.ext import db

from models.group import Group
import webapp2

class IndexHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		if (Group.checkIfGroupNotExists("Habanai 30","Ilya") is True):
			group = Group()
			group.GroupName = "Habanai 30"
			group.GroupUsers = "Ilya"
			group.GroupAdmin = "Ilya"
			g_key = group.put()

		
#		user = User.checkUser()
#		if not user:
#			template_params['loginUrl'] = User.loginUrl()
#		else:
#			template_params['logoutUrl'] = User.logoutUrl()
#			template_params['user'] = user.email()
		
		html = template.render("web/templates/createGroup.html", template_params)
		self.response.write(html)
#		user = users.get_current_user()
#
#		if user:
#			self.response.headers['Content-Type'] = 'text/plain'
#			self.response.write('Hello, ' + user.nickname())
#		else:
#			self.redirect(users.create_login_url(self.request.uri))

		#self.response.write('Hello world!')

app = webapp2.WSGIApplication([
	('/createGroup', IndexHandler)
], debug=True)
