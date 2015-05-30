from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
from models.list import List
from models.groupLists import GroupLists
import webapp2
import json

class ListPageHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}			
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
			return
		allGroups = User.getAllUserGroups(user.email)
		
		groupsNames = []
		if allGroups:
			for group in allGroups:
				if Group.getGroupNameByID(group.GroupID):
					name = Group.getGroupNameByID(group.GroupID).GroupName
					groupsNames.append(name)
					
		group_name = self.request.get('group_name')
		gid = self.request.get('gid')
		group_id = int(gid)
		
		listNames = []
		if group_id:	
			my_groupListsIds = GroupLists.getAllLists(group_id)
			if my_groupListsIds:
				for list in my_groupListsIds:
					lName = List.getListNameByID(list)
					listNames.append(lName)
					
				template_params['groupLists'] = listNames
		template_params['userEmail'] = user.email
				
		if groupsNames:
			template_params['userGroups'] = groupsNames
		html = template.render("web/templates/listPage.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/listPage', ListPageHandler)
], debug=True)
