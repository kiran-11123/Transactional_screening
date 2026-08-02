import pandas as pd
import joblib
from datetime import datetime


# ==============================
# Load data
# ==============================

customers = pd.read_csv(
    "./data/customers.csv"
)

transactions = pd.read_csv(
    "./data/transactions.csv"
)

watchlist = pd.read_csv(
    "./data/watchlist.csv"
)



# ==============================
# Load ML artifacts
# ==============================

scaler = joblib.load(
    "./models/scaler.pkl"
)

encoder = joblib.load(
    "./models/encoder.pkl"
)

model = joblib.load(
    "./models/aml_model.pkl"
)

feature_columns = joblib.load(
    "./models/features.pkl"
)



# ==============================
# Incoming transaction
# ==============================

''' 
transaction = {

    "sender_customer_id": "CUST_1081",

    "receiver_customer_id": "CUST_5201",

    "amount": 5500000,

    "country_origin": "India",

    "country_destination": "USA"  

}

'''


def predict_transaction(
    sender_customer_id,
    receiver_customer_id,
    amount,
    country_origin,
    country_destination,
    threshold=0.35
):
    # ==============================
    # Transaction Dictionary
    # ==============================
    transaction = {
        "sender_customer_id": sender_customer_id,
        "receiver_customer_id": receiver_customer_id,
        "amount": amount,
        "country_origin": country_origin,
        "country_destination": country_destination
    }

    # ==============================
    # Customer Details
    # ==============================
    customer = customers[
        customers["customer_id"] == transaction["sender_customer_id"]
    ].iloc[0]

    # Age
    dob = pd.to_datetime(customer["date_of_birth"])
    today = datetime.today()
    age = today.year - dob.year

    # Account Age
    created = pd.to_datetime(customer["account_created_date"])
    account_age_days = (today - created).days

    # Risk Rating Encoding
    risk_rating = {
        "LOW": 0,
        "MEDIUM": 1,
        "HIGH": 2
    }

    risk = risk_rating[customer["risk_rating"]]

    # Watchlist
    watchlist_ids = set(watchlist["customer_id"])
    watchlist_match = (
        1
        if transaction["sender_customer_id"] in watchlist_ids
        else 0
    )

    # ==============================
    # Transaction History
    # ==============================
    customer_transactions = transactions[
        transactions["sender_customer_id"]
        == transaction["sender_customer_id"]
    ]

    total_transactions = len(customer_transactions)

    total_amount = customer_transactions["amount"].sum()

    avg_transaction_amount = customer_transactions["amount"].mean()

    max_transaction_amount = customer_transactions["amount"].max()

    international_transactions = customer_transactions[
        customer_transactions["country_origin"]
        != customer_transactions["country_destination"]
    ].shape[0]

    # ==============================
    # Create Input DataFrame
    # ==============================
    input_data = pd.DataFrame({
        "age": [age],
        "account_age_days": [account_age_days],
        "risk_rating": [risk],
        "watchlist_match": [watchlist_match],
        "total_transactions": [total_transactions],
        "total_amount": [total_amount],
        "avg_transaction_amount": [avg_transaction_amount],
        "max_transaction_amount": [max_transaction_amount],
        "international_transactions": [international_transactions],
        "country": [customer["country"]],
        "nationality": [customer["nationality"]],
        "customer_type": [customer["customer_type"]]
    })

    # ==============================
    # Preprocessing
    # ==============================
    numeric_features = [
        "age",
        "account_age_days",
        "total_transactions",
        "total_amount",
        "avg_transaction_amount",
        "max_transaction_amount",
        "international_transactions"
    ]

    categorical_features = [
        "country",
        "nationality",
        "customer_type"
    ]

    # Scale numerical features
    input_data[numeric_features] = scaler.transform(
        input_data[numeric_features]
    )

    # Encode categorical features
    encoded = encoder.transform(
        input_data[categorical_features]
    )

    encoded_df = pd.DataFrame(
        encoded,
        columns=encoder.get_feature_names_out(
            categorical_features
        )
    )

    input_data.drop(
        columns=categorical_features,
        inplace=True
    )

    input_data = pd.concat(
        [input_data, encoded_df],
        axis=1
    )

    # Arrange columns exactly as training
    input_data = input_data[feature_columns]

    # ==============================
    # Prediction
    # ==============================
    probability = model.predict_proba(input_data)[0][1]

    result = (
        "Suspicious"
        if probability >= threshold
        else "Normal"
    )

    return {
        "sender_customer_id": sender_customer_id,
        "receiver_customer_id": receiver_customer_id,
        "amount": amount,
        "risk": result,
        "probability": round(probability * 100, 2)
    }


