from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
from models.list import List
from models.groupLists import GroupLists
import time
import webapp2
import json
import locale

class ListDetailsHandler(webapp2.RequestHandler):
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
			if list:
				users = List.getAllListUsersByID(list_id)
				template_params['listUsers'] = users
				template_params['listName'] = list.ListName
				template_params['listAdmin'] = list.ListAdmin
				if (list.ListAdmin==user.email):
					template_params['isListAdmin'] = user.email
		
		# Retrieving all the groups names for showing on left side.
		groupsNames = Group.getAllGroupsNames(user.email) 		
		if groupsNames:
			template_params['userGroups'] = groupsNames
		template_params['group_id'] = group_id			
		
		#delete user from a list
		deleteUser = self.request.get('deleteUser')
		if deleteUser:
			List.deleteUserFromList(deleteUser,list_id)
		
		#add user to a list
		addUser = self.request.get('addUser')
		permit = self.request.get('permit')
		if addUser:
			userToAdd = List.checkIfUserInList(addUser)
			if userToAdd == True:
				self.response.write('userExist')
				return
			else:
				#need to implement
				self.response.write('userNotExist')
		
		# changing a list name
		newListName = self.request.get('newListName')
		if newListName:
			List.changeListName(list_id, newListName)
		
		# check if asked to delete group
		confirmDeletion = self.request.get('confirmDeletion')
		if confirmDeletion:
			List.deleteList(list_id,group_id)
			self.response.delete_cookie('list_id')
			time.sleep(0.3)
			self.response.write('statusDeleted')
			
		html = template.render("web/templates/listDetails.html", template_params)
		self.response.write(html)
		
		
		
app = webapp2.WSGIApplication([
	('/listDetails', ListDetailsHandler)
], debug=True)
