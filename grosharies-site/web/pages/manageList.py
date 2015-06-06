from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
from models.list import List
from models.groupLists import GroupLists
import time
import webapp2
import json
import locale

class ManageListHandler(webapp2.RequestHandler):
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
		group_id = int(self.request.cookies.get('group_id_cookie'))
			
		groupsLists = List.getAllListsNameOfTheUser(group_id, user.email)	
		if groupsLists:
			template_params['groupLists'] = groupsLists
			
		list_id = int(self.request.cookies.get('list_id_cookie'))
		if list_id:
			list = List.getListByID(list_id)
			users = List.getAllListUsersByID(list_id)
			template_params['listUsers'] = users
			template_params['listName'] = list.ListName
			template_params['listAdmin'] = list.ListAdmin
			if (list.ListAdmin==user.email):
				template_params['isListAdmin'] = user.email
		
		# Retrieving all the users of a list without the admin
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
			
		html = template.render("web/templates/manageList.html", template_params)
		self.response.write(html)
		
		
		
app = webapp2.WSGIApplication([
	('/manageList', ManageListHandler)
], debug=True)
