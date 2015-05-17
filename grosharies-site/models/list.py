#this model represents a user in our system

from google.appengine.ext import ndb

class List(ndb.Model):
	ListName = ndb.StringProperty(required=True)
	product = ndb.StringProperty()
	quantity = ndb.IntegerProperty()
	units = ndb.StringProperty()
	
			
