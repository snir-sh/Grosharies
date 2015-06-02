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
		group =None
		
		template_params['userEmail'] = user.email
		group_id=None
		gid = self.request.get('gid')
		if gid:
			group_id = int(gid)
			self.response.set_cookie('group_id_cookie',str(group_id))
		else:
			group_id = int(self.request.cookies.get('group_id_cookie'))
			
		listNames = List.getAllListsName(group_id)
		if listNames:
			template_params['groupLists'] = listNames
			
		group = Group.getGroupNameByID(group_id)
		if group:
			template_params['groupName'] = group.GroupName
			template_params['groupAdmin'] = group.GroupAdmin		
			if (group.GroupAdmin==user.email):
				template_params['isAdmin'] = user.email
		
		# Retrieving all the users of a group without the admin
		group = Group.getGroupNameByID(group_id)
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
			Group.deleteUserFromGroup(group_id, deleteUser)
		
		#add user to a group
		addUser = self.request.get('addUser')
		if addUser:
			userToAdd = User.checkIfUserExists(addUser)
			if userToAdd:
				exist = User.addUserToGroup(userToAdd.email, group_id)
				if exist==None:
					self.response.write('userExist')
					return
			else:
				self.response.write('userNotExist')
				return
		
		html = template.render("web/templates/listPage.html", template_params)
		self.response.write(html)
		
		
		
app = webapp2.WSGIApplication([
	('/listPage', ListPageHandler)
], debug=True)
