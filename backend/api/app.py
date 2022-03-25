import json

from flask import Flask, Response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from errors import errors

app = Flask(__name__)
app.register_blueprint(errors)

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contact.sqlite3'
db = SQLAlchemy(app)

from backend.api.models.contact import Contact


@app.route("/")
def index():
    return Response("Hello, world!", status=200)


@app.route("/custom", methods=["POST"])
def custom():
    payload = request.get_json()

    if payload.get("say_hello") is True:
        output = jsonify({"message": "Hello!"})
    else:
        output = jsonify({"message": "..."})

    return output


@app.route("/health")
def health():
    return Response("OK", status=200)


@app.route("/contact", methods=["GET"])
def get_contact():
    list_to_return = []
    for contact in Contact.query.all():
        list_to_return.append(contact.serialize())
    return jsonify(list_to_return)


@app.route("/contact/create", methods=["POST"])
def create_contact():
    data = json.loads(request.data)
    contact_1 = Contact(data["name"], data["phone_no"])
    db.session.add(contact_1)
    db.session.commit()
    return Response("OK", status=200)


if __name__ == "__main__":

    db.drop_all()
    db.create_all()
    db.session.commit()

    contact_1 = Contact('123', '123')
    db.session.add(contact_1)
    db.session.commit()
    contact_list = Contact.query.all()

    app.run(host="0.0.0.0", port=9999, debug=True)
