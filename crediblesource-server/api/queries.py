from ariadne import convert_kwargs_to_snake_case
from traceback import print_exc
from .models import User
def listUsers_resolver(obj, info):
	try: 
		users = [user.to_dict() for user in User.query.all()]
		print(users)
		payload = {
			'success': True,
			'users': users
		}
	except Exception as error:
		print(error)
		payload = {
			'success': False,
			'errors': [str(error)]
		}
	return payload

@convert_kwargs_to_snake_case
def getUser_resolver(obj, info, id):
	try:
		user = User.query.get(id)
		payload = {
			"success": True,
			"user": user.to_dict()
		}
	except AttributeError as error:
		payload = {
			"success": False,
			"errors": ["User not found", str(error)]
		}
	return payload