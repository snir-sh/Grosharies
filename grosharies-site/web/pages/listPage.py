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
		users = Group.getAllUsersFromGroupByID(group_id)
		groupMembers = []
		if users:
			for gUser in users:
				if gUser != user.email:
					groupMembers.append(gUser)
			template_params['groupUsers'] = groupMembers
		
		groupsNames = Group.getAllGroupsNames(user.email) 		
		if groupsNames:
			template_params['userGroups'] = groupsNames
		template_params['group_id'] = group_id
		
		#create new list
		new_list_name = self.request.get('new_list_name')
		if new_list_name:
			List.createList(new_list_name,user.email,group_id)
		
		#delete user from a group
		deleteUser = self.request.get('deleteUser')
		if deleteUser:
			Group.deleteUserFromGroup(group_id, deleteUser)
		
		#add user to a group
		addUser = self.request.get('addUser')
		if addUser:
			userToAdd = User.checkIfUserExists(addUser)
			if userToAdd:
				User.addUserToGroup(userToAdd.email, group_id)
		
		
		html = template.render("web/templates/listPage.html", template_params)
		self.response.write(html)
		
		
		
app = webapp2.WSGIApplication([
	('/listPage', ListPageHandler)
], debug=True)
