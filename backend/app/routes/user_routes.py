# app/routes/user_routes.py
''' 
from flask import Blueprint, jsonify
from app import mongo  # Import mongo from the main app module

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/users', methods=['GET'])
def get_users():
    users = mongo.db.users.find()  # Fetch users from the 'users' collection
    result = []
    for user in users:
        result.append({
            'id': str(user['_id']),
            'name': user.get('name', 'No Name Provided'),  # Default if name is missing
            'email': user.get('email', 'No Email Provided')  # Default if email is missing
        })
    return jsonify(result)  # Return the list of users as JSON

'''
# app/routes/car_routes.py
from flask import Blueprint, jsonify
from app import mongo  # Import mongo from the main app module

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/users', methods=['GET'])
def get_cars():
    cars = mongo.db.users.find()  # Adjusted if your collection is named 'users'
    result = []
    for car in cars:
        result.append({
            'id': str(car['_id']),
            'name': car.get('name', 'No Name Provided'),
            'year': car.get('year', 'No Year Provided'),
            'selling_price': car.get('selling_price', 'No Price Provided'),
            'km_driven': car.get('km_driven', 'No KM Data'),
            'fuel': car.get('fuel', 'No Fuel Type'),
            'seller_type': car.get('seller_type', 'No Seller Type'),
            'transmission': car.get('transmission', 'No Transmission'),
            'owner': car.get('owner', 'No Owner Info'),
            'mileage': car.get('mileage', 'No Mileage Info'),
            'engine': car.get('engine', 'No Engine Info'),
            'max_power': car.get('max_power', 'No Max Power Info'),
            'torque': car.get('torque', 'No Torque Info'),
            'seats': car.get('seats', 'No Seats Info'),
            'Nm': car.get('Nm', 'No Nm Info'),
            'rpm': car.get('rpm', 'No RPM Info'),
            'hp': car.get('hp', 'No HP Info'),
        })
    return jsonify(result)  # Return the list of cars as JSON



