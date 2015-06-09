from google.appengine.ext.webapp import template
from models.user import User
from models.group import Group
from models.list import List
from models.groupLists import GroupLists
import webapp2
import json
import time

class NewListHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}			
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
			return
		
		group_id=None
		gid = self.request.get('gid')
		if gid:
			group_id = int(gid)
			self.response.set_cookie('group_id_cookie',str(group_id))
		else:
			group_id = int(self.request.cookies.get('group_id_cookie'))
		
		#create new list
		new_list_name = self.request.get('new_list_name')
		if new_list_name:
			if List.checkIfTheNameExists(new_list_name,group_id):
				self.response.write(json.dumps({"status":"exist", "name":new_list_name}))
				return
			else:
				list_usersToAdd = json.loads(self.request.get('list_usersToAdd'))
				newList = List.createList(new_list_name,user.email,group_id)
				if newList:
					if list_usersToAdd:
						for listUser in list_usersToAdd:
							List.addUserToList(new_list_name,user.email,listUser[0],listUser[1],newList.ListID)
				time.sleep(0.3);
				allData = []
				listNames = List.getAllListsName(group_id)
				if listNames:
					allData.append(listNames)
					allData.append(newList.ListID)
					self.response.write(json.dumps(allData))
		
		

app = webapp2.WSGIApplication([
	('/newList', NewListHandler)
], debug=True)
