from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="GrowthFlow AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "app":"GrowthFlow AI",
        "status":"Running"
    }

@app.get("/dashboard")
def dashboard():
    return {
        "revenue":"₹3.2L",
        "conversion":"5.8%",
        "abandoned_carts":143
    }