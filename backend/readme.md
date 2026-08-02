# Transaction Screening Backend

A scalable backend service for AI-powered transaction screening and risk detection. The system provides secure authentication, API key management, transaction validation, and integrates with a Machine Learning model to classify transactions as **High Risk** or **Low Risk**.

---

## ✨ Features

-  JWT Authentication
-  Admin Registration & Login
-  API Key Generation & Validation
-  ML Model Integration for Risk Prediction
-  Transaction Screening API
-  Structured Logging
-  Secure Middleware
-  MongoDB Database
-  Express + TypeScript
-  REST APIs

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Winston Logger
- Python ML Service

---

##  Project Structure

```
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── types/
│   ├── app.ts
│   └── server.ts
│
├── logs/
├── package.json
├── tsconfig.json
└── README.md
```

---

## Authentication Flow

```
Admin Login
      │
      ▼
JWT Token Generated
      │
      ▼
Protected Routes
      │
      ▼
API Key Generation
      │
      ▼
Transaction Screening
```

---

## Installation

Clone the repository

```bash
git clone <repository_url>
```

Install dependencies

```bash
npm install
```

Create an environment file

```env
PORT=5000

MONGODB_URI=

JWT_SECRET_KEY=

MODEL_URL=http://localhost:8000/predict
```

Run development server

```bash
npm run dev
```

Build

```bash
npm run build
```

Production

```bash
npm start
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register Admin |
| POST | /api/auth/login | Login Admin |

---

### API Keys

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/api-key/create | Generate API Key |
| GET | /api/api-key | List API Keys |

---

### Transaction Screening

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/screen | Predict Transaction Risk |

---

## Request Example

```json
{
    "sender_customer_id":"CUST_1001",
    "receiver_customer_id":"CUST_5012",
    "amount":850000,
    "country_origin":"India",
    "country_destination":"USA"
}
```

---

## Response

```json
{
    "prediction":"High Risk",
    "risk_score":0.96
}
```

---

## Security

- JWT Authentication
- Password Hashing
- Protected Routes
- API Key Validation
- Environment Variables
- Centralized Logging

---

## Logging

Every request and error is logged.

Examples

- Authentication Logs
- API Key Logs
- Prediction Logs
- Error Logs

---

## Future Improvements

- Rate Limiting
- Refresh Tokens
- Docker Support
- Kubernetes Deployment
- Swagger Documentation
- Redis Caching
- Audit Logs

---

## License

MIT