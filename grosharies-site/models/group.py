#this model represents a Group in our system

from google.appengine.ext	import ndb
from models.user 			import User
from models.groupLists 		import GroupLists
from models.list 			import List

class Group(ndb.Model):
	GroupName = ndb.StringProperty(required=True)
	GroupAdmin = ndb.StringProperty(required=True)
	GroupID = ndb.IntegerProperty()

	#add group to the data store 
	@classmethod
	def createGroup(self,group_name,group_admin):
		group = Group()
		group.GroupAdmin = group_admin
		group.GroupName = group_name
		group.put()
		group.GroupID = group.key.id()
		group.put()
		user = User()
		user.email = group_admin
		user.GroupID = group.key.id()
		user.GroupName =group_name
		user.put()
		return group
	
	#check if the group not exists by id
	@classmethod
	def checkIfGroupExistsByID(self, group_id):
		query = Group.query(Group.GroupID == group_id).get()
		if query:
			return True
		else:
			return False
			
	#check if the group not exists by name
	@classmethod
	def checkIfGroupExistsByName(self, group_name, group_admin):
		query = Group.query(Group.GroupName == group_name, Group.GroupAdmin == group_admin).get()
		if query:
			return True
		else:
			return False

	#gets a group ID
	@classmethod
	def getGroupID(self, group_name, group_admin):
		query = Group.query(Group.GroupName == group_name, Group.GroupAdmin == group_admin).get()
		if query is not None:
			group_id = query.GroupID
			return group_id
		else:
			return None
			
	@classmethod
	def getGroupNameByID(self, group_id):
		query = Group.query(Group.GroupID == group_id).get()
		if query:
			return query
		else:
			return None
			
	#delete group from the data store	
	@classmethod
	def deleteGroup(self, group_name, group_admin):
		query = Group.query(Group.GroupName==group_name, Group.GroupAdmin==group_admin).get()
		if query:
			key = query.key.id()
			query.key.delete()
			User.deleteGroup(key)
			lists = GroupLists.getAllLists(key)
			if lists:
				for list in lists:
					List.deleteList(list.ListID,key)
			

		
	#change a group name
	@classmethod
	def changeGroupName(self, group_id, new_name):
		query = Group.query(Group.GroupID==group_id).get()
		if query:
			query.GroupName = new_name
			query.put()
		
		
	#return an array of all the users in that group 		
	@classmethod
	def getAllUsersFromGroup(self,group_name,admin_name):
		users =[]
		query = Group.query(Group.GroupName == group_name, Group.GroupAdmin == admin_name).fetch()
		if query:
			for user in query:
				users.append(user)
			return users
		else:
			return None

		
	# Create a list in a specific group. If created successfully - returns True, else - return false
	@classmethod
	def createList(self,  list_name, list_admin, group_id):
		groupLists = GroupLists.getAllLists(group_id)
		if groupLists is None:
			List.createList(list_name, list_admin, group_id)
			return True
		else:
			for group in groupLists:
				if (group.GroupID==group_id):
					return False
			List.createList(list_name, list_admin, group_id)
			return True


		
	# Delete a list from a specific group. If deleted successfully - returns True, else - return false
	@classmethod
	def deleteList(self, list_id, group_id):
		if (List.checkExistenceByID(list_id) is not None):
			List.deleteList(list_id, group_id)
			return True
		return False
		
	@classmethod
	def getAllGroupsNames(self, user_name):
		allGroups = User.getAllUserGroups(user_name)
		groupsNames = []
		if allGroups:
			for group in allGroups:
				if Group.getGroupNameByID(group.GroupID):
					name = Group.getGroupNameByID(group.GroupID).GroupName
					id = group.GroupID
					IDandName = [id, name]
					groupsNames.append(IDandName)
			groupsNames.sort(key=lambda x: x[1].lower())
			return groupsNames
		else:
			return None
		
	@classmethod
	def getAllUsersFromGroupByID(self,group_id):
		users =[]
		query = User.query(Group.GroupID == group_id).fetch()
		if query:
			for user in query:
				users.append(user.email)
			return users
		else:
			return None
			
	@classmethod
	def getAllUsersFromGroupByIDWithoutListAdmin(self,group_id, user_email):
		users =[]
		query = User.query(Group.GroupID == group_id).fetch()
		if query:
			for user in query:
				if user.email != user_email:
					users.append(user.email)
			return users
		else:
			return None
		
		
	@classmethod
	def deleteUserFromGroup(self, group_id, user_name):
		if user_name:
			User.deleteUserFromGroup(group_id, user_name)
			lists = GroupLists.getAllLists(group_id)
			if lists:
				for list in lists:
					List.deleteUserFromList(user_name, list)
		
		
		
		
		