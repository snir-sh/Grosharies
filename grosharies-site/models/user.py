#this model represents a user in our system

from google.appengine.ext import ndb

class User(ndb.Model):
	email = ndb.StringProperty(required=True)
	GroupID = ndb.IntegerProperty()
	GroupName = ndb.StringProperty()
	
	@staticmethod
	def checkToken(token):
		user = User.get_by_id(long(token))
		return user
	
	#check if the user exists if it does the function return the user
	@staticmethod
	def checkIfUserExists(user_name):
		query = User.query(User.email == user_name).get()
		if query:
			return query
		else:
			return None
	

	#return an array of groups
	@classmethod
	def getAllUserGroups(self,user_name):
		userGroups =[]	
		query = User.query(User.email == user_name).fetch()
		if query:
			for gr in query:
				userGroups.append(gr)			
			return userGroups
		else:
			return None
	
	#add a user to the data store
	@staticmethod
	def addUser(user_email):
		user = User()
		user.email = user_email
		user.put()
		return user 
	
	#delete all data about the user in the data store
	@classmethod		
	def deleteUser(self,user_name):
		query = User.query(User.email == user_name).fetch()
		for user in query:
			user.key.delete()
	
	#delete the group from all the users of that group
	@classmethod
	def deleteGroup(self,group_id):
		query = User.query(User.GroupID == group_id).fetch()
		for user in query:
			user.key.delete()
	
	#add a group to a user
	@classmethod
	def addGroup(self,group_id,user_name):
		user = User()
		user.email = user_name
		user.GroupID = group_id
		user.put()
			
	@classmethod
	def getGroupID(self,group_name,user_name):
		query = User.query(User.GroupName ==group_name,User.email ==user_name).get()
		if query:
			return query.GroupID
		else:
			return None