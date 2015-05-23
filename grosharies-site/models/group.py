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
		user.put()
	
	#check if the group not exists 
	@classmethod
	def checkIfGroupNotExists(self, group_id):
		query = Group.query(Group.GroupID == group_id).get()
		if query:
			return False
		else:
			return True

	#gets a group ID
	@classmethod
	def getGroupID(self, group_name, group_admin):
		query = Group.query(Group.GroupName == group_name, Group.GroupAdmin == group_admin).get()
		if query is not None:
			group_id = query.GroupID
			return group_id
		else:
			return None
			
			
	#delete group from the data store	
	@classmethod
	def deleteGroup(self, group_name, group_admin):
		query = Group.query(Group.GroupName==group_name, Group.GroupAdmin==group_admin).get()
		key = query.key.id()
		query.key.delete()
		GroupLists.deleteGroup(key)
		User.deleteGroup(key)

		
	#change a group name
	@classmethod
	def changeGroupName(self, group_name, group_admin, new_name):
		query = Group.query(Group.GroupName==group_name, Group.GroupAdmin==group_admin).get()
		query.GroupName = new_name
		query.put()
		
		
	#return an array of all the users in that group 		
	@classmethod
	def getAllUsersFromGroup(self,group_name,admin_name):
		users =[]
		i=0
		query = Group.query(Group.GroupName == group_name, Group.GroupAdmin == admin_name).fetch()
		if query:
			for user in query:
				users[i] = user
				i+=1
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
		
		
		
		
		
		
