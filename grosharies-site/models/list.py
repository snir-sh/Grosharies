#this model represents a List in our system

from google.appengine.ext import ndb

class List(ndb.Model):
	ListName = ndb.StringProperty(required=True)
	ListUsers = ndb.StringProperty(choices = ['partner','viewer'])
	ListAdmin = ndb.StringProperty(required=True)
	
	
	@classmethod
	def checkIfListExsist(self,list_name,list_admin):
		query = List.query(List.ListName == list_name,List.ListAdmin ==list_admin)
		if query:
			return True
		else:
			return False
	
	@classmethod		
	def deleteList(self,list_name,list_admin):
		query = List.query(List.,list_admin == list_name,List.ListAdmin == list_admin).get()
		query.key.delete()
	
	
	@classmethod		
	def changeListName(self,old_list_name,list_admin,new_list_name):
		query = List.query(List.ListName == old_list_name,List.ListAdmin == list_admin).get()
		query.ListName = new_list_name
		query.put()