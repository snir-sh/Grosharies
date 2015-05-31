from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
from models.list import List
from models.groupLists import GroupLists
import webapp2
import json
import locale

class CreateListHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}			
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
			return
		gid = self.request.get('gid')
		group_id = int(gid)
		
		groupUsers = Group.getAllUsersFromGroupByID(group_id)
		if groupUsers:
			template_params['groupUsers'] = groupUsers
			
			
		groupsNames = Group.getAllGroupsNames(user.email)			
		if groupsNames:
			template_params['userGroups'] = groupsNames
			
		if group_id:
			listNames = List.getAllListsName(group_id)
			if listNames:
				template_params['groupLists'] = listNames
		
		
		#usersList = self.request.get('list_usersToAdd')
		

		
		template_params['group_id'] = group_id
		html = template.render("web/templates/createList.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/createList', CreateListHandler)
], debug=True)
