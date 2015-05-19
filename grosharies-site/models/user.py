#this model represents a user in our system

from google.appengine.ext import ndb

class User(ndb.Model):
	email = ndb.StringProperty(required=True)
	GroupID = ndb.IntegerProperty()
	#GroupID = ndb.KeyProperty()
	
	@classmethod
	def checkIfUserNotExists(self,user_name):
		q = User.query(User.email == user_name).get()
		if q:
			return False
		else:
			return True
			
	#generates a url at which the user can login, and then will be redirected back to his original location
	@staticmethod
	def loginUrl():
		return users.create_login_url('/connect')
	
	#generates a url at which the user can logout, and then will be redirected back to his original location
	@staticmethod
	def logoutUrl():
		return users.create_logout_url('/')
	
	@staticmethod
	def connect():
		googleUser = users.get_current_user()
		if googleUser:
			user = User.query(User.email == googleUser.email()).get()
			if not user:
				user = User()
				user.email = googleUser.email()
				user.put()
			return user

		else:
			return "not connected"
	
	#@classmethod
	#def addUser(self, user_name, 
	