from backend.api.app import db


class Contact(db.Model):
    id = db.Column('id', db.Integer, primary_key = True)
    name = db.Column(db.String(100))
    phone_no = db.Column(db.String(100))

    def __init__(self, name, phone_no):
        self.name = name
        self.phone_no = phone_no

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone_no': self.phone_no
        }