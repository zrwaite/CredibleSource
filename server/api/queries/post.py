from ariadne import convert_kwargs_to_snake_case
from traceback import print_exc
from api.models.post import Post
def listPosts_resolver(obj, info):
	try: 
		posts = [post.to_dict() for post in Post.query.all()]
		payload = {
			'success': True,
			'posts': posts
		}
	except Exception as error:
		payload = {
			'success': False,
			'errors': [str(error)]
		}
	return payload

@convert_kwargs_to_snake_case
def getPost_resolver(obj, info, id):
	try:
		post = Post.query.get(id)
		payload = {
			"success": True,
			"post": post.to_dict()
		}
	except AttributeError as error:
		payload = {
			"success": False,
			"errors": ["post not found", str(error)]
		}
	return payload