# GrowthFlow

> **AI-Powered Commerce Operations Platform for Customer Recovery and Revenue Growth**

GrowthFlow is a modern full-stack commerce platform that helps merchants identify high-intent customers, recover abandoned carts, and automate customer engagement using AI-powered recommendations.

Inspired by platforms like **Stripe**, **Linear**, and **Razorpay**, GrowthFlow combines a premium enterprise dashboard with intelligent decision-making workflows powered by Google Gemini AI.

---

## Overview

Online merchants lose significant revenue due to abandoned carts and missed customer engagement opportunities. GrowthFlow addresses this challenge by analyzing customer behavior and generating actionable recommendations that help merchants improve conversion rates and maximize revenue.

The platform provides:

- Customer intent analysis
- Cart recovery recommendations
- Personalized outreach messages
- Merchant workflow automation
- Revenue and customer analytics
- AI-assisted decision support

---

## Project Objectives

GrowthFlow is designed to help merchants:

- Increase conversion rates
- Reduce cart abandonment
- Improve customer engagement
- Automate recovery workflows
- Generate personalized customer interactions
- Provide actionable business insights
- Reduce manual decision-making effort

The platform uses AI-driven analysis to transform customer behavior data into meaningful recommendations that support revenue growth.

---

# Features

## AI Customer Intelligence

- Purchase intent prediction
- Customer behavior analysis
- Cart abandonment detection
- Recovery strategy recommendations
- Personalized customer messaging
- Confidence scoring
- Explainable AI recommendations

---

## Commerce Dashboard

- Enterprise SaaS interface
- Real-time KPI monitoring
- Revenue analytics
- Customer activity tracking
- Workflow visualization
- Responsive design
- Dark professional theme

---

## Merchant Operations

- Customer management
- Customer search and filtering
- Demo mode for presentations
- Merchant Copilot assistant
- Profile management
- Billing management
- Preferences dashboard
- Session management

---

## AI Workflow

```text
Customer Session
       │
       ▼
Intent Analysis
       │
       ▼
Offer Recommendation
       │
       ▼
Message Generation
       │
       ▼
Recovery Strategy
       │
       ▼
Merchant Action
```

---

# Tech Stack

| Layer | Technology |
|--------|------------|
| **Frontend** | React, Vite, Tailwind CSS, React Router |
| **Backend** | FastAPI, Python, Uvicorn |
| **AI** | Google Gemini |
| **Data** | Pandas |
| **Icons** | Lucide React |

---

# Project Structure

```text
growthflow-ai/
│
├── backend/
│   ├── main.py
│   ├── ai.py
│   ├── agents.py
│   ├── rules.py
│   ├── data_service.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Dashboard Modules

## Commerce Overview

Displays:

- Revenue metrics
- Conversion performance
- Recovery rates
- Operational status

## Customer Intelligence

Analyze:

- Cart value
- Time spent
- Purchase intent
- Coupon behavior

Generate:

- Recovery plans
- Customer messaging
- Offer recommendations

## Merchant Copilot

AI-powered assistant that helps merchants:

- Understand customer behavior
- Review recommendations
- Generate recovery strategies
- Access platform insights

## Analytics

Track:

- Revenue trends
- Customer engagement
- Recovery performance
- Conversion improvements

---

# API Endpoints

## Health Check

```http
GET /
```

## Customers

```http
GET /customers
```

Returns customer records for dashboard operations.

## Analyze Customer

```http
POST /analyze
```

### Request

```json
{
  "cart_value": 4999,
  "time_spent": 780,
  "coupon_used": false
}
```

### Response

```json
{
  "intent": "High Purchase Intent",
  "offer": "10% Discount",
  "confidence": 91,
  "message": "Complete your purchase today and save instantly."
}
```

## Merchant Copilot

```http
POST /copilot
```

Provides AI-generated merchant assistance and recommendations.

---

# Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/growthflow-ai.git
cd growthflow-ai
```

---

## Backend Setup

Create a virtual environment:

```bash
python -m venv venv
```

Activate it.

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Create a `.env` file.

```env
GEMINI_API_KEY=your_api_key_here
```

Run the backend.

```bash
uvicorn main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

---

## Frontend Setup

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Current Capabilities

- AI customer analysis
- Intent prediction
- Recovery recommendations
- Merchant Copilot
- Customer management
- Revenue dashboard
- Analytics visualization
- Customer search
- CSV export
- Enterprise SaaS UI
- Responsive design

---

# Future Enhancements

- Multi-agent AI orchestration
- Real commerce dataset integration
- WhatsApp recovery messages
- Email automation
- Live event streaming
- Recovery probability prediction
- Authentication system
- Team collaboration
- Role-based permissions
- Payment gateway integrations

---

# Learning Outcomes

This project demonstrates practical experience with:

- Full-stack application development
- FastAPI REST API design
- React state management
- Component-driven architecture
- AI integration with Google Gemini
- SaaS dashboard development
- Enterprise UX principles
- Responsive UI engineering
- API communication
- Tailwind CSS

---

# Why GrowthFlow?

Most AI projects stop at creating chatbots.

GrowthFlow explores how AI can become a practical business tool by assisting merchants with customer recovery, conversion optimization, and workflow automation through a production-style commerce operations platform.

The goal was to build something that feels like a real SaaS product rather than a simple AI demo.

---

# Author

## Yaduvansh Tyagi

Software Engineering Student

**Tech Stack:** React • FastAPI • Python • Google Gemini • Tailwind CSS • Full Stack Development

---

## License

This project is intended for educational, research, and portfolio purposes.