#this model represents a Group in our system

from google.appengine.ext import ndb
from models.user import User

class Group(ndb.Model):
	GroupName = ndb.StringProperty(required=True)
	GroupAdmin = ndb.StringProperty(required=True)

	@classmethod
	def checkIfGroupNotExists(self,group_name,admin_name):
		q = Group.query(Group.GroupName == group_name, Group.GroupAdmin == admin_name).get()
		if q:
			return False
		else:
			return True
			
	@classmethod
	def getAllUsersFromGroup(self,group_name,admin_name):
		q = Group.query(Group.GroupName == group_name, Group.GroupAdmin == admin_name).get()
		if q:
			return q
		else:
			return None
			
	@classmethod
	def deleteGroup(self, group_name, group_admin):
		query = Group.query(Group.GroupName==group_name, Group.GroupAdmin==group_admin).get()
		query.key.delete()

	
	@classmethod
	def changeGroupName(self, group_name, group_admin, new_name):
		query = Group.query(Group.GroupName==group_name, Group.GroupAdmin==group_admin).get()
		query.GroupName = new_name
		query.put()
	
	@classmethod
	def addGroup(self,group_name,group_admin):
		group = Group()
		group.GroupAdmin = group_admin
		group.GroupName = group_name
		group.put()
		user = User()
		user.email = group_admin
		user.GroupID = group.key.id()
	
		
		
		
		
		
		
		
		
		
		
