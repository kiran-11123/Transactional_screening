import pandas as pd

df = pd.read_csv(
    "./data/feature_data.csv"
)

df['is_suspicious'] = 0


#Rule 1 : Watchlist customer

df.loc[
    df["watchlist_match"] ==1,
    "is_suspicious"
] =1

#Rule 2 : Very large Transaction


df.loc[
    df["max_transaction_amount"] > 200000,
    "is_suspicious"
] = 1


# Rule 3: High transaction count

df.loc[
    df["total_transactions"] > 300,
    "is_suspicious"
] = 1


# Rule 4: High risk customer

df.loc[
    df["risk_rating"] == 2,
    "is_suspicious"
] = 1


print(df['is_suspicious'].value_counts())

df.to_csv(
    "./data/training_data.csv",
    index=False
)