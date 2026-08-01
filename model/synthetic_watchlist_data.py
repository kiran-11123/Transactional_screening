import pandas as pd
import random
from pathlib import Path



BASE_DIR = Path(__file__).parent

DATA_DIR = BASE_DIR / "data"



customers = pd.read_csv(
    DATA_DIR / "customers.csv"
)



watchlist_types = [

    "SANCTIONS",

    "PEP",

    "BLACKLIST",

    "FRAUD_ALERT"

]



watchlist = []



# 5% customers become watchlist

watchlist_customers = customers.sample(
    n=500
)



for index,row in watchlist_customers.iterrows():


    data = {


        "watchlist_id":
            f"WATCH_{index+1}",



        "customer_id":
            row["customer_id"],



        "customer_name":
            row["customer_name"],



        "date_of_birth":
            row["date_of_birth"],



        "country":
            row["country"],



        "nationality":
            row["nationality"],



        "list_type":
            random.choice(
                watchlist_types
            ),



        "risk_level":
            "HIGH",



        "source":
            random.choice(
                [
                    "OFAC",
                    "FATF",
                    "Internal Bank List"
                ]
            )

    }


    watchlist.append(data)



df = pd.DataFrame(watchlist)



df.to_csv(
    DATA_DIR / "watchlist.csv",
    index=False
)



print("Watchlist generated successfully")
print(df.head())