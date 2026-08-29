from pathlib import Path
import pandas as pd

# Project root (growthflow-ai)
PROJECT_ROOT = Path(__file__).resolve().parent.parent

# growthflow-ai/data/sample_customers.csv
CSV_PATH = PROJECT_ROOT / "data" / "sample_customers.csv"

def get_customers():
    if not CSV_PATH.exists():
        raise FileNotFoundError(f"CSV not found: {CSV_PATH}")

    df = pd.read_csv(CSV_PATH)
    return df.fillna("").to_dict(orient="records")