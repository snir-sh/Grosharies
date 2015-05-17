#this model represents a user in our system

from google.appengine.ext import ndb

class ListTable(ndb.Model):
	ListName = ndb.StringProperty(required=True)
	ListUsers = ndb.StringProperty(choices = ['partner','viewer'])
	ListAdmin = ndb.StringProperty(required=True)
			
