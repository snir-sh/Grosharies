from google.appengine.ext.webapp import template
from models.user import User
from google.appengine.ext import ndb
from models.group import Group
import webapp2
import json
import time

class NewGroupHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
			return
		
		this_group = None
		new_group_name = self.request.get('GroupName_id')
		if new_group_name:
			if Group.checkIfGroupExistsByName(new_group_name,user.email):
				self.response.write(json.dumps({'status':'exists'}))
				return
			else:
				group_usersToAdd = json.loads(self.request.get('Users'))		
				this_group = Group.createGroup(new_group_name,user.email)
				if group_usersToAdd:
					for groupUser in group_usersToAdd:
						User.addUserToGroup(str(groupUser),this_group.GroupID)
				time.sleep(0.1)
				groupsNames = Group.getAllGroupsNames(user.email)	
				if groupsNames:
					self.response.write(json.dumps(groupsNames))

app = webapp2.WSGIApplication([
	('/newGroup', NewGroupHandler)
], debug=True)
