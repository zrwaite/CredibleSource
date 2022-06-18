from app import db

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String)
	hash = db.Column(db.String)
	display_name = db.Column(db.String)
	created_at = db.Column(db.Date)
	def to_dict(self):
		return {
			"id": self.id,
			"username": self.username,
			"hash": self.hash,
			"display_name": self.display_name,
			"created_at": str(self.created_at.strftime('%d-%m-%Y'))
		}