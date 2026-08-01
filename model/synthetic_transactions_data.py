
'''
transaction_id
sender_customer_id
receiver_customer_id
amount
currency
transaction_type
channel
timestamp
country_origin
country_destination
status

'''

import pandas as pd
import random
from faker import Faker
from pathlib import Path


BASE_DIR = Path(__file__).parent

DATA_DIR = BASE_DIR / "data"


fake = Faker()


# Load customers
customers = pd.read_csv(
    DATA_DIR / "customers.csv"
)


customer_ids = customers["customer_id"].tolist()


# High risk countries for suspicious activity
high_risk_countries = [
    "UAE",
    "Singapore",
    "Brazil",
    
]


transaction_types = [
    "TRANSFER",
    "PAYMENT",
    "WIRE",
    "CARD"
]


channels = [
    "ONLINE",
    "MOBILE",
    "BRANCH",
    "ATM"
]


currencies = [
    "USD",
    "EUR",
    "INR",
    "GBP"
]



transactions = []


TOTAL_TRANSACTIONS = 50000



for i in range(TOTAL_TRANSACTIONS):


    sender = random.choice(customer_ids)

    receiver = random.choice(customer_ids)


    # avoid self transfer
    while sender == receiver:
        receiver = random.choice(customer_ids)



    sender_data = customers[
        customers["customer_id"] == sender
    ].iloc[0]


    receiver_data = customers[
        customers["customer_id"] == receiver
    ].iloc[0]



    # 98% normal transactions
    # 2% suspicious transactions

    is_suspicious = random.random() < 0.02



    if is_suspicious:

        # suspicious high amount

        amount = random.randint(
            100000,
            1000000
        )


        status = "FLAGGED"


    else:

        amount = round(
            random.uniform(
                10,
                50000
            ),
            2
        )

        status = "COMPLETED"



    transaction = {


        "transaction_id":
            f"TXN_{i+1}",



        "sender_customer_id":
            sender,



        "receiver_customer_id":
            receiver,



        "amount":
            amount,



        "currency":
            random.choice(currencies),



        "transaction_type":
            random.choice(transaction_types),



        "channel":
            random.choice(channels),



        "timestamp":
            fake.date_time_between(
                start_date="-2y",
                end_date="now"
            ),



        "country_origin":
            sender_data["country"],



        "country_destination":
            receiver_data["country"],



        "status":
            status

    }


    transactions.append(transaction)



df = pd.DataFrame(transactions)



df.to_csv(
    DATA_DIR / "transactions.csv",
    index=False
)


print("Transactions generated successfully")
print(df.head())