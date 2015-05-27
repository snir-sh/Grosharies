from google.appengine.ext.webapp import template
from models.user import User
from google.appengine.ext import ndb
from models.group import Group
import webapp2
import json

class CreateGroupHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')
			
		group_name = self.request.get('GroupName_id')
		if group_name:
			if Group.checkIfGroupExistsByName(group_name,user.email):
				self.response.write(json.dumps({'status':'exists'}))
			else:
				self.response.write(json.dumps({'status':'OK'}))
				Group.createGroup(group_name,user.email)
		allGroups = User.getAllUserGroups(user.email)
		
		groupsNames = []
		if allGroups:
			for group in allGroups:
				if Group.getGroupNameByID(group.GroupID):
					name = Group.getGroupNameByID(group.GroupID).GroupName
					groupsNames.append(name)
				
		template_params['userEmail'] = user.email
				
		if groupsNames:
			template_params['userGroups'] = groupsNames
		html = template.render("web/templates/createGroup.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/createGroup', CreateGroupHandler)
], debug=True)
