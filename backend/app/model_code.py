import numpy as np
import pandas as pd
import pickle
from sklearn.linear_model import LinearRegression, Lasso
from sklearn.ensemble import StackingRegressor, RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import LabelEncoder, StandardScaler
import re

# Function to extract numerical values from strings
def extract_numbers(value):
    match = re.findall(r'\d+', str(value).replace(',', ''))
    return int(''.join(match)) if match else np.nan

# Function to train the model (if necessary, only call if retraining)
def train_model():
    # Load and preprocess the dataset
    df = pd.read_csv(r'C:\Users\Hp\Desktop\RCOEM\Drift\Drift_prediction\backend\prediction\cleaned.csv')

    # Apply extraction to relevant columns
    df['torque'] = df['torque'].apply(extract_numbers)

    # Drop unnecessary columns
    df = df[['name', 'year', 'km_driven', 'fuel', 'seller_type', 'transmission', 'owner', 'mileage', 'engine', 'max_power', 'torque', 'seats', 'selling_price']]

    # Fill missing numeric values with the column mean
    numeric_columns = df.select_dtypes(include=[np.number]).columns
    df[numeric_columns] = df[numeric_columns].fillna(df[numeric_columns].mean())

    # Encode categorical features
    categorical_features = ['name', 'fuel', 'seller_type', 'transmission', 'owner']
    encoders = {}

    for feature in categorical_features:
        encoder = LabelEncoder()
        df[feature] = encoder.fit_transform(df[feature])
        encoders[feature] = encoder

    # Save the encoders
    with open('../prediction/encoders.pkl', 'wb') as enc_file:
        pickle.dump(encoders, enc_file)

    # Split the data into features and target
    y = df['selling_price']
    X = df.drop(columns='selling_price')

    # Scale the features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Save the scaler
    with open('../prediction/scaler.pkl', 'wb') as scaler_file:
        pickle.dump(scaler, scaler_file)

    # Split the data into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.25, random_state=42)

    # Define base models
    base_models = [
        ('linear', LinearRegression()),
        ('lasso', Lasso(max_iter=10000, alpha=1.0, tol=0.001)),
        ('rf', RandomForestRegressor(n_estimators=100, random_state=42))
    ]

    # Stacking model
    stacking_model = StackingRegressor(estimators=base_models, final_estimator=LinearRegression())

    # Fit the model
    stacking_model.fit(X_train, y_train)

    # Save the trained stacking model
    with open('../prediction/stacking_model.pkl', 'wb') as model_file:
        pickle.dump(stacking_model, model_file)

    # Make predictions and calculate RMSE (optional)
    y_pred = stacking_model.predict(X_test)
    stacking_rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    print(f"Stacking RMSE: {stacking_rmse:.2f}")

# Function to load models and make a prediction
def predict_car_price(car_details):
    # Load encoders, scaler, and model
    with open('../prediction/encoders.pkl', 'rb') as enc_file:
        encoders = pickle.load(enc_file)
    with open('../prediction/scaler.pkl', 'rb') as scaler_file:
        scaler = pickle.load(scaler_file)
    with open('../prediction/stacking_model.pkl', 'rb') as model_file:
        stacking_model = pickle.load(model_file)

    # Extract details
    car_name_str, fuel_str, seller_type_str, transmission_str, year, km_driven, owner, mileage, engine, max_power, torque, seats = car_details

    # Transform categorical variables
    name_encoded = safe_transform(encoders['name'], car_name_str)
    fuel_encoded = safe_transform(encoders['fuel'], fuel_str)
    seller_type_encoded = safe_transform(encoders['seller_type'], seller_type_str)
    transmission_encoded = safe_transform(encoders['transmission'], transmission_str)

    # Prepare input
    user_input = np.array([[name_encoded, year, km_driven, fuel_encoded, seller_type_encoded, transmission_encoded,
                            owner, mileage, engine, max_power, torque, seats]])

    # Scale the user input
    user_input_scaled = scaler.transform(user_input)

    # Predict the price using the trained stacking model
    predicted_price = stacking_model.predict(user_input_scaled)
    return predicted_price[0]

def safe_transform(encoder, value, default=0):
    if value in encoder.classes_:
        return encoder.transform([value])[0]
    else:
        return default
