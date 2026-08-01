# for this model we will keep 3 datasets for customers , watchlist , transactions
# for customers
''' 
customer_id
name
date_of_birth
address
country
nationality
customer_type
risk_rating
account_created_date
'''

# for watchlist

'''
watchlist_id
entity_name
aliases
entity_type
country
date_of_birth
address
source
risk_level
created_at
'''

# for transactions

'''
transaction_id
sender_customer_id
receiver_customer_id
amount
currency
channel
timestamp
country_origin
country_destination
status

'''


''' transactions.csv

sender_id = C002

        JOIN

customers.csv

        JOIN

watchlist.csv


'''


import pandas as pd
import random
from faker import Faker
from datetime import datetime

from pathlib import Path


BASE_DIR = Path(__file__).parent

DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)


fake = Faker()


countries =[
    "USA",
    "India",
    "UK",
    "Germany",
    "France",
    "Canada",
    "Australia",
    "Singapore",
    "UAE",
    "Brazil"
]

customer_types = [
    "Individual",
    "Business"
]

risk_levels = [
    "LOW",
    "MEDIUM",
    "HIGH"
]

customers = []



for i in range(10000):
    created_date = fake.date_between(
        start_date="-10y",
        end_date="today"
    )

    today = datetime.today().date()

    account_age_days = (
        today - created_date
    ).days


    customer = {
         
        "customer_id": f"CUST_{i+1}",

        "customer_name": fake.name(),

        "date_of_birth": fake.date_of_birth(
            minimum_age=18,
            maximum_age=80
        ),

        "address": fake.address().replace("\n", ", "),

        "country": random.choice(countries),

        "nationality": random.choice(countries),

        "customer_type": random.choice(customer_types),

        "account_created_date": created_date,

        "account_age_days": account_age_days,

        "risk_rating": random.choice(risk_levels)
    }
    customers.append(customer)

df = pd.DataFrame(customers)

df.to_csv(
    DATA_DIR / "customers.csv",
    index=False
)