from google.appengine.ext.webapp import template
from models.user import User
import webapp2

class SearchHandler(webapp2.RequestHandler):
	def get(self):
		template_params = {}
		user = None
		if self.request.cookies.get('session'):
			user = User.checkToken(self.request.cookies.get('session'))
		if not user:
			self.redirect('/')

		html = template.render("web/templates/search.html", template_params)
		self.response.write(html)

app = webapp2.WSGIApplication([
	('/search', SearchHandler)
], debug=True)
