from api import app, db
from ariadne import load_schema_from_path, make_executable_schema, \
	graphql_sync, snake_case_fallback_resolvers, ObjectType, QueryType
from ariadne.constants import PLAYGROUND_HTML
from flask import request, jsonify
from api.queries import listUsers_resolver, getUser_resolver
import psycopg2

query = QueryType()

@query.field('hello')
def hello(obj, info):
	return "Hello there"


@query.field('listUsers')
def listUsers(obj, info):
	return listUsers_resolver(obj, info)

@query.field('getUer')
def getUser(obj, info, id):
	return getUser_resolver(obj, info, id)

@query.field('getUser')
def getUser(obj, info):
	return {
		"success": False,
		"errors": ["User not found"],
		"user": None
	}

type_defs = load_schema_from_path("schema.graphql")
schema = make_executable_schema(
	type_defs, query
)

@app.route("/graphql", methods=["GET"])
def graphql_playgorund():
	return PLAYGROUND_HTML, 200

@app.route("/graphql", methods=["POST"]) 
def graphql_server():
	data = request.get_json()
	success, result = graphql_sync(
		schema, 
		data,
		context_value=request,
		debug=app.debug
	)
	status_code = 200 if success else 400
	return jsonify(result), status_code


