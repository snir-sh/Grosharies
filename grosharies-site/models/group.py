#this model represents a Group in our system

from google.appengine.ext import ndb
from models.user import User
from models.groupLists import GroupLists


class Group(ndb.Model):
	GroupName = ndb.StringProperty(required=True)
	GroupAdmin = ndb.StringProperty(required=True)

	#cheack if the group not exists 
	@classmethod
	def checkIfGroupNotExists(self,group_name,admin_name):
		query = Group.query(Group.GroupName == group_name, Group.GroupAdmin == admin_name).get()
		if query:
			return False
		else:
			return True
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
		
		
	#add group to the data store and to the admin users groups
	@classmethod
	def addGroup(self,group_name,group_admin):
		group = Group()
		group.GroupAdmin = group_admin
		group.GroupName = group_name
		group.put()
		user = User()
		user.email = group_admin
		user.GroupID = group.key.id()
	
		
		
		
		
		
		
		
		
		
		
