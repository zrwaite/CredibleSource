from datetime import date
from ariadne import convert_kwargs_to_snake_case
from api import db
from api.models.post import Post

@convert_kwargs_to_snake_case
def createPost_resolver(obj, info, headline, description, content):
	try:
		today = date.today()
		post = Post(
			headline=headline,
			description=description,
			content=content,
			created_at=today
		)
		db.session.add(post)
		db.session.commit()
		payload = {
			"success": True,
			"post": post.to_dict()
		}
	except ValueError:
		payload = {
			"success": False,
			"errors": ["Invalid date"]
		}
	return payload

@convert_kwargs_to_snake_case
def updatePost_resolver(obj, info, id, headline, description, content):
	try:
		post = Post.query.get(id)
		if post:
			if len(headline)!=0:
				post.headline = headline
			if len(description)!=0:
				post.description = description
			if len(content)!=0:
				post.content = content
		db.session.add(post)
		db.session.commit()
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

@convert_kwargs_to_snake_case
def deletePost_resolver(obj, info, id):
	try:
		post = Post.query.get(id)
		db.session.delete(post)
		db.session.commit()
		payload = {"success": True, "post": post.to_dict()}
	except AttributeError:
		payload = {
			"success": False,
			"errors": ["post not found"]
		}
	return payload