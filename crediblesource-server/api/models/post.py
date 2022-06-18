from app import db

class Post(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	headline = db.Column(db.String(50), nullable=False)
	description = db.Column(db.String(200), nullable=False)
	content = db.Column(db.String, nullable=False)
	created_at = db.Column(db.Date, nullable=False)
	def to_dict(self):
		return {
			"id": self.id,
			"headline": self.headline,
			"description": self.description,
			"content": self.content,
			"created_at": str(self.created_at.strftime('%d-%m-%Y'))
		}