from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
from models.list import List
from models.groupLists import GroupLists
import webapp2
import json
import locale

class ListPageHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}			
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
			return
		
		#group_id = self.request.get('group_id')
		group_id=None
		gid = self.request.get('gid')
		if gid:
			group_id = int(gid)
			self.response.set_cookie('group_id_cookie',str(group_id))
			
		if group_id:
			listNames = List.getAllListsName(group_id)
			if listNames:
				template_params['groupLists'] = listNames
		template_params['userEmail'] = user.email
		
		groupsNames = Group.getAllGroupsNames(user.email) 		
		if groupsNames:
			template_params['userGroups'] = groupsNames
		template_params['group_id'] = group_id
		html = template.render("web/templates/listPage.html", template_params)
		self.response.write(html)
app = webapp2.WSGIApplication([
	('/listPage', ListPageHandler)
], debug=True)
