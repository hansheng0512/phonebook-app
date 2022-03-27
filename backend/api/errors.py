from flask import Blueprint, Response, jsonify

errors = Blueprint("errors", __name__)


@errors.app_errorhandler(Exception)
def server_error(error):
    return jsonify({"message": str(error)}), 500
