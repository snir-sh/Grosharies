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
		
		g_id = None
		if (Group.checkIfGroupNotExists("Habanai 30","Ilya") is True):
			group = Group()
			group.GroupName = "Habanai 30"
			group.GroupAdmin = "Ilya"
			g_id = group.put()
			group = Group()
			#group.GroupName = "Habanai 30"
			group.GroupUsers = "Ben"
			#group.GroupAdmin = "Ilya"
			g_id = group.put()
			#g_id = group.key.id()
			#if(User.checkIfUserNotExists("Ilya") is True):
			user = User()
			user.email = "Ilya"
			user.GroupID = group.key.id()
			user.put()
		
		#user1 = User()
		#user1.email = "Elad"
		#if (g_key is None):
		#	user1.GroupID = None
		#else :
		#	user1.GroupID =g_key
		#user1.put()
		
		html = template.render("web/templates/createGroup.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/createGroup', CreateGroupHandler)
], debug=True)
