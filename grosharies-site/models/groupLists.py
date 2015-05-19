#this model represents a Group in our system

from google.appengine.ext import ndb

class GroupLists(ndb.Model):
	ListID = ndb.IntegerProperty()
	GroupID = ndb.IntegerProperty()

	@classmethod
	def getAllLists(self, group_id):
		query = GroupLists.query(GroupLists.GroupID==group_id).get()
		if query:
			return query
		else:
			return None