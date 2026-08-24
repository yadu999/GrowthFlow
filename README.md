# GrowthFlow AI --- Autonomous Commerce Growth Agent

> An AI-powered commerce dashboard that analyzes customer behavior,
> predicts purchase intent, and helps merchants recover abandoned carts
> through intelligent recommendations.

## Overview

GrowthFlow AI is a full-stack SaaS dashboard inspired by platforms like
**Stripe**, **Linear**, and **Razorpay**. It combines **React**,
**FastAPI**, and **Google Gemini AI** to simulate how merchants can
recover abandoned carts using AI-generated recommendations and
personalized customer engagement.

The project focuses on building a modern product experience with a
premium dashboard UI, AI-assisted decision making, and interactive
analytics.

## Features

### AI Customer Analysis

-   Analyze customer purchase behavior
-   Predict purchase intent using Gemini AI
-   Recommend the next best recovery action
-   Generate personalized recovery messages
-   Display confidence score for AI recommendations

### Modern Dashboard

-   Premium glassmorphism UI
-   Responsive design for desktop and mobile
-   Live animated KPI cards
-   Revenue analytics
-   Customer activity monitoring
-   AI workflow timeline

### Merchant Experience

-   Customer simulator
-   Demo Mode for presentations
-   Merchant Copilot assistant
-   Floating AI assistant
-   Customer search
-   Customer sorting
-   CSV export

## Tech Stack

  Frontend       Backend   AI
  -------------- --------- --------------------
  React          FastAPI   Google Gemini
  Vite           Python    Gemini 3.6 Flash
  Tailwind CSS   Pandas    Prompt Engineering
  React Router   Uvicorn   JSON Responses

## Project Structure

``` text
growthflow-ai/
│
├── backend/
│   ├── main.py
│   ├── ai.py
│   ├── data_service.py
│   ├── rules.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## Dashboard Highlights

-   Live KPI cards with animated metrics
-   Customer simulator for abandoned cart scenarios
-   AI Recovery Panel powered by Gemini
-   Revenue analytics and customer activity
-   Responsive SaaS-style UI

## AI Recovery Workflow

``` text
Customer Session
      │
      ▼
Behavior Analysis
      │
      ▼
Offer Recommendation
      │
      ▼
Personalized Message
      │
      ▼
Merchant Decision
```

## API Endpoints

### Health Check

``` http
GET /
```

### Customer Data

``` http
GET /customers
```

### Analyze Customer

``` http
POST /analyze
```

Example request:

``` json
{
  "cart_value": 4999,
  "time_spent": 780,
  "coupon_used": false
}
```

Example response:

``` json
{
  "intent": "Price Sensitive",
  "action": "Offer Free Shipping",
  "confidence": 91,
  "message": "Your cart is waiting for you."
}
```

### Merchant Copilot

``` http
POST /copilot
```

## Installation

### Clone the repository

``` bash
git clone https://github.com/yourusername/growthflow-ai.git
cd growthflow-ai
```

### Backend Setup

``` bash
cd backend
python -m venv venv
```

Activate the environment.

**Windows**

``` bash
venv\Scripts\activate
```

Install dependencies.

``` bash
pip install -r requirements.txt
```

Create a `.env` file.

``` env
GEMINI_API_KEY=your_api_key_here
```

Run the backend.

``` bash
uvicorn main:app --reload
```

Backend runs on:

``` text
http://localhost:8000
```

### Frontend Setup

``` bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

``` text
http://localhost:5173
```

## Current Capabilities

-   AI-powered customer analysis
-   Premium SaaS dashboard
-   Responsive UI
-   Customer management
-   Merchant Copilot
-   Revenue visualization
-   Customer simulator
-   CSV export
-   Interactive analytics

## Upcoming Improvements

-   Real e-commerce dataset integration
-   Multi-agent AI orchestration
-   Recovery probability prediction
-   Personalized WhatsApp generation
-   Live event streaming
-   AI reasoning visualization

## Learning Outcomes

This project demonstrates:

-   Full-stack application development
-   REST API design with FastAPI
-   React state management
-   Component-based architecture
-   AI integration using Google Gemini
-   Responsive UI design
-   Dashboard development
-   Modern SaaS UX patterns
-   API communication
-   Tailwind CSS styling

## Why I Built This

I wanted to explore how AI can improve customer retention in e-commerce.
Instead of building another chatbot, I focused on creating an experience
that feels like a real merchant dashboard---where AI assists
decision-making through actionable insights, personalized
recommendations, and an intuitive product experience.

## Author

**Yaduvansh Tyagi**

-   Software Engineering
-   React • FastAPI • Python • AI • Full Stack Development
