# app/__init__.py
from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)

# Configure MongoDB
app.config["MONGO_URI"] = "mongodb://localhost:27017/car_price_db"
mongo = PyMongo(app)

from app.routes.user_routes import user_routes 
 # Import routes here
app.register_blueprint(user_routes)
  # Register blueprint here
