from google.appengine.ext.webapp import template
from models.group import Group
from models.user import User
import webapp2

class SearchHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
		
		group_id = int(self.request.cookies.get('group_id_cookie'))
		#get the groups names	
		groupsNames = Group.getAllGroupsNames(user.email)
		if groupsNames:
			template_params['userGroups'] = groupsNames 
		
		
		html = template.render("web/templates/search.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/search', SearchHandler)
], debug=True)
