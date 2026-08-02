#  Transaction Screening ML Model

Machine Learning model used for detecting suspicious financial transactions based on customer and transaction attributes.

---

## Features

- Binary Classification
- Fraud Risk Prediction
- Synthetic Dataset Training
- Scikit-Learn Pipeline
- Preprocessing
- Model Serialization

---

## Tech Stack

- Python
- Pandas
- NumPy
- Scikit-Learn
- Joblib
- Faker

---

## Project Structure

```
model/

├── data/
│   ├── customers.csv
│   ├── transactions.csv
│
├── preprocessing/
│   ├── preprocessor.joblib
│
├── trained_model/
│   ├── transaction_model.joblib
│
├── synthetic_data.py
├── train.py
├── predict.py
├── requirements.txt
└── README.md
```

---

## Workflow

```
Synthetic Data
        │
        ▼
Feature Engineering
        │
        ▼
Preprocessing Pipeline
        │
        ▼
Model Training
        │
        ▼
Model Serialization
        │
        ▼
Prediction API
```

---

## Features Used

- Sender Customer ID
- Receiver Customer ID
- Transaction Amount
- Country Origin
- Country Destination

---

## Dataset

The model is trained using synthetic customer and transaction datasets generated using Faker.

Example

```json
{
    "sender_customer_id":"CUST_1081",
    "receiver_customer_id":"CUST_5201",
    "amount":5500000,
    "country_origin":"India",
    "country_destination":"USA"
}
```

---

## Model Performance

| Metric | Score |
|---------|-------|
| Accuracy | 98% |
| Precision | 90% |
| Recall | 89% |
| F1 Score | 89% |

---

## Training

Install dependencies

```bash
pip install -r requirements.txt
```

Train model

```bash
python train.py
```

---

## Prediction

```bash
python predict.py
```

Example Response

```json
{
    "prediction":"Low Risk",
    "probability":0.12
}
```

---

## Saved Artifacts

```
preprocessor.joblib
transaction_model.joblib
```

---

## Future Improvements

- XGBoost
- LightGBM
- SHAP Explainability
- Drift Detection
- Continuous Retraining
- Real Banking Dataset Support

---

## License

MIT