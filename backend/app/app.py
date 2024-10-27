from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
from model_code import predict_car_price # Import from the newly named file

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow all origins
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response

@app.route('/')
def home():
    return "Welcome to the Car Price API!"

@app.route('/predict', methods=['POST'])
def predict_price():
    try:
        data = request.get_json()  # Get the JSON data

        # Extract input values
        car_name_str = data.get('carName')
        fuel_str = data.get('fuelType')
        seller_type_str = data.get('sellerType')
        transmission_str = data.get('transmissionType')
        year = int(data.get('year'))
        km_driven = int(data.get('kmDriven'))
        owner = int(data.get('previousOwners'))
        mileage = float(data.get('mileage'))
        engine = int(data.get('engineCapacity'))
        max_power = float(data.get('maxPower'))
        seats = int(data.get('seats'))
        torque = int(data.get('torque'))

        # Prepare the details to pass to the prediction function
        car_details = [car_name_str, fuel_str, seller_type_str, transmission_str, year, km_driven, owner, mileage, engine, max_power, torque, seats]

        # Call the prediction function from code.py
        predicted_price = predict_car_price(car_details)

        return jsonify({'predicted_price': round(predicted_price, 2)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400  # Return error message

if __name__ == '__main__':
    app.run(debug=True, port=5001)
