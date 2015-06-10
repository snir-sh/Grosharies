from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
from models.list import List
from models.groupLists import GroupLists
import webapp2
import json
import time

class ManageListHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}			
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
			return
		
		group_id=None
		gid = self.request.get('gid')
		if gid:
			group_id = int(gid)
		else:
			group_id = int(self.request.cookies.get('group_id_cookie'))
			
		#Fill User Input
		fill = self.request.get('fillUsers')
		if fill:
			users = Group.getAllUsersFromGroupByID(group_id)
			self.response.write(json.dumps(users))
			
		# changing a list name
		list_id = int(self.request.cookies.get('list_id_cookie'))
		if list_id:
			newListName = self.request.get('newListName')
			if newListName:
				if List.checkIfTheNameExists(newListName,group_id):
					self.response.write(json.dumps({"status":"exist", "name":newListName}))
					return
				data = []
				List.changeListName(list_id, newListName)
				listNames = List.getAllListsName(group_id)
				data.append(listNames)
				data.append(newListName)
				self.response.write(json.dumps(data))
				return
				
		#delete user from a list
		removeUser = self.request.get('removeUser')
		if removeUser:
			List.deleteUserFromList(removeUser,list_id)
			time.sleep(0.3)
			users = List.getAllListUsersByID(list_id)
			if users:
				self.response.write(json.dumps(users))
			else:
				self.response.write(json.dumps({"status":"empty"}))
			return
				
		#add user to a list
		addUser = self.request.get('addUser')
		permit = self.request.get('permit')
		if addUser:
			userToAdd = List.checkIfUserInList(list_id,addUser)
			if userToAdd == True:
				self.response.write(json.dumps({"status":"exist", "name":addUser}))
				return
			checkIfUser = User.checkIfUserExists(addUser)
			if checkIfUser:
				list = List.getListByID(list_id)
				list_name = list.ListName
				List.addUserToList(list_name,user.email,addUser,permit,list_id)
				time.sleep(0.3)
				users = List.getAllListUsersByID(list_id)
				self.response.write(json.dumps(users))
				return
			else:
				self.response.write(json.dumps({"status":"notUser", "name":addUser}))
				return
		
		# leaving a list
		leaveList = self.request.get('leaveList')
		if leaveList:
			List.deleteUserFromList(user.email, list_id)
			self.response.write(json.dumps({"status":"ok"}))
			time.sleep(0.3)

app = webapp2.WSGIApplication([
	('/manageList', ManageListHandler)
], debug=True)
