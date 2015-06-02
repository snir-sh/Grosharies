from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
from models.list import List
from models.groupLists import GroupLists
import webapp2
import json

class ListHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}			
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
			return		
		template_params['userEmail'] = user.email
		#get group_id from cookies
		group_id = int(self.request.cookies.get('group_id_cookie'))
		
		#get group names
		groupsNames = Group.getAllGroupsNames(user.email)
		if groupsNames:
			template_params['userGroups'] = groupsNames
		
		#get the lists names from the group
		groupsLists = List.getAllListsName(group_id)	
		if groupsLists:	
			template_params['groupsLists'] = groupsLists
		list_id = self.request.get('lid')
		if list_id:
			listProducts = List.getAllProductsOfTheList()
			template_params['listProducts'] = listProducts
		html = template.render("web/templates/list.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/list', ListHandler)
], debug=True)
