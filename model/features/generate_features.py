
'''
features.csv

| customer_id | age | account_age_days | total_transactions | total_amount | avg_amount | international_count | watchlist_match | label |
| ----------- | --- | ---------------- | ------------------ | ------------ | ---------- | ------------------- | --------------- | ----- |
| CUST_1      | 45  | 1200             | 250                | 500000       | 2000       | 30                  | 0               | 0     |
| CUST_2      | 60  | 300              | 500                | 9000000      | 18000      | 200                 | 1               | 1     |



'''
import joblib
import pandas as pd
from datetime import datetime
import numpy as np
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_DIR = BASE_DIR / "data"

customers = pd.read_csv(
    DATA_DIR / "customers.csv"
)

transactions = pd.read_csv(
     DATA_DIR / "transactions.csv"
)

watchlist = pd.read_csv(
     DATA_DIR / "watchlist.csv"
)


# customer features we need to create age 

today = datetime.today()
customers['date_of_birth'] = pd.to_datetime(
    customers['date_of_birth']
)

customers['age'] = (
    today.year - customers['date_of_birth'].dt.year
)


customers['risk_rating'] = (

    customers['risk_rating'].map({
        "LOW" : 0,
        "MEDIUM":1,
        "HIGH":2
    })
)


# Transactions features 


transaction_features = transactions.groupby(
    "sender_customer_id"
).agg(


    total_transactions=
    ("transaction_id","count"),


    total_amount=
    ("amount","sum"),


    avg_transaction_amount=
    ("amount","mean"),


    max_transaction_amount=
    ("amount","max")

).reset_index()



transaction_features.rename(
    columns={
        "sender_customer_id":
        "customer_id"
    },
    inplace=True
)

# International Transactions

transactions['international'] = (
    transactions['country_origin'] != transactions['country_destination']
)

international = transactions.groupby(
    "sender_customer_id"
)['international'].sum().reset_index()


international.rename(
    columns={
        "sender_customer_id":"customer_id",
        "international":
        "international_transactions"
    },
    inplace=True
)

#watchlist feature 


watchlist_ids = set(
    watchlist["customer_id"]
)

customers['watchlist_match'] = (
    customers['customer_id'].apply(
        lambda x : 1 if x in watchlist_ids else 0
    )
)


features = customers.merge(
    transaction_features ,
    on = "customer_id",
    how = "left"
)


features = features.merge(
    international,
    on="customer_id",
    how="left"
)


features.fillna(
    0,
    inplace=True
)
features.to_csv(
    DATA_DIR / "feature_data.csv",
    index=False
)




