from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
import webapp2
import HTML

class IndexHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
		
		myEmail = user.email
		myGroups = User.getAllUserGroups(myEmail)
		
		groupsNames = []
		if myGroups:
			for group in myGroups:
				groupsNames.append(Group.getGroupNameByID(group.GroupID))
		
		template_params['emailUser'] = myEmail
				
		#if myGroups:
		#	template_params['groupsUser'] = groupsNames[0]
		
		# This is test #
		#table_data = [['list1'],['list2'],['list3'],]
		#htmlcode = HTML.table(table_data)
		#print htmlcode
						
		html = template.render("web/templates/index.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/index', IndexHandler)
], debug=True)
