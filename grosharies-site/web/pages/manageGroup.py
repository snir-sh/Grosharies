from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
from models.list import List
from models.groupLists import GroupLists
import time
import webapp2
import json
import locale

class MangeGroupHandler(webapp2.RequestHandler):
	def get(self):		
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
			return
		group =None
		
		group_id=None
		gid = self.request.get('gid')
		if gid:
			group_id = int(gid)
			self.response.set_cookie('group_id_cookie',str(group_id))
		else:
			group_id = int(self.request.cookies.get('group_id_cookie'))
								
	
		#add user to a group
		addUser = self.request.get('addUser')
		if addUser:
			userToAdd = User.checkIfUserExists(addUser)
			if userToAdd:
				exist = User.addUserToGroup(userToAdd.email, group_id)
				if exist==None:
					self.response.write(json.dumps('userExist'))
					return
				time.sleep(0.3)
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
		
			else:
				self.response.write(json.dumps('userNotExist'))
				return
		
		
		#delete user from a group
		deleteUser = self.request.get('deleteUser')
		if deleteUser:
			Group.deleteUserFromGroup(group_id, str(deleteUser))
			time.sleep(0.3)
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
			time.sleep(0.3)
			newGroup = Group.getGroupNameByID(group_id)
			if newGroup:
				data =[]
				data.append(newGroup.GroupName)
				data.append(newGroup.GroupAdmin)
				data.append(newGroup.GroupID)
				userGroups = Group.getAllGroupsNames(user.email)
				data.append(userGroups)
				self.response.write(json.dumps(data))
		
app = webapp2.WSGIApplication([
	('/manageGroup', MangeGroupHandler)
], debug=True)
