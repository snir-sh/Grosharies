#this model represents a user in our system

from google.appengine.ext import ndb

class Group(ndb.Model):
	GroupName = ndb.StringProperty(required=True)
	GroupUsers = ndb.StringProperty()
	GroupAdmin = ndb.StringProperty(required=True)
			
