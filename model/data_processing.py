import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler , OneHotEncoder , OrdinalEncoder




# get the feature data 
df = pd.read_csv('./data/feature_data.csv' )

#describe the data
#print(df.describe())

# we dont require this names
df.drop(
    columns=[
        "customer_id",
        "customer_name",
        "address"
    ],
    inplace=True
)





#get info about the data
#print(df.info())
''' #   Column                      Non-Null Count  Dtype  
---  ------                      --------------  -----  
 0   customer_id                 10000 non-null  str    
 1   customer_name               10000 non-null  str    
 2   date_of_birth               10000 non-null  str    
 3   address                     10000 non-null  str    
 4   country                     10000 non-null  str    
 5   nationality                 10000 non-null  str    
 6   customer_type               10000 non-null  str    
 7   account_created_date        10000 non-null  str    
 8   account_age_days            10000 non-null  int64  
 9   risk_rating                 10000 non-null  int64  
 10  age                         10000 non-null  int64  
 11  watchlist_match             10000 non-null  int64  
 12  total_transactions          10000 non-null  float64
 13  total_amount                10000 non-null  float64
 14  avg_transaction_amount      10000 non-null  float64
 15  max_transaction_amount      10000 non-null  float64
 16  international_transactions  10000 non-null  float64  '''


#get shape of the data
# print(df.shape)  (10000, 17)

#get columns
#print(df.columns)

'''Index(['customer_id', 'customer_name', 'date_of_birth', 'address', 'country',
       'nationality', 'customer_type', 'account_created_date',
       'account_age_days', 'risk_rating', 'age', 'watchlist_match',
       'total_transactions', 'total_amount', 'avg_transaction_amount',
       'max_transaction_amount', 'international_transactions'],
      dtype='str') '''

#get duplicates
#print(df.duplicated().sum()) ---- 0 duplicates 

#check null values
#print(df.isnull().sum())
'''customer_id                   0
customer_name                 0
date_of_birth                 0
address                       0
country                       0
nationality                   0
customer_type                 0
account_created_date          0
account_age_days              0
risk_rating                   0
age                           0
watchlist_match               0
total_transactions            0
total_amount                  0
avg_transaction_amount        0
max_transaction_amount        0
international_transactions    0 '''


#data preprocessing

df['date_of_birth'] = pd.to_datetime(
    df['date_of_birth']
)

df['account_created_date'] = pd.to_datetime(
    df['account_created_date']
)

# We don't need raw dates
df.drop(
    columns=[
        "date_of_birth",
        "account_created_date"
    ],
    inplace=True
)


#scaling  the numerical values 
scaler  = StandardScaler() 

numeric_features =[
    "age",
    "account_age_days",
    "total_transactions",
    "total_amount",
    "avg_transaction_amount",
    "max_transaction_amount",
    "international_transactions"
]

df[numeric_features] = scaler.fit_transform(
    df[numeric_features]
)

#one hot encoding the categorical values

categorical_features = [

    "country",
    "nationality",
    "customer_type"

]

encoder = OneHotEncoder(
    sparse_output=False,
    handle_unknown="ignore"
)

encoded = encoder.fit_transform(
    df[categorical_features]
)


encoded_df = pd.DataFrame(
    encoded,
    columns= encoder.get_feature_names_out(
        categorical_features
    )
)

df.drop(
    columns=categorical_features,
    inplace=True
)

df = pd.concat([
    df.reset_index(drop=True),
    encoded_df.reset_index(drop=True)
] , axis = 1)



df.to_csv(
    "./data/processed_features.csv",
    index=False
)


