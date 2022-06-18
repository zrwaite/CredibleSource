from datetime import date
from ariadne import convert_kwargs_to_snake_case
from api import db
from api.models import User

@convert_kwargs_to_snake_case
def createUser_resolver(obj, info, username, password, display_name):
	try:
		today = date.today()
		user = User(
			username=username,
			hash='',
			display_name=display_name,
			created_at=today
		)
		db.session.add(user)
		db.session.commit()
		payload = {
			"success": True,
			"user": user.to_dict()
		}
	except ValueError:
		payload = {
			"success": False,
			"errors": ["Invalid date"]
		}
	return payload

@convert_kwargs_to_snake_case
def updateUser_resolver(obj, info, id, username, display_name):
	try:
		user = User.query.get(id)
		if user:
			user.username = username
			user.display_name = display_name
		db.session.add(user)
		db.session.commit()
		payload = {
			"success": True,
			"user": user.to_dict()
		}
	except AttributeError as error:
		payload = {
			"success": False,
			"errors": ["user not found", str(error)]
		}
	return payload

@convert_kwargs_to_snake_case
def deleteUser_resolver(obj, info, id):
	try:
		user = User.query.get(id)
		db.session.delete(user)
		db.session.commit()
		payload = {"success": True, "user": user.to_dict()}
	except AttributeError:
		payload = {
			"success": False,
			"errors": ["user not found"]
		}
	return payload