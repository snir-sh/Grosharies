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
			
	@classmethod
	def deleteGroup(self,group_id):
		query =GroupLists.query(GroupLists.GroupID==group_id).fetch()
		for group in query:
			group.key.delete()
		

	@classmethod
	def deleteList(self,list_id):
		query = GroupLists.query(GroupLists.ListID==list_id).fetch()
		for list in query:
			list.key.delete()
			