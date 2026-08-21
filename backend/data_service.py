from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
CSV_PATH = BASE_DIR / "data" / "sample_customers.csv"

df = pd.read_csv(CSV_PATH)

def get_customers():
    return df.to_dict(orient="records")