import numpy as np
import pandas as pd

df = pd.read_csv("./data/processed_features.csv")

scores = []

for _, row in df.iterrows():

    score = 0

    # Watchlist contributes
    score += row["watchlist_match"] * 35

    # Risk rating contributes (already encoded as 0/1/2)
    score += row["risk_rating"] * 12

    # Scaled numeric features
    score += max(0, row["total_amount"]) * 8
    score += max(0, row["max_transaction_amount"]) * 8
    score += max(0, row["international_transactions"]) * 6

    # New accounts
    if row["account_age_days"] < -0.5:   # because it's standardized
        score += 5

    # Small random variation
    score += np.random.normal(0, 5)

    scores.append(score)

df["risk_score"] = scores


threshold = np.percentile(df["risk_score"], 90)

df["is_suspicious"] = (
    df["risk_score"] >= threshold
).astype(int)


df.drop(columns=["risk_score"], inplace=True)

df.to_csv("./data/training_data.csv", index=False)