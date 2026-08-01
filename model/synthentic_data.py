import pandas as pd
from faker import Faker

# for this model we will keep 3 datasets for customers , watchlist , transactions

# for customers
''' 
customer_id
customer_name
date_of_birth
address
country
nationality
customer_type
account_open_date
account_age_days
risk_rating
'''

# for watchlist

'''
watchlist_id
entity_name
entity_type
aliases
date_of_birth
country
nationality
address
sanction_source
listed_date
status
'''

# for transactions

'''

transaction_id

transaction_date

transaction_type

amount

currency

channel

payment_method

sender_id

receiver_id

country_origin

country_destination

transaction_status

'''


''' transactions.csv

sender_id = C002

        JOIN

customers.csv

        JOIN

watchlist.csv


'''