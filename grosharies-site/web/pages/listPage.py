from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
from models.list import List
from models.groupLists import GroupLists
import time
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
		group =None
		
		template_params['userEmail'] = user.email
		group_id=None
		gid = self.request.get('gid')
		if gid:
			group_id = int(gid)
			self.response.set_cookie('group_id_cookie',str(group_id))
		else:
			group_id = int(self.request.cookies.get('group_id_cookie'))
			
		listNames = List.getAllListsNameOfTheUser(group_id, user.email)
		if listNames:
			template_params['groupLists'] = listNames
			
		group = Group.getGroupNameByID(group_id)
		if group:
			template_params['groupName'] = group.GroupName
			template_params['groupAdmin'] = group.GroupAdmin		
			if (group.GroupAdmin==user.email):
				template_params['isAdmin'] = user.email
			else:
				template_params['isNotAdmin'] = user.email
		
		# Retrieving all the users of a group without the admin
		group = Group.getGroupNameByID(group_id)
		users = None
		if group:
			users = Group.getAllUsersFromGroupByIDWithoutListAdmin(group_id, group.GroupAdmin)
		groupMembers = []
		if users:
			for gUser in users:
				groupMembers.append(gUser)
			template_params['groupUsers'] = groupMembers
		
		# Retrieving all the groups names for showing on left side.
		groupsNames = Group.getAllGroupsNames(user.email) 		
		if groupsNames:
			template_params['userGroups'] = groupsNames
		template_params['group_id'] = group_id			
		
		#delete user from a group
		deleteUser = self.request.get('deleteUser')
		if deleteUser:
			Group.deleteUserFromGroup(group_id, str(deleteUser))
			time.sleep(0.5)
			# Retrieving all the users of a group without the admin
			group = Group.getGroupNameByID(group_id)
			if group:
				users = Group.getAllUsersFromGroupByIDWithoutListAdmin(group_id, group.GroupAdmin)
				groupMembers = []
				if users:
					for gUser in users:
						groupMembers.append(gUser)
					self.response.write(json.dumps(groupMembers))
					return
		
		
		# changing a group name
		newGroupName = self.request.get('newGroupName')
		if newGroupName:
			Group.changeGroupName(group_id, newGroupName)
		
		# check if asked to delete group
		confirmDeletion = self.request.get('confirmDeletion')
		if confirmDeletion:
			Group.deleteGroup(group_id)
			self.response.delete_cookie('group_id')
			time.sleep(0.3)
			self.response.write('statusDeleted')
			
		html = template.render("web/templates/listPage.html", template_params)
		self.response.write(html)
		
		
		
app = webapp2.WSGIApplication([
	('/listPage', ListPageHandler)
], debug=True)
