import json
from functools import lru_cache

import pandas as pd

from app.core.config import settings
from app.schemas.prediction import PredictionRequest


@lru_cache(maxsize=1)
def get_allowed_locations() -> set[str]:
    """Load the list of locations the model was trained on (top-N + 'other')."""
    try:
        with open(settings.locations_path, "r") as f:
            return set(json.load(f))
    except FileNotFoundError:
        # If locations.json wasn't copied in, fall back to accepting anything
        # (the model's OneHotEncoder will map it to "unknown" internally).
        return set()


def request_to_dataframe(payload: PredictionRequest) -> pd.DataFrame:
    """
    Build a single-row DataFrame with EXACTLY the column names used during
    training. The exported model is a full sklearn Pipeline, so no manual
    scaling or one-hot encoding is needed here.
    """
    allowed = get_allowed_locations()
    location_grouped = payload.location if (not allowed or payload.location in allowed) else "other"

    row = {
        "carpet_area_sqft": payload.carpet_area_sqft,
        "floor_num": payload.floor_num,
        "bathroom": payload.bathroom,
        "balcony": payload.balcony,
        "car_parking": payload.car_parking,
        "location_grouped": location_grouped,
        "Furnishing": payload.furnishing,
        "Transaction": payload.transaction,
        "Ownership": payload.ownership,
        "facing": payload.facing,
    }
    return pd.DataFrame([row])
