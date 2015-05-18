#this model represents a user in our system

from google.appengine.ext import ndb

class Group(ndb.Model):
	GroupName = ndb.StringProperty(required=True)
	GroupUsers = ndb.StringProperty()
	GroupAdmin = ndb.StringProperty(required=True)

	#@classmethod
	@staticmethod
	def checkIfGroupExists(group_name,admin_name):
		q = Group.query(Group.GroupName == group_name, Group.GroupAdmin == admin_name)
		if q is not None :
			return False
		
