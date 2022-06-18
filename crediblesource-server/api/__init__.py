from flask import Flask, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://tqdzgfnjlcqucb:63745d7e912ba6e25d673399fe98eb930c115fcc07b28eccb6ee6de8fed88a16@ec2-52-72-99-110.compute-1.amazonaws.com:5432/davb4tand0o00s"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)