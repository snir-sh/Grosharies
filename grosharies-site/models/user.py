#this model represents a user in our system

from google.appengine.ext import ndb

class User(ndb.Model):
	email = ndb.StringProperty(required=True)
	GroupID = ndb.IntegerProperty()
	
	@staticmethod
	def checkToken(token):
		user = User.get_by_id(long(token))
		return user
	
	@staticmethod
	def checkIfUserExists(user_name):
		query = User.query(User.email == user_name).get()
		if query:
			return query
		else:
			return None
			
	@classmethod
	def getAllUserGroups(self,user_name):
		query = User.query(User.email == user_name).get(20)
		if query:
			return query
		else:
			return None
			
	@staticmethod
	def addUser(user_email):
		user = User()
		user.email = user_email
		user.put()
		return user 
	
	@classmethod		
	def deleteUser(self,user_name):
		while True:
			query = User.query(User.email == user_name).get()
			if query:
				query.key.delete()
			
			
			