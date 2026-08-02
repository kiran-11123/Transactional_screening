from fastapi import FastAPI
from pydantic import BaseModel
from new_transaction_prediction import predict_transaction

app = FastAPI()


class Transaction(BaseModel):
    sender_customer_id : str  
    receiver_customer_id :str
    amount :float
    country_origin :str
    country_destination :str


@app.post('/predict')
def predict(transaction : Transaction):
    result = predict_transaction( sender_customer_id=transaction.sender_customer_id,
        receiver_customer_id=transaction.receiver_customer_id,
        amount=transaction.amount,
        country_origin=transaction.country_origin,
        country_destination=transaction.country_destination)

    return result