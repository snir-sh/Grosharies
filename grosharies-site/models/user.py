#this model represents a user in our system

from google.appengine.ext import ndb

class User(ndb.Model):
	email = ndb.StringProperty(required=True)
	GroupID = ndb.IntegerProperty()
	
	@staticmethod
	def checkIfUserExists(self,user_name):
		query = User.query(User.email == user_name).get()
		if query:
			return True
		else:
			return False
			
	@classmethod
	def getAllUserGroups(self,user_name):
		query = User.query(User.email == user_name).get()
		if query:
			return query
		else:
			return None
			
	@staticmethod
	def addUser(self,user_email)
		user = User()
		user.email = user_email
		user.put()


	
	@classmethod		
	def deleteUser(self,user_name):
		query = User.query(User.ProductName == user_name).get()
		query.key.delete()