import json

from flask import Flask, Response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from errors import errors

app = Flask(__name__)
app.register_blueprint(errors)

# Database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost:3308/phone'
db = SQLAlchemy(app)

from backend.api.models.contact import Contact

db.create_all()


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
    return jsonify({
        "message": "Contact created successfully"
    }), 200


@app.route("/contact/<int:id>", methods=["DELETE"])
def delete_contact(id):
    db.session.delete(db.session.query(Contact).filter_by(id=id).first())
    db.session.commit()
    return jsonify({
        "message": "Contact deleted successfully"
    }), 200


@app.route("/contact/<int:id>", methods=["PATCH"])
def edit_contact(id):
    dt = json.loads(request.data)
    contact = db.session.query(Contact).filter_by(id=id).first()
    contact.name = dt["name"]
    contact.phone_no = dt["phone_no"]
    db.session.merge(contact)
    db.session.commit()
    return jsonify({
        "message": "Contact updated successfully"
    }), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9999)
