#this model represents a user in our system

from google.appengine.ext import ndb

class User(ndb.Model):
	email = ndb.StringProperty(required=True)
	GroupID = ndb.KeyProperty()
	
	@classmethod
	def checkIfUserNotExists(self,user_name):
		q = User.query(User.email == user_name).get()
		if q:
			return False
		else:
			return True
			
	